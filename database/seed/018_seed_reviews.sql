INSERT INTO reviews
(
user_id,
destination_id,
rating,
comment
)

VALUES

(
(SELECT id FROM users WHERE email='abhiram@example.com'),

(SELECT id FROM destinations WHERE slug='panambur-beach'),

5,

'Amazing place to watch the sunset!'
),

(
(SELECT id FROM users WHERE email='john@example.com'),

(SELECT id FROM destinations WHERE slug='kadri-manjunath-temple'),

4,

'Beautiful temple with rich history.'
);