CREATE TABLE operating_hours (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    destination_id UUID NOT NULL
        REFERENCES destinations(id)
        ON DELETE CASCADE,

    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),

    open_time TIME,

    close_time TIME,

    is_closed BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_operating_hours_destination
ON operating_hours(destination_id);