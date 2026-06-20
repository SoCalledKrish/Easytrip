CREATE TABLE destination_facilities (

    destination_id UUID NOT NULL
        REFERENCES destinations(id)
        ON DELETE CASCADE,

    facility_id UUID NOT NULL
        REFERENCES facilities(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY(destination_id, facility_id)

);

CREATE INDEX idx_destination_facilities_destination
ON destination_facilities(destination_id);

CREATE INDEX idx_destination_facilities_facility
ON destination_facilities(facility_id);