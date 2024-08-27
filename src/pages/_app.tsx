import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="flex w-full justify-between">
        <h2>WATER PARK</h2>
        <ul className="flex gap-2">
          <li>Clientes</li>
          <li>Hospedagens</li>
        </ul>
      </nav>
      <div className="bg-white w-full min-h-screen flex flex-col items-center">
        <Component {...pageProps} />
      </div>
    </>
  );
}
