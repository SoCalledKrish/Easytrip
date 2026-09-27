from sqlalchemy import text
from app.database import engine
from fastapi import APIRouter, HTTPException


router = APIRouter(
    prefix="/countries",
    tags=["Countries"],
)


# =========================================================
# VALIDATION HELPERS
# =========================================================

def get_country_id(conn, country_slug: str):
    result = conn.execute(
        text("""
            SELECT id
            FROM countries
            WHERE slug = :country_slug;
        """),
        {"country_slug": country_slug},
    ).first()

    if not result:
        raise HTTPException(
            status_code=404,
            detail=f"Country '{country_slug}' not found",
        )

    return result.id


def get_state_id(
    conn,
    country_slug: str,
    state_slug: str,
):
    result = conn.execute(
        text("""
            SELECT
                states.id
            FROM states
            JOIN countries
                ON countries.id = states.country_id
            WHERE countries.slug = :country_slug
              AND states.slug = :state_slug;
        """),
        {
            "country_slug": country_slug,
            "state_slug": state_slug,
        },
    ).first()

    if not result:
        raise HTTPException(
            status_code=404,
            detail=(
                f"State '{state_slug}' not found "
                f"in country '{country_slug}'"
            ),
        )

    return result.id


def get_city_id(
    conn,
    country_slug: str,
    state_slug: str,
    city_slug: str,
):
    result = conn.execute(
        text("""
            SELECT
                cities.id
            FROM cities
            JOIN states
                ON states.id = cities.state_id
            JOIN countries
                ON countries.id = states.country_id
            WHERE countries.slug = :country_slug
              AND states.slug = :state_slug
              AND cities.slug = :city_slug;
        """),
        {
            "country_slug": country_slug,
            "state_slug": state_slug,
            "city_slug": city_slug,
        },
    ).first()

    if not result:
        raise HTTPException(
            status_code=404,
            detail=(
                f"City '{city_slug}' not found "
                f"in state '{state_slug}', "
                f"country '{country_slug}'"
            ),
        )

    return result.id


# =========================================================
# COUNTRIES
# =========================================================

@router.get("/")
def get_countries():
    with engine.connect() as conn:
        result = conn.execute(
            text("""
                SELECT
                    id,
                    name,
                    code,
                    slug
                FROM countries
                ORDER BY name;
            """)
        )

        return [
            dict(row._mapping)
            for row in result
        ]


# =========================================================
# STATES
# =========================================================

@router.get("/{country_slug}/states")
def get_states(country_slug: str):
    with engine.connect() as conn:

        # Make sure the country exists.
        get_country_id(
            conn,
            country_slug,
        )

        result = conn.execute(
            text("""
                SELECT
                    states.id,
                    states.name,
                    states.code,
                    states.slug
                FROM states
                JOIN countries
                    ON countries.id = states.country_id
                WHERE countries.slug = :country_slug
                ORDER BY states.name;
            """),
            {
                "country_slug": country_slug,
            },
        )

        return [
            dict(row._mapping)
            for row in result
        ]


# =========================================================
# CITIES
# =========================================================

@router.get("/{country_slug}/states/{state_slug}/cities")
def get_cities(
    country_slug: str,
    state_slug: str,
):
    with engine.connect() as conn:

        # Make sure the country/state combination exists.
        get_state_id(
            conn,
            country_slug,
            state_slug,
        )

        result = conn.execute(
            text("""
                SELECT
                    cities.id,
                    cities.name,
                    cities.slug,
                    cities.latitude,
                    cities.longitude,
                    cities.best_time_to_visit,
                    cities.ideal_trip_days,
                    cities.description
                FROM cities
                JOIN states
                    ON states.id = cities.state_id
                JOIN countries
                    ON countries.id = states.country_id
                WHERE countries.slug = :country_slug
                  AND states.slug = :state_slug
                ORDER BY cities.name;
            """),
            {
                "country_slug": country_slug,
                "state_slug": state_slug,
            },
        )

        return [
            dict(row._mapping)
            for row in result
        ]


# =========================================================
# DESTINATIONS
# =========================================================

@router.get(
    "/{country_slug}/states/{state_slug}/cities/{city_slug}/destinations"
)
def get_destinations(
    country_slug: str,
    state_slug: str,
    city_slug: str,
):
    with engine.connect() as conn:

        # Make sure the city exists.
        get_city_id(
            conn,
            country_slug,
            state_slug,
            city_slug,
        )

        result = conn.execute(
            text("""
                SELECT
                    destinations.id,
                    destinations.name,
                    destinations.slug,
                    destinations.short_description,
                    destinations.full_description,
                    destinations.entry_fee_min,
                    destinations.entry_fee_max,
                    destinations.visit_duration_minutes,
                    destinations.latitude,
                    destinations.longitude,
                    destinations.google_maps_url
                FROM destinations
                JOIN cities
                    ON cities.id = destinations.city_id
                JOIN states
                    ON states.id = cities.state_id
                JOIN countries
                    ON countries.id = states.country_id
                WHERE countries.slug = :country_slug
                  AND states.slug = :state_slug
                  AND cities.slug = :city_slug
                ORDER BY destinations.name;
            """),
            {
                "country_slug": country_slug,
                "state_slug": state_slug,
                "city_slug": city_slug,
            },
        )

        return [
            dict(row._mapping)
            for row in result
        ]


