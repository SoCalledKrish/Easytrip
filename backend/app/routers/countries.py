from fastapi import APIRouter

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