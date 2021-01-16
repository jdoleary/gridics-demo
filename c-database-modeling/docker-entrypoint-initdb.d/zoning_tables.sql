CREATE TABLE rule (
    id serial primary key,
    levels_max integer,
    lot_coverage_max real,
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

CREATE TABLE zone (
    id serial primary key,
    rule_id integer,
    CONSTRAINT fk_rule 
        FOREIGN KEY(rule_id)
        REFERENCES rule(id)
        ON DELETE SET NULL
);

CREATE TABLE parcel (
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


INSERT INTO rule  (levels_max, lot_coverage_max, setback_front,
setback_side, setback_rear, FAR, density, unit_size_min, residential_parking_min, office_parking_min, commercial_parking_min)
VALUES (2, 60.00, 10,5,8,0.75, 48, 1200.00, 1.5, 0.0020, 0.0030);

INSERT INTO zone (rule_id)
VALUES (1);

INSERT INTO parcel  (lot_area, lot_width, lot_length, zone_id)
VALUES (5000, 50, 100, 1);
