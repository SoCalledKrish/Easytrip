INSERT INTO travel_routes
(
source_city_id,
destination_city_id,
travel_mode,
distance_km,
travel_time_minutes,
cost_min,
cost_max
)

VALUES

(
(SELECT id FROM cities WHERE slug='mangalore'),
(SELECT id FROM cities WHERE slug='udupi'),
'Car',
60,
75,
300,
600
),

(
(SELECT id FROM cities WHERE slug='mangalore'),
(SELECT id FROM cities WHERE slug='mysore'),
'Car',
255,
330,
3500,
5000
),

(
(SELECT id FROM cities WHERE slug='mangalore'),
(SELECT id FROM cities WHERE slug='bangalore'),
'Bus',
350,
480,
700,
1200
);