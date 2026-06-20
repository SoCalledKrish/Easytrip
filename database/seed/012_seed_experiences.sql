INSERT INTO experiences
(
city_id,
title,
slug,
description,
duration_minutes,
price_min,
price_max
)

VALUES

(
(SELECT id FROM cities WHERE slug='mangalore'),

'Sunset Beach Walk',

'sunset-beach-walk',

'Enjoy a relaxing evening walk along Panambur Beach.',

120,

0,

0

),

(
(SELECT id FROM cities WHERE slug='mangalore'),

'Local Food Tour',

'local-food-tour',

'Explore authentic Mangalorean cuisine.',

180,

300,

700

),

(
(SELECT id FROM cities WHERE slug='mangalore'),

'Temple Heritage Tour',

'temple-heritage-tour',

'Visit famous temples across the city.',

240,

200,

500

);