import Link from "next/link";

type State = {
  id: string;
  name: string;
  code: string;
  slug: string;
};

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CountryPage({
  params,
}: CountryPageProps) {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch states");
  }

  const states: State[] = await response.json();

  const countryName =
    slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="site-shell">
      <nav className="navbar">
        <a href="/" className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </a>

        <div className="nav-links">
          <a href="/">Explore</a>
          <a href="/#about">About</a>
        </div>
      </nav>

      <section className="country-page">
        <div className="country-page-header">
          <span className="section-label">COUNTRY</span>

          <h1>{countryName}</h1>

          <p>
            Explore states, cities and destinations across {countryName}.
          </p>
        </div>

        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>States &amp; regions</h2>
          </div>
        </div>

        <div className="country-grid">
          {states.map((state) => (
            <Link
            href={`/countries/${slug}/states/${state.slug}`}
            className="country-card"
            key={state.id}
            >
              <div className="country-card-top">
                <div className="country-symbol">📍</div>

                <span className="country-code">
                  {state.code}
                </span>
              </div>

              <div className="country-card-content">
                <h3>{state.name}</h3>

                <p>
                  Discover cities, places and experiences in{" "}
                  {state.name}.
                </p>

                <span className="card-link">
                  Explore state <span>↗</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer>
        <div className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </div>

        <span>Explore more. Plan better. Travel farther.</span>
      </footer>
    </main>
  );
}