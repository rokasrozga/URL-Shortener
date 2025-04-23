import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return new Response(JSON.stringify({ message: "URL is required" }), {
      status: 400,
    });
  }

  const slug = `${Date.now().toString(36)}${Math.random()
    .toString(36)
    .substring(2, 6)}`;

  const { data, error } = await supabase.from("links").insert([{ slug, url }]);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ shortUrl: `${process.env.BASEURL}/${slug}`, data: data }),
    { status: 200 }
  );
}
