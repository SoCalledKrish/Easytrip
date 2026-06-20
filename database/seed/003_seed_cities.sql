INSERT INTO cities
(
state_id,
name,
slug,
latitude,
longitude,
best_time_to_visit,
ideal_trip_days,
description
)

VALUES

(
(SELECT id FROM states WHERE slug='karnataka'),
'Bangalore',
'bangalore',
12.9716,
77.5946,
'October to February',
3,
'Capital city of Karnataka.'
),

(
(SELECT id FROM states WHERE slug='karnataka'),
'Mysore',
'mysore',
12.2958,
76.6394,
'October to February',
2,
'Heritage city famous for Mysore Palace.'
),

(
(SELECT id FROM states WHERE slug='karnataka'),
'Udupi',
'udupi',
13.3409,
74.7421,
'October to February',
2,
'Temple town and beach destination.'
),

(
(SELECT id FROM states WHERE slug='karnataka'),
'Coorg',
'coorg',
12.3375,
75.8069,
'October to March',
3,
'Hill station known for coffee plantations.'
);