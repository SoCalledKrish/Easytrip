CREATE TABLE destination_images (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    destination_id UUID NOT NULL
        REFERENCES destinations(id)
        ON DELETE CASCADE,

    image_url TEXT NOT NULL,

    caption TEXT,

    display_order SMALLINT DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_destination_images_destination
ON destination_images(destination_id);