CREATE TABLE favorites (

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    destination_id UUID NOT NULL
        REFERENCES destinations(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY(user_id, destination_id)

);

CREATE INDEX idx_favorites_user
ON favorites(user_id);

CREATE INDEX idx_favorites_destination
ON favorites(destination_id);