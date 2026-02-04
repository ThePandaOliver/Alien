import {NextRequest} from "next/server";
import {supabase} from "@/app/api/supabase";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const {error} = await supabase.from("Messages").insert(body)
	return new Response(error?.message ?? "Success", {status: error ? 400 : 200});
}