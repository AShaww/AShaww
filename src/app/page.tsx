import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";

export default function Home() {
  return (
    <main>
      <section>
        <h1>Hello world</h1>
        <Link href="/users">Users</Link>
        <ProductCard />
      </section>
    </main>
  )
}
