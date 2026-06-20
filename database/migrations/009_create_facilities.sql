CREATE TABLE facilities (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    slug TEXT NOT NULL,

    icon TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(name),

    UNIQUE(slug)

);

CREATE INDEX idx_facilities_slug
ON facilities(slug);