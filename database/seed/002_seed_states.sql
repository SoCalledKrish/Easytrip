INSERT INTO states (country_id,name,code,slug) VALUES(
(
SELECT id FROM countries
WHERE code='IN'
),
'Karnataka',
'KA',
'karnataka'
);