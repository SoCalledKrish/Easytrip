CREATE TABLE destination_tags (

    destination_id UUID NOT NULL
        REFERENCES destinations(id)
        ON DELETE CASCADE,

    tag_id UUID NOT NULL
        REFERENCES tags(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY(destination_id, tag_id)

);

CREATE INDEX idx_destination_tags_destination
ON destination_tags(destination_id);

CREATE INDEX idx_destination_tags_tag
ON destination_tags(tag_id);