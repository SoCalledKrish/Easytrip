CREATE TABLE cost_estimates (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    city_id UUID NOT NULL
        REFERENCES cities(id)
        ON DELETE CASCADE,

    budget_type TEXT NOT NULL,

    stay_cost NUMERIC(10,2),

    food_cost NUMERIC(10,2),

    transport_cost NUMERIC(10,2),

    activity_cost NUMERIC(10,2),

    miscellaneous_cost NUMERIC(10,2),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_cost_estimates_city
ON cost_estimates(city_id);