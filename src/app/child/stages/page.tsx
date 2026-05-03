import { redirect } from "next/navigation"

// /child/stages → redirect to home which already shows all stages
export default function StagesIndexPage() {
  redirect("/")
}
