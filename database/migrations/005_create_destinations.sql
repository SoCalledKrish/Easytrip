CREATE TABLE destinations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    city_id UUID NOT NULL
        REFERENCES cities(id)
        ON DELETE CASCADE,

    category_id UUID NOT NULL
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    name TEXT NOT NULL,

    slug TEXT NOT NULL,

    short_description TEXT,

    full_description TEXT,

    entry_fee_min NUMERIC(10,2),

    entry_fee_max NUMERIC(10,2),

    visit_duration_minutes SMALLINT,

    latitude NUMERIC(10,7),

    longitude NUMERIC(10,7),

    google_maps_url TEXT,

    official_website TEXT,

    is_featured BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(city_id, name),

    UNIQUE(city_id, slug)

);

CREATE INDEX idx_destinations_city
ON destinations(city_id);

CREATE INDEX idx_destinations_category
ON destinations(category_id);

CREATE INDEX idx_destinations_slug
ON destinations(slug);

CREATE INDEX idx_destinations_location
ON destinations(latitude, longitude);