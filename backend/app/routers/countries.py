from fastapi import APIRouter
from sqlalchemy import text
from app.database import engine

router = APIRouter(
    prefix="/countries",
    tags=["Countries"]
)


@router.get("/")
def get_countries():

    with engine.connect() as conn:

        result = conn.execute(text("""
            SELECT
                id,
                name,
                code,
                slug
            FROM countries
            ORDER BY name;
        """))

        countries = [
            dict(row._mapping)
            for row in result
        ]

        return countries

@router.get("/{country_slug}/states")
def get_states(country_slug: str):
    with engine.connect() as conn:
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
            {"country_slug": country_slug},
        )
        return [
            dict(row._mapping)
            for row in result
        ]

@router.get("/{country_slug}/states/{state_slug}/cities")
def get_cities(country_slug: str, state_slug: str):
    with engine.connect() as conn:
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

@router.get("/{country_slug}/states/{state_slug}/cities/{city_slug}/destinations")
def get_destinations(
    country_slug: str,
    state_slug: str,
    city_slug: str,
):
    with engine.connect() as conn:
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
                JOIN cities
                    ON cities.id = destinations.city_id
                JOIN states
                    ON states.id = cities.state_id
                JOIN countries
                    ON countries.id = states.country_id
                WHERE countries.slug = :country_slug
                  AND states.slug = :state_slug
                  AND cities.slug = :city_slug
                  AND destinations.slug = :destination_slug;
            """),
            {
                "country_slug": country_slug,
                "state_slug": state_slug,
                "city_slug": city_slug,
                "destination_slug": destination_slug,
            },
        )

        destination = destination_result.fetchone()

        if destination is None:
            return {"error": "Destination not found"}

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
            {"destination_id": destination.id},
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
            {"destination_id": destination.id},
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