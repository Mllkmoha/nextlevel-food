import Link from "next/link";

export default function notFound() {
  return (
    <main className="not-found">
      <div className="content">
        <h1>Page Not Found</h1>
        <p>Oops! The delicious recipe you are looking for has wandered off or doesn&apos;t exist.</p>
        <Link href="/" className="home-link">Return Home</Link>
      </div>
    </main>
  );
}
