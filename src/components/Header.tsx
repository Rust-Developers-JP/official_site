import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 flex flex-row justify-between items-center">
      <h1 className="flex flex-row justify-start items-center text-2xl font-bold gap-2 grow">
        <Image
          src="/img/rust.svg"
          alt="Rust Developer JP"
          width={50}
          height={50}
        />
        Rust Developer JP
      </h1>
      <nav>
        <ul className="flex flex-row gap-4">
          <li>
            <Link
              href="/"
              className="hover:underline"
            >
              ホーム
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:underline"
            >
              私たちについて
            </Link>
          </li>
          <li>
            <Link
              href="/news"
              className="hover:underline"
            >
              お知らせ
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:underline"
            >
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
