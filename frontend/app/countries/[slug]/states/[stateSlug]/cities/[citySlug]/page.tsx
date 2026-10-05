import Link from "next/link";
import { notFound } from "next/navigation";
import TripCostCalculator from "../../../../../../components/TripCostCalculator";

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

type ExperienceImage = {
  id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
};

type Experience = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  duration_minutes: number | null;
  price_min: number | null;
  price_max: number | null;
  images: ExperienceImage[];
};

type StayArea = {
  id: string;
  name: string;
  slug: string;
  budget_type: string;
  description: string | null;
  near_transport: boolean;
  family_friendly: boolean;
};

type CostEstimate = {
  id: string;
  budget_type: string;
  stay_cost: number | null;
  food_cost: number | null;
  transport_cost: number | null;
  activity_cost: number | null;
  miscellaneous_cost: number | null;
  daily_total: number;
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
    notFound();
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

  const experienceResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states/${stateSlug}/cities/${citySlug}/experiences`,
    {
      cache: "no-store",
    }
  );

  if (!experienceResponse.ok) {
    throw new Error("Failed to fetch experiences");
  }

  const experiences: Experience[] =
    await experienceResponse.json();

  const stayAreaResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states/${stateSlug}/cities/${citySlug}/stay-areas`,
    {
        cache: "no-store",
    }
    );

    if (!stayAreaResponse.ok) {
    throw new Error("Failed to fetch stay areas");
    }

    const stayAreas: StayArea[] =
    await stayAreaResponse.json();

    const costEstimateResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/${slug}/states/${stateSlug}/cities/${citySlug}/cost-estimates`,
    {
        cache: "no-store",
    }
    );

    if (!costEstimateResponse.ok) {
    throw new Error("Failed to fetch cost estimates");
    }

    const costEstimates: CostEstimate[] =
    await costEstimateResponse.json();

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
        <Link href="/travel">Plan</Link>
        <Link href="/#about">About</Link>
        </div>
      </nav>

      <section className="country-page">
        {/* CITY HEADER */}
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

        {/* CITY OVERVIEW */}
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

        {/* DESTINATIONS */}
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
                <span className="section-label">
                  DESTINATION
                </span>

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
                    <span>Map ↗</span>
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

        {/* EXPERIENCES */}
        <div className="section-heading city-next-section">
          <div>
            <span className="section-label">EXPERIENCE</span>

            <h2>Things to experience</h2>
          </div>

          <p>
            Go beyond sightseeing with experiences worth adding
            to your {city.name} trip.
          </p>
        </div>

        <div className="experience-grid">
        {experiences.map((experience) => {
            const primaryImage = experience.images[0];

            return (
            <article
                className="glass-panel experience-card"
                key={experience.id}
            >
                {primaryImage && (
                <div className="experience-image-wrapper">
                    <img
                    src={primaryImage.image_url}
                    alt={
                        primaryImage.caption ??
                        experience.title
                    }
                    className="experience-image"
                    />
                </div>
                )}

                <div className="experience-card-body">
                <div className="experience-card-top">
                    <span className="section-label">
                    EXPERIENCE
                    </span>

                    {experience.duration_minutes && (
                    <span className="destination-duration">
                        {experience.duration_minutes >= 60
                        ? `${Math.round(
                            experience.duration_minutes / 60
                            )} HR`
                        : `${experience.duration_minutes} MIN`}
                    </span>
                    )}
                </div>

                <div className="experience-card-content">
                    <h3>{experience.title}</h3>

                    <p>
                    {experience.description ??
                        "Discover this experience with EasyTrip."}
                    </p>

                    <div className="experience-meta">
                    <span>
                        {experience.price_min !== null &&
                        experience.price_max !== null
                        ? `₹${experience.price_min} – ₹${experience.price_max}`
                        : "Price information unavailable"}
                    </span>
                    </div>
                </div>
                </div>
            </article>
            );
        })}
        </div>


        {experiences.length === 0 && (
          <div className="glass-panel destination-empty">
            <h3>More experiences coming soon</h3>

            <p>
              We're continuing to add experiences and activities
              for {city.name}.
            </p>
          </div>
        )}
      </section>

      <div className="section-heading city-next-section">
        <div>
            <span className="section-label">STAY</span>

            <h2>Where to stay</h2>
        </div>

        <p>
            Explore areas that can work well as a base for your{" "}
            {city.name} trip.
        </p>
        </div>

        <div className="stay-area-grid">
        {stayAreas.map((area) => (
            <article
            className="glass-panel stay-area-card"
            key={area.id}
            >
            <div className="stay-area-top">
                <span className="section-label">
                {area.budget_type.toUpperCase()}
                </span>

                {area.near_transport && (
                <span className="stay-area-badge">
                    Transport
                </span>
                )}
            </div>

            <div className="stay-area-content">
                <h3>{area.name}</h3>

                <p>
                {area.description ??
                    `Explore accommodation options around ${area.name}.`}
                </p>

                <div className="stay-area-meta">
                {area.near_transport && (
                    <span>Good transport access</span>
                )}

                {area.family_friendly && (
                    <span>Family friendly</span>
                )}
                </div>
            </div>
            </article>
        ))}
        </div>

        {stayAreas.length === 0 && (
        <div className="glass-panel destination-empty">
            <h3>Stay information coming soon</h3>

            <p>
            We're continuing to add useful stay-area information
            for {city.name}.
            </p>
        </div>
        )}

        {/* COST ESTIMATES */}

        <div className="section-heading city-next-section">
        <div>
            <span className="section-label">TRIP COST</span>

            <h2>What might it cost?</h2>
        </div>

        <p>
        Get a rough idea of what a day in {city.name} could cost
        across different travel styles. These are approximate estimates,
        not live prices.
        </p>
        </div>

        <div className="cost-estimate-grid">
        {costEstimates.map((estimate) => (
            <article
            className="glass-panel cost-estimate-card"
            key={estimate.id}
            >
            <div className="cost-estimate-top">
                <span className="section-label">
                {estimate.budget_type.toUpperCase()}
                </span>

                <span className="cost-estimate-period">
                PER DAY
                </span>
            </div>

            <div className="cost-estimate-total">
                <span>₹</span>
                {estimate.daily_total.toLocaleString("en-IN")}
            </div>

            <div className="cost-estimate-breakdown">
                <div>
                <span>Stay</span>
                <strong>
                    {estimate.stay_cost !== null
                    ? `₹${estimate.stay_cost.toLocaleString("en-IN")}`
                    : "—"}
                </strong>
                </div>

                <div>
                <span>Food</span>
                <strong>
                    {estimate.food_cost !== null
                    ? `₹${estimate.food_cost.toLocaleString("en-IN")}`
                    : "—"}
                </strong>
                </div>

                <div>
                <span>Transport</span>
                <strong>
                    {estimate.transport_cost !== null
                    ? `₹${estimate.transport_cost.toLocaleString("en-IN")}`
                    : "—"}
                </strong>
                </div>

                <div>
                <span>Activities</span>
                <strong>
                    {estimate.activity_cost !== null
                    ? `₹${estimate.activity_cost.toLocaleString("en-IN")}`
                    : "—"}
                </strong>
                </div>

                <div>
                <span>Miscellaneous</span>
                <strong>
                    {estimate.miscellaneous_cost !== null
                    ? `₹${estimate.miscellaneous_cost.toLocaleString("en-IN")}`
                    : "—"}
                </strong>
                </div>
            </div>
            </article>
        ))}
        </div>

        {costEstimates.length === 0 && (
        <div className="glass-panel destination-empty">
            <h3>Cost information coming soon</h3>

            <p>
            We're continuing to add estimated travel costs for{" "}
            {city.name}.
            </p>
        </div>
        )}

        <TripCostCalculator
        estimates={costEstimates}
        cityName={city.name}
        />

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

