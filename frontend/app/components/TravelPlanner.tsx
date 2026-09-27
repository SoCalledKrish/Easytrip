"use client";

import { useMemo, useState } from "react";

type TravelRoute = {
  id: string;
  source_city: string;
  source_city_slug: string;
  destination_city: string;
  destination_city_slug: string;
  travel_mode: string;
  distance_km: number;
  travel_time_minutes: number;
  cost_min: number | null;
  cost_max: number | null;
};

type TravelPlannerProps = {
  routes: TravelRoute[];
};

export default function TravelPlanner({
  routes,
}: TravelPlannerProps) {
  const cityOptions = useMemo(() => {
    const cities = new Map<string, string>();

    routes.forEach((route) => {
      cities.set(route.source_city_slug, route.source_city);
      cities.set(
        route.destination_city_slug,
        route.destination_city
      );
    });

    return Array.from(cities.entries()).sort((a, b) =>
      a[1].localeCompare(b[1])
    );
  }, [routes]);

  const [sourceCity, setSourceCity] = useState(
    routes[0]?.source_city_slug ?? ""
  );

  const [destinationCity, setDestinationCity] = useState(
    routes[0]?.destination_city_slug ?? ""
  );

  const matchingRoutes = useMemo(() => {
    return routes.filter(
      (route) =>
        route.source_city_slug === sourceCity &&
        route.destination_city_slug === destinationCity
    );
  }, [routes, sourceCity, destinationCity]);

  const swapCities = () => {
    setSourceCity(destinationCity);
    setDestinationCity(sourceCity);
  };

  const formatTravelTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} min`;
    }

    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remainingMinutes} min`;
  };

  if (routes.length === 0) {
    return (
      <div className="glass-panel travel-empty">
        <span className="section-label">TRAVEL ROUTES</span>

        <h2>Route information coming soon</h2>

        <p>
          We're continuing to add travel information between
          cities.
        </p>
      </div>
    );
  }

  return (
    <div className="travel-planner">
      <div className="glass-panel travel-planner-controls">
        <div className="travel-select-group">
          <label htmlFor="source-city">FROM</label>

          <select
            id="source-city"
            value={sourceCity}
            onChange={(event) =>
              setSourceCity(event.target.value)
            }
          >
            {cityOptions.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="travel-swap-button"
          onClick={swapCities}
          aria-label="Swap departure and destination cities"
        >
          ⇄
        </button>

        <div className="travel-select-group">
          <label htmlFor="destination-city">TO</label>

          <select
            id="destination-city"
            value={destinationCity}
            onChange={(event) =>
              setDestinationCity(event.target.value)
            }
          >
            {cityOptions.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {matchingRoutes.length > 0 ? (
        <div className="travel-route-grid">
          {matchingRoutes.map((route) => (
            <article
              className="glass-panel travel-route-card"
              key={route.id}
            >
              <div className="travel-route-top">
                <span className="section-label">
                  {route.travel_mode.toUpperCase()}
                </span>

                <span className="travel-route-distance">
                  {route.distance_km} KM
                </span>
              </div>

              <div className="travel-route-main">
                <div>
                  <span className="travel-route-city">
                    {route.source_city}
                  </span>

                  <span className="travel-route-arrow">
                    →
                  </span>

                  <span className="travel-route-city">
                    {route.destination_city}
                  </span>
                </div>

                <strong>
                  {formatTravelTime(
                    route.travel_time_minutes
                  )}
                </strong>
              </div>

              <div className="travel-route-meta">
                <div>
                  <span>Distance</span>
                  <strong>
                    {route.distance_km} km
                  </strong>
                </div>

                <div>
                  <span>Travel time</span>
                  <strong>
                    {formatTravelTime(
                      route.travel_time_minutes
                    )}
                  </strong>
                </div>

                <div>
                  <span>Estimated cost</span>
                  <strong>
                    {route.cost_min !== null &&
                    route.cost_max !== null
                      ? `₹${route.cost_min.toLocaleString(
                          "en-IN"
                        )} – ₹${route.cost_max.toLocaleString(
                          "en-IN"
                        )}`
                      : "Information unavailable"}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="glass-panel travel-empty">
          <span className="section-label">
            NO ROUTE AVAILABLE
          </span>

          <h3>
            We don't have route information for this journey
            yet.
          </h3>

          <p>
            Try another city combination.
          </p>
        </div>
      )}
    </div>
  );
}