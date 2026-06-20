INSERT INTO destination_tags
(destination_id, tag_id)

VALUES

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
(SELECT id FROM tags WHERE slug='sunset')
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
(SELECT id FROM tags WHERE slug='family-friendly')
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
(SELECT id FROM tags WHERE slug='photography')
),

(
(SELECT id FROM destinations WHERE slug='tannirbhavi-beach'),
(SELECT id FROM tags WHERE slug='nature')
),

(
(SELECT id FROM destinations WHERE slug='kadri-manjunath-temple'),
(SELECT id FROM tags WHERE slug='historical')
);