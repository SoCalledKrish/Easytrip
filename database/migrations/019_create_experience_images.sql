CREATE TABLE experience_images (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    experience_id UUID NOT NULL
        REFERENCES experiences(id)
        ON DELETE CASCADE,

    image_url TEXT NOT NULL,

    caption TEXT,

    display_order SMALLINT NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(experience_id, display_order)

);

CREATE INDEX idx_experience_images_experience
ON experience_images(experience_id);