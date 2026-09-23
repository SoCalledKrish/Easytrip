import Link from "next/link";

type City = {
  id: string;
  name: string;
  slug: string;
  latitude: number | null;
  longitude: number | null;
  best_time_to_visit: string | null;
  ideal_trip_days: number | null;
  description: string | null;
};

type Destination = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  entry_fee_min: number | null;
  entry_fee_max: number | null;
  visit_duration_minutes: number | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
};

type CityPageProps = {
  params: Promise<{
    slug: string;
    stateSlug: string;
    citySlug: string;
  }>;
};

export default async function CityPage({
  params,
}: CityPageProps) {
  const { slug, stateSlug, citySlug } = await params;

  const cityResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states/${stateSlug}/cities`,
    {
      cache: "no-store",
    }
  );

  if (!cityResponse.ok) {
    throw new Error("Failed to fetch cities");
  }

  const cities: City[] = await cityResponse.json();

  const city = cities.find((item) => item.slug === citySlug);

  if (!city) {
    throw new Error("City not found");
  }

  const destinationResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states/${stateSlug}/cities/${citySlug}/destinations`,
    {
      cache: "no-store",
    }
  );

  if (!destinationResponse.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const destinations: Destination[] =
    await destinationResponse.json();

  const countryName =
    slug.charAt(0).toUpperCase() + slug.slice(1);

  const stateName =
    stateSlug.charAt(0).toUpperCase() + stateSlug.slice(1);

  return (
    <main className="site-shell">
      <nav className="navbar">
        <Link href="/" className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </Link>

        <div className="nav-links">
          <Link href="/">Explore</Link>
          <Link href="/#about">About</Link>
        </div>
      </nav>

      <section className="country-page">
        <div className="country-page-header">
          <span className="section-label">
            {countryName.toUpperCase()} · {stateName.toUpperCase()}
          </span>

          <h1>{city.name}</h1>

          <p>
            {city.description ??
              `Discover ${city.name}, its destinations, experiences and travel information.`}
          </p>
        </div>

        <div className="section-heading">
          <div>
            <span className="section-label">CITY OVERVIEW</span>
            <h2>Plan your visit</h2>
          </div>
        </div>

        <div className="city-overview-grid">
          <div className="glass-panel">
            <span className="section-label">BEST TIME</span>

            <h3>
              {city.best_time_to_visit ?? "Information coming soon"}
            </h3>

            <p>
              Find the most suitable time of year to explore{" "}
              {city.name}.
            </p>
          </div>

          <div className="glass-panel">
            <span className="section-label">IDEAL TRIP</span>

            <h3>
              {city.ideal_trip_days
                ? `${city.ideal_trip_days} days`
                : "Information coming soon"}
            </h3>

            <p>
              A suggested duration for experiencing{" "}
              {city.name}.
            </p>
          </div>

          <div className="glass-panel">
            <span className="section-label">LOCATION</span>

            <h3>
              {city.latitude !== null && city.longitude !== null
                ? `${city.latitude.toFixed(4)}, ${city.longitude.toFixed(4)}`
                : "Information coming soon"}
            </h3>

            <p>
              Geographic coordinates for the city.
            </p>
          </div>
        </div>

        <div className="section-heading city-next-section">
          <div>
            <span className="section-label">DISCOVER</span>
            <h2>Places to explore</h2>
          </div>

          <p>
            Explore notable destinations and places to visit in{" "}
            {city.name}.
          </p>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <Link
            href={`/countries/${slug}/states/${stateSlug}/cities/${citySlug}/destinations/${destination.slug}`}
            className="destination-card"
            key={destination.id}
            >
              <div className="destination-card-top">
                <span className="section-label">DESTINATION</span>

                {destination.visit_duration_minutes && (
                  <span className="destination-duration">
                    {destination.visit_duration_minutes >= 60
                      ? `${Math.round(
                          destination.visit_duration_minutes / 60
                        )} HR`
                      : `${destination.visit_duration_minutes} MIN`}
                  </span>
                )}
              </div>

              <div className="destination-card-content">
                <h3>{destination.name}</h3>

                <p>
                  {destination.short_description ??
                    "Discover this destination in EasyTrip."}
                </p>

                <div className="destination-meta">
                  <span>
                    {destination.entry_fee_min === 0 &&
                    destination.entry_fee_max === 0
                      ? "Free entry"
                      : destination.entry_fee_min !== null &&
                          destination.entry_fee_max !== null
                        ? `₹${destination.entry_fee_min} – ₹${destination.entry_fee_max}`
                        : "Fee information unavailable"}
                  </span>

                  {destination.google_maps_url && (
                    <a
                      href={destination.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Map ↗
                    </a>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {destinations.length === 0 && (
          <div className="glass-panel destination-empty">
            <h3>More places coming soon</h3>

            <p>
              We're continuing to add destinations and useful
              travel information for {city.name}.
            </p>
          </div>
        )}
      </section>

      <footer>
        <Link href="/" className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </Link>

        <span>Explore more. Plan better. Travel farther.</span>
      </footer>
    </main>
  );
}