import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {MenuData} from "@/models/MenuModel";
import {wait} from "next/dist/lib/wait";
import {supabase} from "@/app/api/supabase";

export async function GET(request: NextRequest, {params}: {params: Promise<{ id: string }>}) {
	const {id} = await params;
	const {data, error} = await supabase.from("Menus").select(`
		id,
		name,
		img,
		description:Menus_Descriptions (
		  paragraph,
		  content:Menus_Description_Contents (
			sort_order,
			headline,
			text
		  )
		)
	`)
		.order("id")
		.order("sort_order", {referencedTable: "Menus_Descriptions.Menus_Description_Contents"})
		.eq("id", id)
		.single();
	if (error) return new Response(error.message, {status: 500});
	return Response.json(data);
}