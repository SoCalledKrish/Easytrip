import Link from "next/link";

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

type DestinationImage = {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
};

type OperatingHour = {
  id: string;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};

type DestinationResponse = {
  destination: Destination;
  images: DestinationImage[];
  operating_hours: OperatingHour[];
};

type DestinationPageProps = {
  params: Promise<{
    slug: string;
    stateSlug: string;
    citySlug: string;
    destinationSlug: string;
  }>;
};

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const {
    slug,
    stateSlug,
    citySlug,
    destinationSlug,
  } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states/${stateSlug}/cities/${citySlug}/destinations/${destinationSlug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch destination");
  }

  const data: DestinationResponse = await response.json();

  const {
    destination,
    images,
    operating_hours,
  } = data;

  const countryName =
    slug.charAt(0).toUpperCase() + slug.slice(1);

  const stateName =
    stateSlug.charAt(0).toUpperCase() + stateSlug.slice(1);

  const cityName =
    citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

  const heroImage = images[0];

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

        {/* Breadcrumb / location */}
        <div className="destination-detail-header">
          <div className="destination-breadcrumbs">
            <Link href="/">Explore</Link>
            <span>→</span>
            <span>{countryName}</span>
            <span>→</span>
            <span>{stateName}</span>
            <span>→</span>
            <Link
                href={`/countries/${slug}/states/${stateSlug}/cities/${citySlug}`}
            >
                {cityName}
            </Link>
            </div>

          <h1>{destination.name}</h1>

          <p>
            {destination.short_description ??
              "Discover this destination with EasyTrip."}
          </p>
        </div>

        {/* Hero image */}
        {heroImage && (
          <div className="destination-hero-image">
            <img
              src={heroImage.image_url}
              alt={
                heroImage.caption ??
                destination.name
              }
            />

            {heroImage.caption && (
              <span>{heroImage.caption}</span>
            )}
          </div>
        )}

        {/* Main information */}
        <div className="destination-detail-grid">

          <div className="glass-panel destination-description">
            <span className="section-label">
              ABOUT THIS PLACE
            </span>

            <h2>About {destination.name}</h2>

            <p>
              {destination.full_description ??
                destination.short_description ??
                "Detailed information about this destination will be added soon."}
            </p>
          </div>

          <div className="destination-facts">

            <div className="glass-panel">
              <span className="section-label">
                ENTRY FEE
              </span>

              <h3>
                {destination.entry_fee_min === 0 &&
                destination.entry_fee_max === 0
                  ? "Free"
                  : destination.entry_fee_min !== null &&
                      destination.entry_fee_max !== null
                    ? `₹${destination.entry_fee_min} – ₹${destination.entry_fee_max}`
                    : "Information coming soon"}
              </h3>
            </div>

            <div className="glass-panel">
              <span className="section-label">
                SUGGESTED DURATION
              </span>

              <h3>
                {destination.visit_duration_minutes
                  ? destination.visit_duration_minutes >= 60
                    ? `${Math.round(
                        destination.visit_duration_minutes / 60
                      )} hours`
                    : `${destination.visit_duration_minutes} minutes`
                  : "Information coming soon"}
              </h3>
            </div>

            <div className="glass-panel">
              <span className="section-label">
                LOCATION
              </span>

              <h3>
                {destination.latitude !== null &&
                destination.longitude !== null
                  ? `${destination.latitude.toFixed(
                      4
                    )}, ${destination.longitude.toFixed(4)}`
                  : "Information coming soon"}
              </h3>
            </div>

          </div>
        </div>

        {/* Opening hours */}
        <div className="destination-hours-section">
          <div className="section-heading">
            <div>
              <span className="section-label">
                VISITOR INFORMATION
              </span>

              <h2>Opening hours</h2>
            </div>

            <p>
              Check the usual operating hours before planning
              your visit.
            </p>
          </div>

          {operating_hours.length > 0 ? (
            <div className="hours-grid">
              {operating_hours.map((hours) => (
                <div
                  className="glass-panel hours-row"
                  key={hours.id}
                >
                  <span>
                    {dayNames[hours.day_of_week]}
                  </span>

                  <strong>
                    {hours.is_closed
                      ? "Closed"
                      : hours.open_time &&
                          hours.close_time
                        ? `${hours.open_time.slice(
                            0,
                            5
                          )} – ${hours.close_time.slice(
                            0,
                            5
                          )}`
                        : "Hours unavailable"}
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel destination-empty">
              <h3>Opening hours coming soon</h3>

              <p>
                We don't have verified operating hours for
                this destination yet.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="destination-actions">

          {destination.google_maps_url && (
            <a
              href={destination.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              Open in Google Maps ↗
            </a>
          )}

          <Link
            href={`/countries/${slug}/states/${stateSlug}/cities/${citySlug}`}
            className="secondary-button"
          >
            ← Back to {cityName}
          </Link>

        </div>

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