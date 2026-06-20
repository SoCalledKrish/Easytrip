INSERT INTO operating_hours
(
destination_id,
day_of_week,
open_time,
close_time,
is_closed
)

VALUES

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
0,
'06:00',
'20:00',
FALSE
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
1,
'06:00',
'20:00',
FALSE
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
2,
'06:00',
'20:00',
FALSE
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
3,
'06:00',
'20:00',
FALSE
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
4,
'06:00',
'20:00',
FALSE
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
5,
'06:00',
'20:00',
FALSE
),

(
(SELECT id FROM destinations WHERE slug='panambur-beach'),
6,
'06:00',
'20:00',
FALSE
);