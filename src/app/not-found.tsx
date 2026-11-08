import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="container">
        <span className="not-found-code">404</span>
        <h1>This page is not available.</h1>
        <p>The address may be incorrect, or the page may have moved. Return to the homepage to continue.</p>
        <Link href="/" className="button button--primary"><ArrowLeft size={16} /> Back to Home</Link>
      </div>
    </section>
  );
}
