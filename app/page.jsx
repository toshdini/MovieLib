import Image from "next/image";
import { Button } from '@nextui-org/button';

import { Hero } from "./components/hero";
import { Search } from "./components/search";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full h-screen">
      <Hero />
      <Search />
    </div>
  );
}
