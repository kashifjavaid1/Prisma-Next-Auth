import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center gap-3 mt-3">
        <Link href="/register">register</Link>
        <Link href="/login">login</Link>
      </div>
    </>
  );
}
