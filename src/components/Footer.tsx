import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-10 py-6 text-center text-sm gap-2 flex flex-col justify-center items-center">
      <h1 className="flex flex-row justify-center items-center text-2xl font-bold gap-2">
        <Image
          src="/img/rust.svg"
          alt="Rust Developer JP"
          width={40}
          height={40}
        />
        Rust Developer JP
      </h1>
      <p>当団体はrust-jp.rsとは異なる組織です。</p>
      <span id="copyright">
        &copy; {new Date().getFullYear()} Rust Developer Japan. All rights reserved.
      </span>
    </footer>
  );
}
