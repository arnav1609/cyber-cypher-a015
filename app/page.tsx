// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // This will immediately redirect the user to /login
  redirect("/login");
}
