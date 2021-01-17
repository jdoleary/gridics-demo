
select footprintMax();
select capacityMax();
select dwellingUnitsMax();
select CASE
    WHEN capacityMax()=capacityMaxByBulk() and dwellingUnitsMax()=dwellingUnitsByBulk()
    THEN 'This is most likely a form based code'
    ELSE 'This is most likely a use based code'
    END;