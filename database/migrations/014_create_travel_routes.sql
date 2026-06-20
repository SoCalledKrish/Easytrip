CREATE TABLE travel_routes (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    source_city_id UUID NOT NULL
        REFERENCES cities(id)
        ON DELETE CASCADE,

    destination_city_id UUID NOT NULL
        REFERENCES cities(id)
        ON DELETE CASCADE,

    travel_mode TEXT NOT NULL,

    distance_km NUMERIC(10,2) NOT NULL,

    travel_time_minutes INTEGER NOT NULL,

    cost_min NUMERIC(10,2),

    cost_max NUMERIC(10,2),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (source_city_id <> destination_city_id)

);

CREATE INDEX idx_travel_routes_source
ON travel_routes(source_city_id);

CREATE INDEX idx_travel_routes_destination
ON travel_routes(destination_city_id);