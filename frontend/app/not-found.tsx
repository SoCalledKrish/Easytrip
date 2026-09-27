import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell">
      <nav className="navbar">
        <Link href="/" className="brand">
          <div className="brand-mark">A</div>
          <span>EasyTrip</span>
        </Link>
      </nav>

      <section className="page-state">
        <span className="section-label">404</span>

        <h1>That place doesn't exist here.</h1>

        <p>
          We couldn't find the destination or travel page you
          were looking for.
        </p>

        <Link href="/" className="primary-button">
          Back to Explore
        </Link>
      </section>
    </main>
  );
}