import Link from "next/link";
import TravelPlanner from "../components/TravelPlanner";

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

export default async function TravelPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/routes`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch travel routes");
  }

  const routes: TravelRoute[] = await response.json();

  return (
    <main className="site-shell">
      <nav className="navbar">
        <Link href="/" className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </Link>

        <div className="nav-links">
          <Link href="/">Explore</Link>
          <Link href="/travel">Plan</Link>
          <Link href="/#about">About</Link>
        </div>
      </nav>

      <section className="country-page travel-page">
        <div className="country-page-header">
          <span className="section-label">
            TRAVEL PLANNER
          </span>

          <h1>Get there.</h1>

          <p>
            Compare travel options between cities with
            approximate distance, journey time and cost.
          </p>
        </div>

        <div className="section-heading">
          <div>
            <span className="section-label">
              TRAVEL ROUTES
            </span>

            <h2>How do I get there?</h2>
          </div>

          <p>
            Choose your starting point and destination to
            explore available travel information.
          </p>
        </div>

        <TravelPlanner routes={routes} />
      </section>

      <footer>
        <Link href="/" className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </Link>

        <span>
          Explore more. Plan better. Travel farther.
        </span>
      </footer>
    </main>
  );
}