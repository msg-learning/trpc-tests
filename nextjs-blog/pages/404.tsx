import Link from "next/link";

export default function Page404() {
  return (
    <div>
      <h1>404 Page not found</h1>
      <h2>Pase go back...</h2>
      <Link href="/">Go home</Link>
    </div>
  );
}
