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
(
SELECT id
FROM states
WHERE slug='karnataka'
),

'Mangalore',

'mangalore',

12.9141,

74.8560,

'October to February',

3,

'Coastal city famous for beaches, temples and cuisine.'
);