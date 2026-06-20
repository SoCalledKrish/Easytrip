INSERT INTO destination_images
(
destination_id,
image_url,
caption,
display_order
)

VALUES

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),

'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',

'Panambur Beach View',

1

),

(
(SELECT id FROM destinations WHERE slug='tannirbhavi-beach'),

'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',

'Tannirbhavi Beach',

1

),

(
(SELECT id FROM destinations WHERE slug='kadri-manjunath-temple'),

'https://images.unsplash.com/photo-1524492449090-1abe1e2f68c8',

'Kadri Temple',

1

);