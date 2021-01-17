CREATE TABLE IF NOT EXISTS rule (
    id serial primary key,
    levels_max integer,
    lot_coverage_max numeric(3, 2),
    setback_front integer,
    setback_side integer,
    setback_rear integer,
    FAR real,
    density integer,
    unit_size_min integer,
    residential_parking_min real,
    office_parking_min real,
    commercial_parking_min real
);

CREATE TABLE IF NOT EXISTS zone (
    id serial primary key,
    rule_id integer,
    CONSTRAINT fk_rule 
        FOREIGN KEY(rule_id)
        REFERENCES rule(id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS parcel (
    id serial primary key,
    lot_area integer,
    lot_width integer,
    lot_length integer,
    zone_id integer,
    CONSTRAINT fk_zone
        FOREIGN KEY(zone_id)
        REFERENCES zone(id)
        ON DELETE SET NULL
);

INSERT INTO
    rule (
        levels_max,
        lot_coverage_max,
        setback_front,
        setback_side,
        setback_rear,
        FAR,
        density,
        unit_size_min,
        residential_parking_min,
        office_parking_min,
        commercial_parking_min
    )
VALUES
    (
        2,
        0.60,
        10,
        5,
        8,
        0.75,
        48,
        1200.00,
        1.5,
        0.0020,
        0.0030
    );

INSERT INTO
    zone (rule_id)
VALUES
    (1);

INSERT INTO
    parcel (lot_area, lot_width, lot_length, zone_id)
VALUES
    (5000, 50, 100, 1);

CREATE OR REPLACE FUNCTION footprintMax ()
RETURNS double precision as $$
BEGIN RETURN (
    select
        LEAST(
            -- Footprint by Coverage
            (lot_area * lot_coverage_max),
            -- Footprint by Setback
            (
                (lot_length - setback_front - setback_rear) *(lot_width - setback_side - setback_side)
            )
        ) as footprint_max
    from
        zone
        left join rule on zone.rule_id = rule.id
        left join parcel on zone.id = parcel.zone_id
);
END; $$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION capacityMaxByFAR ()
RETURNS double precision as $$
BEGIN RETURN (
    select
        lot_area * FAR as capacity_max_by_far
    from
        zone
        left join rule on zone.rule_id = rule.id
        left join parcel on zone.id = parcel.zone_id
);
END; $$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION capacityMaxByBulk ()
RETURNS double precision as $$
BEGIN RETURN (
    select
        footprintMax() * levels_max as capacity_max_by_bulk
    from
        zone
        left join rule on zone.rule_id = rule.id
        left join parcel on zone.id = parcel.zone_id
);
END; $$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION capacityMax ()
RETURNS double precision as $$
BEGIN RETURN (
    select
        LEAST(
            capacityMaxByFAR(),
            capacityMaxByBulk()
        ) as capacity_max
    from
        zone
        left join rule on zone.rule_id = rule.id
        left join parcel on zone.id = parcel.zone_id
);
END; $$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION dwellingUnitsByDensity ()
RETURNS double precision as $$
BEGIN RETURN (
    select
        (lot_area / 43560.0 * density) as dwelling_units_by_density
    from
        zone
        left join rule on zone.rule_id = rule.id
        left join parcel on zone.id = parcel.zone_id
);
END; $$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION dwellingUnitsByBulk ()
RETURNS double precision as $$
BEGIN RETURN (
    select
        (capacityMax() / unit_size_min) as dwelling_units_by_bulk
    from
        zone
        left join rule on zone.rule_id = rule.id
        left join parcel on zone.id = parcel.zone_id
);
END; $$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION dwellingUnitsMax ()
RETURNS double precision as $$
BEGIN RETURN (
    select
        LEAST(
            ceil(dwellingUnitsByDensity()),
            ceil(dwellingUnitsByBulk())
        ) as dwelling_units_maximum
);
END; $$ LANGUAGE plpgsql IMMUTABLE;