# =========================================================
# DESTINATION DETAIL
# =========================================================

@router.get(
    "/{country_slug}/states/{state_slug}/cities/{city_slug}/destinations/{destination_slug}"
)
def get_destination(
    country_slug: str,
    state_slug: str,
    city_slug: str,
    destination_slug: str,
):
    with engine.connect() as conn:

        # Make sure the city exists first.
        city_id = get_city_id(
            conn,
            country_slug,
            state_slug,
            city_slug,
        )

        destination_result = conn.execute(
            text("""
                SELECT
                    destinations.id,
                    destinations.name,
                    destinations.slug,
                    destinations.short_description,
                    destinations.full_description,
                    destinations.entry_fee_min,
                    destinations.entry_fee_max,
                    destinations.visit_duration_minutes,
                    destinations.latitude,
                    destinations.longitude,
                    destinations.google_maps_url
                FROM destinations
                WHERE destinations.city_id = :city_id
                  AND destinations.slug = :destination_slug;
            """),
            {
                "city_id": city_id,
                "destination_slug": destination_slug,
            },
        )

        destination = destination_result.fetchone()

        if destination is None:
            raise HTTPException(
                status_code=404,
                detail=(
                    f"Destination '{destination_slug}' "
                    f"not found in city '{city_slug}'"
                ),
            )

        image_result = conn.execute(
            text("""
                SELECT
                    id,
                    image_url,
                    caption,
                    display_order
                FROM destination_images
                WHERE destination_id = :destination_id
                ORDER BY display_order;
            """),
            {
                "destination_id": destination.id,
            },
        )

        hours_result = conn.execute(
            text("""
                SELECT
                    id,
                    day_of_week,
                    open_time,
                    close_time,
                    is_closed
                FROM operating_hours
                WHERE destination_id = :destination_id
                ORDER BY day_of_week;
            """),
            {
                "destination_id": destination.id,
            },
        )

        return {
            "destination": dict(destination._mapping),
            "images": [
                dict(row._mapping)
                for row in image_result
            ],
            "operating_hours": [
                dict(row._mapping)
                for row in hours_result
            ],
        }


# =========================================================
# EXPERIENCES
# =========================================================

@router.get(
    "/{country_slug}/states/{state_slug}/cities/{city_slug}/experiences"
)
def get_experiences(
    country_slug: str,
    state_slug: str,
    city_slug: str,
):
    with engine.connect() as conn:

        # Make sure the city exists.
        get_city_id(
            conn,
            country_slug,
            state_slug,
            city_slug,
        )

        experience_result = conn.execute(
            text("""
                SELECT
                    experiences.id,
                    experiences.title,
                    experiences.slug,
                    experiences.description,
                    experiences.duration_minutes,
                    experiences.price_min,
                    experiences.price_max
                FROM experiences
                JOIN cities
                    ON cities.id = experiences.city_id
                JOIN states
                    ON states.id = cities.state_id
                JOIN countries
                    ON countries.id = states.country_id
                WHERE countries.slug = :country_slug
                  AND states.slug = :state_slug
                  AND cities.slug = :city_slug
                ORDER BY experiences.title;
            """),
            {
                "country_slug": country_slug,
                "state_slug": state_slug,
                "city_slug": city_slug,
            },
        )

        experiences = []

        for experience in experience_result:

            image_result = conn.execute(
                text("""
                    SELECT
                        id,
                        image_url,
                        caption,
                        display_order
                    FROM experience_images
                    WHERE experience_id = :experience_id
                    ORDER BY display_order;
                """),
                {
                    "experience_id": experience.id,
                },
            )

            experiences.append(
                {
                    **dict(experience._mapping),
                    "images": [
                        dict(row._mapping)
                        for row in image_result
                    ],
                }
            )

        return experiences


# =========================================================
# STAY AREAS
# =========================================================

@router.get(
    "/{country_slug}/states/{state_slug}/cities/{city_slug}/stay-areas"
)
def get_stay_areas(
    country_slug: str,
    state_slug: str,
    city_slug: str,
):
    with engine.connect() as conn:

        # Make sure the city exists.
        get_city_id(
            conn,
            country_slug,
            state_slug,
            city_slug,
        )

        result = conn.execute(
            text("""
                SELECT
                    stay_areas.id,
                    stay_areas.name,
                    stay_areas.slug,
                    stay_areas.budget_type,
                    stay_areas.description,
                    stay_areas.near_transport,
                    stay_areas.family_friendly
                FROM stay_areas
                JOIN cities
                    ON cities.id = stay_areas.city_id
                JOIN states
                    ON states.id = cities.state_id
                JOIN countries
                    ON countries.id = states.country_id
                WHERE countries.slug = :country_slug
                  AND states.slug = :state_slug
                  AND cities.slug = :city_slug
                ORDER BY stay_areas.name;
            """),
            {
                "country_slug": country_slug,
                "state_slug": state_slug,
                "city_slug": city_slug,
            },
        )

        return [
            dict(row._mapping)
            for row in result
        ]


