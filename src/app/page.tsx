import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/blog-generator"}>Generate</Link>
    </div>
  );
}
