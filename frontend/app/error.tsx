"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="site-shell">
      <nav className="navbar">
        <Link href="/" className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </Link>
      </nav>

      <section className="page-state">
        <span className="section-label">SOMETHING WENT WRONG</span>

        <h1>We couldn't load this page.</h1>

        <p>
          Something went wrong while loading the travel information.
          Please try again.
        </p>

        <div className="page-state-actions">
          <button
            type="button"
            className="primary-button"
            onClick={reset}
          >
            Try again
          </button>

          <Link href="/" className="secondary-button">
            Back to Explore
          </Link>
        </div>
      </section>
    </main>
  );
}