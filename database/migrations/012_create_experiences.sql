CREATE TABLE experiences (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    city_id UUID NOT NULL
        REFERENCES cities(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    slug TEXT NOT NULL,

    description TEXT,

    duration_minutes SMALLINT,

    price_min NUMERIC(10,2),

    price_max NUMERIC(10,2),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(city_id, slug)

);

CREATE INDEX idx_experiences_city
ON experiences(city_id);

CREATE INDEX idx_experiences_slug
ON experiences(slug);