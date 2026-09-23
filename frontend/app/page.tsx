"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Country = {
  id: string;
  name: string;
  code: string;
  slug: string;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/countries/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data: Country[] = await response.json();
        setCountries(data);
      } catch {
        setError("Unable to load countries. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return (
    <main className="site-shell">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </div>

        <div className="nav-links">
          <a href="#explore">Explore</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <span className="eyebrow">TRAVEL INFORMATION, SIMPLIFIED</span>

          <h1>
            Go somewhere
            <br />
            <span>worth remembering.</span>
          </h1>

          <p>
            Discover places, experiences, travel routes and useful information
            to plan your next journey with confidence.
          </p>

          <div className="hero-actions">
            <a href="#explore" className="primary-button">
              Start exploring
              <span>→</span>
            </a>

            <span className="hero-note">Built for curious travelers</span>
          </div>
        </div>
      </section>

      <section id="explore" className="explore-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>Where do you want to go?</h2>
          </div>

          <p>
            Start with a country and discover cities, destinations and
            experiences worth exploring.
          </p>
        </div>

        {loading && (
          <div className="status-card">
            <div className="loader" />
            <span>Discovering destinations...</span>
          </div>
        )}

        {error && <div className="status-card error">{error}</div>}

        {!loading && !error && (
          <div className="country-grid">
            {countries.map((country) => (
              <Link
                href={`/countries/${country.slug}`}
                className="country-card"
                key={country.id}
             >
                <div className="country-card-top">
                  <div className="country-symbol">
                    {country.code === "IN" ? "🇮🇳" : "🌍"}
                  </div>

                  <span className="country-code">{country.code}</span>
                </div>

                <div className="country-card-content">
                  <h3>{country.name}</h3>

                  <p>
                    Explore cities, destinations and travel experiences.
                  </p>

                  <span className="card-link">
                    Explore country <span>↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section id="about" className="about-section">
        <div className="glass-panel">
          <span className="section-label">ABOUT EASYTRIP</span>

          <h2>Travel information without the noise.</h2>

          <p>
            EasyTrip is being built to bring the information travelers
            actually need into one simple place — from places to visit and
            travel distances to experiences, stay areas and approximate trip
            costs.
          </p>
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