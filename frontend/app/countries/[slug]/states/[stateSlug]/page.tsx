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

type StatePageProps = {
  params: Promise<{
    slug: string;
    stateSlug: string;
  }>;
};

export default async function StatePage({
  params,
}: StatePageProps) {
  const { slug, stateSlug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states/${stateSlug}/cities`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }

  const cities: City[] = await response.json();

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
            {countryName.toUpperCase()} · STATE
          </span>

          <h1>{stateName}</h1>

          <p>
            Explore cities, destinations and experiences across{" "}
            {stateName}.
          </p>
        </div>

        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>Cities</h2>
          </div>

          <p>
            Choose a city to discover places to visit, experiences,
            stay areas and travel information.
          </p>
        </div>

        <div className="country-grid">
          {cities.map((city) => (
            <Link
              href={`/countries/${slug}/states/${stateSlug}/cities/${city.slug}`}
              className="country-card"
              key={city.id}
            >
              <div className="country-card-top">
                <div className="country-symbol">📍</div>

                <span className="country-code">
                  {city.ideal_trip_days
                    ? `${city.ideal_trip_days} DAYS`
                    : ""}
                </span>
              </div>

              <div className="country-card-content">
                <h3>{city.name}</h3>

                <p>
                  {city.description ??
                    `Discover ${city.name} and its travel experiences.`}
                </p>

                <span className="card-link">
                  Explore city <span>↗</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
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