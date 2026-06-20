
CREATE TABLE states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID NOT NULL
        REFERENCES countries(id)
        ON DELETE CASCADE,
    name TEXT NOT NULL,
    code VARCHAR(10),
    slug TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(country_id, name),
    UNIQUE(country_id, slug)
);

CREATE INDEX idx_states_country
ON states(country_id);
