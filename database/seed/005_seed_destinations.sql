INSERT INTO destinations
(
city_id,
category_id,
name,
slug,
short_description,
full_description,
entry_fee_min,
entry_fee_max,
visit_duration_minutes,
latitude,
longitude,
is_featured
)

VALUES

(

(SELECT id FROM cities WHERE slug='mangalore'),

(SELECT id FROM categories WHERE slug='beach'),

'Panambur Beach',

'panambur-beach',

'Popular beach known for sunsets and water sports.',

'Panambur Beach is one of the most visited beaches in Mangalore, offering water sports, food stalls and beautiful sunsets.',

0,

0,

180,

12.9544,

74.7985,

TRUE

),

(

(SELECT id FROM cities WHERE slug='mangalore'),

(SELECT id FROM categories WHERE slug='beach'),

'Tannirbhavi Beach',

'tannirbhavi-beach',

'Peaceful beach surrounded by nature.',

'Tannirbhavi Beach offers a quiet atmosphere and is ideal for families and evening walks.',

0,

0,

180,

12.9710,

74.7925,

TRUE

),

(

(SELECT id FROM cities WHERE slug='mangalore'),

(SELECT id FROM categories WHERE slug='temple'),

'Kadri Manjunath Temple',

'kadri-manjunath-temple',

'Historic temple dedicated to Lord Shiva.',

'Kadri Manjunath Temple is one of the oldest temples in South India with beautiful architecture.',

0,

50,

90,

12.8895,

74.8510,

TRUE

),

(

(SELECT id FROM cities WHERE slug='mysore'),

(SELECT id FROM categories WHERE slug='museum'),

'Mysore Palace',

'mysore-palace',

'Iconic royal palace of Mysore.',

'Mysore Palace is one of the most famous heritage monuments in India and attracts millions of visitors.',

100,

200,

150,

12.3052,

76.6552,

TRUE

);