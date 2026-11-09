import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container notfound">
        <h1 className="display">This page does not exist.</h1>
        <p className="lede">The address may have been typed incorrectly, or the page may have moved.</p>
        <p>
          <Link href="/" className="btn btn--primary">
            Go to the home page
          </Link>
        </p>
      </div>
    </section>
  );
}
