CREATE TABLE stay_areas (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    city_id UUID NOT NULL
        REFERENCES cities(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    slug TEXT NOT NULL,

    budget_type TEXT NOT NULL,

    description TEXT,

    near_transport BOOLEAN DEFAULT FALSE,

    family_friendly BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(city_id, slug)

);

CREATE INDEX idx_stay_areas_city
ON stay_areas(city_id);

CREATE INDEX idx_stay_areas_slug
ON stay_areas(slug);