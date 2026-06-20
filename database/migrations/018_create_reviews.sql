CREATE TABLE reviews (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    destination_id UUID NOT NULL
        REFERENCES destinations(id)
        ON DELETE CASCADE,

    rating SMALLINT NOT NULL
        CHECK (rating BETWEEN 1 AND 5),

    comment TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_reviews_user
ON reviews(user_id);

CREATE INDEX idx_reviews_destination
ON reviews(destination_id);