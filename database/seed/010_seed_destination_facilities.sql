INSERT INTO destination_facilities
(destination_id, facility_id)

VALUES

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
(SELECT id FROM facilities WHERE slug='parking')
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
(SELECT id FROM facilities WHERE slug='washroom')
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
(SELECT id FROM facilities WHERE slug='drinking-water')
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
(SELECT id FROM facilities WHERE slug='restaurant')
),

(
(SELECT id FROM destinations WHERE slug='kadri-manjunath-temple'),
(SELECT id FROM facilities WHERE slug='parking')
),

(
(SELECT id FROM destinations WHERE slug='kadri-manjunath-temple'),
(SELECT id FROM facilities WHERE slug='drinking-water')
);