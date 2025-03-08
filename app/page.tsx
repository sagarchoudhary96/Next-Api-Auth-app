import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ol type="1" className="list-inside list-disc marker:!mr-0">
        <li>
          <Button
            variant="link"
            asChild
            className="text-blue-800 text-base font-semibold"
          >
            <Link href="/users">Users</Link>
          </Button>
        </li>
        <li>
          <Button
            variant="link"
            asChild
            className="text-blue-800 text-base font-semibold"
          >
            <Link href="/products">Products</Link>
          </Button>
        </li>
      </ol>
    </>
  );
}
