import { redirect } from "next/navigation";

// Register page now redirects to login since we use passwordless auth
export default function RegisterPage() {
  redirect("/login");
}
