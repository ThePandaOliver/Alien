"use client";
import axios from "axios";
import {useSuspenseQuery} from "@tanstack/react-query";
import {MenuData} from "@/models/MenuModel";
import {Suspense} from "react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";

export default function Page() {
	return (
		<div>
			<Suspense fallback={<p>Loading...</p>}>
				<ErrorBoundary errorComponent={props => (<p>Something went wrong: {props.error.message}</p>)}>
					<MenuList/>
				</ErrorBoundary>
			</Suspense>
		</div>
	);
}

function MenuList() {
	const {data: menus} = useSuspenseQuery({
		queryKey: ["menu"],
		queryFn: async () => {
			const response = await axios.get("http://localhost:3000/api/menus");
			return response.data as MenuData[] | undefined;
		},
	});

	return (
		<>
			{
				menus?.map(menu => (<div key={menu.id}>{menu.name}</div>))
			}
		</>
	);
}
