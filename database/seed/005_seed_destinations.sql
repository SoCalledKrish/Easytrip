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

-- Mangalore

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

-- Mysore

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
),

-- Bangalore

(
    (SELECT id FROM cities WHERE slug='bangalore'),
    (SELECT id FROM categories WHERE slug='museum'),
    'Bangalore Palace',
    'bangalore-palace',
    'Historic palace known for its Tudor-style architecture.',
    'Bangalore Palace is a prominent heritage attraction in the city, known for its distinctive architecture and historic significance.',
    200,
    500,
    120,
    13.0035,
    77.5920,
    TRUE
),

(
    (SELECT id FROM cities WHERE slug='bangalore'),
    (SELECT id FROM categories WHERE slug='park'),
    'Lalbagh Botanical Garden',
    'lalbagh-botanical-garden',
    'Historic botanical garden in the heart of Bangalore.',
    'Lalbagh Botanical Garden is a large urban garden known for its extensive collection of plants, landscaped areas and glasshouse.',
    0,
    100,
    150,
    12.9507,
    77.5848,
    TRUE
),

(
    (SELECT id FROM cities WHERE slug='bangalore'),
    (SELECT id FROM categories WHERE slug='park'),
    'Cubbon Park',
    'cubbon-park',
    'Large green space in central Bangalore.',
    'Cubbon Park is a major urban park offering landscaped gardens, walking paths and a peaceful escape within the city.',
    0,
    0,
    120,
    12.9763,
    77.5929,
    TRUE
),

(
    (SELECT id FROM cities WHERE slug='bangalore'),
    (SELECT id FROM categories WHERE slug='museum'),
    'Visvesvaraya Industrial and Technological Museum',
    'visvesvaraya-industrial-technological-museum',
    'Interactive museum focused on science and technology.',
    'The Visvesvaraya Industrial and Technological Museum features exhibits covering science, engineering and technology.',
    50,
    200,
    120,
    12.9753,
    77.5963,
    TRUE
),

(
    (SELECT id FROM cities WHERE slug='bangalore'),
    (SELECT id FROM categories WHERE slug='temple'),
    'ISKCON Temple Bangalore',
    'iskcon-temple-bangalore',
    'Major spiritual and cultural centre in Bangalore.',
    'ISKCON Temple Bangalore is a prominent temple complex known for its architecture, religious activities and cultural significance.',
    0,
    0,
    90,
    13.0108,
    77.5511,
    TRUE
),

(
    (SELECT id FROM cities WHERE slug='bangalore'),
    (SELECT id FROM categories WHERE slug='view-point'),
    'Vidhana Soudha',
    'vidhana-soudha',
    'Iconic landmark and seat of the Karnataka legislature.',
    'Vidhana Soudha is one of Bangalore’s most recognizable architectural landmarks, known for its grand Neo-Dravidian design.',
    0,
    0,
    60,
    12.9796,
    77.5906,
    TRUE
);