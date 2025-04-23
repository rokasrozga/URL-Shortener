"use client";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("links")
    .select("url")
    .eq("slug", slug)
    .single();

  console.log(slug);

  if (!data || error) {
    return <h1>404 Link not found</h1>;
  }

  redirect(data.url);
}
