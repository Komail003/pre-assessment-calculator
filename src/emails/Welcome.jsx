import { Button, Html,Tailwind } from "@react-email/components";
import * as React from "react";

export default function Welcome() {
  return (
    <Html>
      <Tailwind>
      <Button
        href="https://example.com"
        className="bg-purple-700 px-4 py-6 text-white font-bold text-lg rounded-lg"
      >
        Click me
      </Button>
      </Tailwind>
    </Html>
  );
}
