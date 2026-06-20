INSERT INTO cost_estimates
(
city_id,
budget_type,
stay_cost,
food_cost,
transport_cost,
activity_cost,
miscellaneous_cost
)

VALUES

(
(SELECT id FROM cities WHERE slug='mangalore'),
'Budget',
1200,
500,
300,
300,
200
),

(
(SELECT id FROM cities WHERE slug='mangalore'),
'Standard',
2500,
1000,
500,
800,
500
),

(
(SELECT id FROM cities WHERE slug='mangalore'),
'Luxury',
6000,
2500,
1200,
2000,
1000
);