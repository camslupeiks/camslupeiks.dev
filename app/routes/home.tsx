import { Navbar } from "~/navbar/navbar";
import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "camslupeiks.dev" }];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Welcome />
    </>
  );
}
