INSERT INTO favorites
(
user_id,
destination_id
)

VALUES

(
(SELECT id FROM users WHERE email='abhiram@example.com'),

(SELECT id FROM destinations WHERE slug='panambur-beach')
),

(
(SELECT id FROM users WHERE email='john@example.com'),

(SELECT id FROM destinations WHERE slug='kadri-manjunath-temple')
);