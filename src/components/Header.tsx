import Image from "next/image";
import Link from "next/link";

const HeaderLinks = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "私たちについて" },
  { href: "/news", label: "お知らせ" },
  { href: "/contact", label: "お問い合わせ" },
];

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
          {HeaderLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
