INSERT INTO stay_areas
(
city_id,
name,
slug,
budget_type,
description,
near_transport,
family_friendly
)

VALUES

(
(SELECT id FROM cities WHERE slug='mangalore'),

'Hampankatta',

'hampankatta',

'Standard',

'Central location with shopping and restaurants.',

TRUE,

TRUE

),

(
(SELECT id FROM cities WHERE slug='mangalore'),

'Kadri',

'kadri',

'Budget',

'Quiet residential locality near temples.',

TRUE,

TRUE

),

(
(SELECT id FROM cities WHERE slug='mangalore'),

'Panambur',

'panambur',

'Luxury',

'Ideal for beach lovers and premium resorts.',

FALSE,

TRUE

);