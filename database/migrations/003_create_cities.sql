CREATE TABLE cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_id UUID NOT NULL
        REFERENCES states(id)
        ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    best_time_to_visit TEXT,
    ideal_trip_days SMALLINT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(state_id, name),
    UNIQUE(state_id, slug)
);

CREATE INDEX idx_cities_state
ON cities(state_id);

CREATE INDEX idx_cities_location
ON cities(latitude, longitude);