# =========================================================
# TRAVEL ROUTES - ALL ROUTES
# =========================================================

@router.get("/routes")
def get_all_travel_routes():
    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT
                    travel_routes.id,
                    source_city.name AS source_city,
                    source_city.slug AS source_city_slug,
                    destination_city.name AS destination_city,
                    destination_city.slug AS destination_city_slug,
                    travel_routes.travel_mode,
                    travel_routes.distance_km,
                    travel_routes.travel_time_minutes,
                    travel_routes.cost_min,
                    travel_routes.cost_max
                FROM travel_routes
                JOIN cities AS source_city
                    ON source_city.id = travel_routes.source_city_id
                JOIN cities AS destination_city
                    ON destination_city.id = travel_routes.destination_city_id
                ORDER BY
                    source_city.name,
                    destination_city.name,
                    travel_routes.travel_mode;
            """)
        )

        return [
            dict(row._mapping)
            for row in result
        ]


# =========================================================
# TRAVEL ROUTES - SPECIFIC ROUTE
# =========================================================

@router.get(
    "/routes/{source_city_slug}/{destination_city_slug}"
)
def get_travel_routes(
    source_city_slug: str,
    destination_city_slug: str,
):
    with engine.connect() as conn:

        # Validate source city.
        source_city = conn.execute(
            text("""
                SELECT
                    id,
                    name
                FROM cities
                WHERE slug = :slug;
            """),
            {
                "slug": source_city_slug,
            },
        ).first()

        if not source_city:
            raise HTTPException(
                status_code=404,
                detail=(
                    f"Source city "
                    f"'{source_city_slug}' not found"
                ),
            )

        # Validate destination city.
        destination_city = conn.execute(
            text("""
                SELECT
                    id,
                    name
                FROM cities
                WHERE slug = :slug;
            """),
            {
                "slug": destination_city_slug,
            },
        ).first()

        if not destination_city:
            raise HTTPException(
                status_code=404,
                detail=(
                    f"Destination city "
                    f"'{destination_city_slug}' not found"
                ),
            )

        result = conn.execute(
            text("""
                SELECT
                    travel_routes.id,
                    source_city.name AS source_city,
                    source_city.slug AS source_city_slug,
                    destination_city.name AS destination_city,
                    destination_city.slug AS destination_city_slug,
                    travel_routes.travel_mode,
                    travel_routes.distance_km,
                    travel_routes.travel_time_minutes,
                    travel_routes.cost_min,
                    travel_routes.cost_max
                FROM travel_routes
                JOIN cities AS source_city
                    ON source_city.id = travel_routes.source_city_id
                JOIN cities AS destination_city
                    ON destination_city.id = travel_routes.destination_city_id
                WHERE source_city.slug = :source_city_slug
                  AND destination_city.slug = :destination_city_slug
                ORDER BY travel_routes.travel_mode;
            """),
            {
                "source_city_slug": source_city_slug,
                "destination_city_slug": destination_city_slug,
            },
        )

        # No route is not a missing city.
        # A valid city pair can legitimately have no
        # route information yet, so return HTTP 200 + [].
        return [
            dict(row._mapping)
            for row in result
        ]


# =========================================================
# COST ESTIMATES
# =========================================================

@router.get(
    "/{country_slug}/states/{state_slug}/cities/{city_slug}/cost-estimates"
)
def get_cost_estimates(
    country_slug: str,
    state_slug: str,
    city_slug: str,
):
    with engine.connect() as conn:

        # Make sure the city exists.
        get_city_id(
            conn,
            country_slug,
            state_slug,
            city_slug,
        )

        result = conn.execute(
            text("""
                SELECT
                    cost_estimates.id,
                    cost_estimates.budget_type,
                    cost_estimates.stay_cost,
                    cost_estimates.food_cost,
                    cost_estimates.transport_cost,
                    cost_estimates.activity_cost,
                    cost_estimates.miscellaneous_cost
                FROM cost_estimates
                JOIN cities
                    ON cities.id = cost_estimates.city_id
                JOIN states
                    ON states.id = cities.state_id
                JOIN countries
                    ON countries.id = states.country_id
                WHERE countries.slug = :country_slug
                  AND states.slug = :state_slug
                  AND cities.slug = :city_slug
                ORDER BY
                    CASE cost_estimates.budget_type
                        WHEN 'Budget' THEN 1
                        WHEN 'Standard' THEN 2
                        WHEN 'Premium' THEN 3
                        ELSE 4
                    END;
            """),
            {
                "country_slug": country_slug,
                "state_slug": state_slug,
                "city_slug": city_slug,
            },
        )

        estimates = []

        for row in result:

            data = dict(row._mapping)

            daily_total = sum(
                value or 0
                for value in [
                    data["stay_cost"],
                    data["food_cost"],
                    data["transport_cost"],
                    data["activity_cost"],
                    data["miscellaneous_cost"],
                ]
            )

            data["daily_total"] = daily_total

            estimates.append(data)

        return estimates