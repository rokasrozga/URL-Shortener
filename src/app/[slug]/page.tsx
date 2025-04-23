import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

interface PageParmas {
  slug: string;
}
export default async function RedirectPage({
  params,
}: {
  params: Promise<PageParmas>;
}) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("links")
    .select("url")
    .eq("slug", slug)
    .single();

  if (!data || error) {
    return <h1>404 Link not found</h1>;
  }

  redirect(data.url);
}
