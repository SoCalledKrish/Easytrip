from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


# =========================================================
# COUNTRIES
# =========================================================

def test_get_countries():
    response = client.get("/countries/")

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    if data:
        country = data[0]

        assert "id" in country
        assert "name" in country
        assert "code" in country
        assert "slug" in country


def test_get_invalid_country_states():
    response = client.get(
        "/countries/does-not-exist/states"
    )

    assert response.status_code == 404

    data = response.json()

    assert "detail" in data


# =========================================================
# STATES
# =========================================================

def test_get_states():
    response = client.get(
        "/countries/india/states"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    if data:
        state = data[0]

        assert "id" in state
        assert "name" in state
        assert "code" in state
        assert "slug" in state


def test_get_invalid_state_cities():
    response = client.get(
        "/countries/india/states/does-not-exist/cities"
    )

    assert response.status_code == 404

    data = response.json()

    assert "detail" in data


# =========================================================
# CITIES
# =========================================================

def test_get_cities():
    response = client.get(
        "/countries/india/states/karnataka/cities"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    if data:
        city = data[0]

        assert "id" in city
        assert "name" in city
        assert "slug" in city
        assert "latitude" in city
        assert "longitude" in city


def test_get_invalid_city_destinations():
    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/does-not-exist/"
        "destinations"
    )

    assert response.status_code == 404

    data = response.json()

    assert "detail" in data


# =========================================================
# DESTINATIONS
# =========================================================

def test_get_destinations():
    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/bangalore/"
        "destinations"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    if data:
        destination = data[0]

        assert "id" in destination
        assert "name" in destination
        assert "slug" in destination
        assert "short_description" in destination
        assert "full_description" in destination


def test_get_destination_detail():
    destinations_response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/bangalore/"
        "destinations"
    )

    assert destinations_response.status_code == 200

    destinations = destinations_response.json()

    assert len(destinations) > 0

    destination_slug = destinations[0]["slug"]

    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        f"cities/bangalore/destinations/{destination_slug}"
    )

    assert response.status_code == 200

    data = response.json()

    assert "destination" in data
    assert "images" in data
    assert "operating_hours" in data

    assert data["destination"]["slug"] == destination_slug


def test_get_invalid_destination():
    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/bangalore/"
        "destinations/does-not-exist"
    )

    assert response.status_code == 404

    data = response.json()

    assert "detail" in data


# =========================================================
# EXPERIENCES
# =========================================================

def test_get_experiences():
    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/bangalore/"
        "experiences"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    if data:
        experience = data[0]

        assert "id" in experience
        assert "title" in experience
        assert "slug" in experience
        assert "description" in experience
        assert "images" in experience

        assert isinstance(
            experience["images"],
            list,
        )


# =========================================================
# STAY AREAS
# =========================================================

def test_get_stay_areas():
    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/bangalore/"
        "stay-areas"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    if data:
        stay_area = data[0]

        assert "id" in stay_area
        assert "name" in stay_area
        assert "slug" in stay_area
        assert "budget_type" in stay_area
        assert "near_transport" in stay_area
        assert "family_friendly" in stay_area


# =========================================================
# COST ESTIMATES
# =========================================================

def test_get_cost_estimates():
    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/bangalore/"
        "cost-estimates"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    assert len(data) > 0

    for estimate in data:
        assert "id" in estimate
        assert "budget_type" in estimate
        assert "stay_cost" in estimate
        assert "food_cost" in estimate
        assert "transport_cost" in estimate
        assert "activity_cost" in estimate
        assert "miscellaneous_cost" in estimate
        assert "daily_total" in estimate

        calculated_total = sum(
            value or 0
            for value in [
                estimate["stay_cost"],
                estimate["food_cost"],
                estimate["transport_cost"],
                estimate["activity_cost"],
                estimate["miscellaneous_cost"],
            ]
        )

        assert estimate["daily_total"] == calculated_total


def test_get_invalid_city_cost_estimates():
    response = client.get(
        "/countries/india/"
        "states/karnataka/"
        "cities/does-not-exist/"
        "cost-estimates"
    )

    assert response.status_code == 404


# =========================================================
# TRAVEL ROUTES
# =========================================================

def test_get_all_travel_routes():
    response = client.get(
        "/countries/routes"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    if data:
        route = data[0]

        assert "id" in route
        assert "source_city" in route
        assert "source_city_slug" in route
        assert "destination_city" in route
        assert "destination_city_slug" in route
        assert "travel_mode" in route
        assert "distance_km" in route
        assert "travel_time_minutes" in route
        assert "cost_min" in route
        assert "cost_max" in route


def test_get_bangalore_mysore_route():
    response = client.get(
        "/countries/routes/bangalore/mysore"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)

    assert len(data) > 0

    route = data[0]

    assert route["source_city_slug"] == "bangalore"
    assert route["destination_city_slug"] == "mysore"

    assert route["distance_km"] is not None
    assert route["travel_time_minutes"] is not None


def test_get_invalid_source_city_route():
    response = client.get(
        "/countries/routes/"
        "does-not-exist/mysore"
    )

    assert response.status_code == 404

    data = response.json()

    assert "detail" in data


def test_get_invalid_destination_city_route():
    response = client.get(
        "/countries/routes/"
        "bangalore/does-not-exist"
    )

    assert response.status_code == 404

    data = response.json()

    assert "detail" in data


# =========================================================
# API ROOT
# =========================================================

def test_api_root():
    response = client.get("/")

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "EasyTrip API Running"