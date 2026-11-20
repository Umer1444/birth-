import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{20,32}$/.test(id)) {
    return Response.json({ error: "This letter link does not look right." }, { status: 404 });
  }

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return Response.json(
      { error: "The letter service is not configured yet. Please try again later." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await supabase
    .from("birthday_letters")
    .select("payload")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return Response.json(
      { error: "We couldn’t find this letter. Check the link and try once more." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json(data.payload, { headers: { "Cache-Control": "no-store" } });
}
