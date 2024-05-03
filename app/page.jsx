import Image from "next/image";
import { Button } from '@nextui-org/button';

export default function Home() {
  return (
    <div className="flex gap-6 items-ceneter justify-center">
      <p>Home page</p>
      <Button>Click me</Button>
    </div>
  );
}
