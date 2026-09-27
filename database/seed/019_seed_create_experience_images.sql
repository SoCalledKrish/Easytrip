INSERT INTO experience_images (
    experience_id,
    image_url,
    caption,
    display_order
)
SELECT
    experiences.id,
    image.image_url,
    image.caption,
    image.display_order
FROM experiences
CROSS JOIN (
    VALUES
        (
            'https://images.unsplash.com/photo-1601050690597-df0568f70950',
            'Local Indian food experience',
            1
        ),
        (
            'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f',
            'Exploring local cuisine',
            2
        ),
        (
            'https://images.unsplash.com/photo-1552566626-52f8b828add9',
            'Restaurant and food culture',
            3
        )
) AS image(image_url, caption, display_order)
WHERE experiences.slug = 'bangalore-food-walk'
  AND experiences.city_id = (
      SELECT cities.id
      FROM cities
      JOIN states
          ON states.id = cities.state_id
      JOIN countries
          ON countries.id = states.country_id
      WHERE countries.slug = 'india'
        AND states.slug = 'karnataka'
        AND cities.slug = 'bangalore'
  )
ON CONFLICT (experience_id, display_order) DO NOTHING;