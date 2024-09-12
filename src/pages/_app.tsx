import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="flex w-full justify-between items-center bg-blue-500 text-white py-4 px-8 shadow-md">
        <h2 className="text-2xl font-bold tracking-wide">WATER PARK</h2>
        <ul className="flex gap-4">
          <li className="hover:text-blue-300 cursor-pointer transition-colors duration-300">
            <Link href={"/cliente"}>Clientes</Link>
          </li>
          <li className="hover:text-blue-300 cursor-pointer transition-colors duration-300">
            <Link href={"/acomodacoes"}>Acomodações</Link>
          </li>
        </ul>
      </nav>
      <div className="bg-white w-full min-h-screen flex flex-col items-center p-8">
        <Component {...pageProps} />
      </div>
    </>
  );
}
