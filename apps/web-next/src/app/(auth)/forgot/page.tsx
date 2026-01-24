import { redirect } from "next/navigation";

// Forgot password page now redirects to login since we use passwordless auth
export default function ForgotPage() {
  redirect("/login");
}
