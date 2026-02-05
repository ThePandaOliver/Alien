"use client";
import {Fragment, Suspense, use, useEffect} from "react";
import Image from "next/image";
import {useSuspenseQuery} from "@tanstack/react-query";
import axios from "axios";
import {MenuData} from "@/models/MenuModel";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import DeviceComponent from "@/components/deviceComponent";

interface PageProps {
	params: Promise<{ menu_name: string }>;
}

export default function Page({params}: PageProps) {
	const {menu_name} = use(params);
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ErrorBoundary errorComponent={props => (<p>Something went wrong: {props.error.message}</p>)}>
				<MenuComponent key={menu_name} menuName={menu_name}/>
			</ErrorBoundary>
		</Suspense>
	);
}

function MenuComponent({menuName}: { menuName: string }) {
	const {data: menu} = useSuspenseQuery({
		queryKey: ["menu", menuName],
		queryFn: async () => {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus/name/${menuName}`);
			return response.data as MenuData;
		},
	});

	return (
		<DeviceComponent mobile={(<MobileMenuContent/>)}>
			<div className={"grid grid-cols-2 gap-4 h-full"}>
				<div className={"relative h-full"}>
					<Image src={`/${menu.img}`} alt={menu.name} fill={true} className={"w-full h-full object-cover"}/>
				</div>
				<MenuContent/>
			</div>
		</DeviceComponent>
	);

	function MenuContent() {
		return (
			<div className={"overflow-scroll h-full"}>
				<h1 className={"text-content-headline-size text-[#bc532d] font-bold"}>{menu.description.paragraph}</h1>
				{
					menu.description.content.map((section, index) => (
						<Fragment key={index}>
							{section.headline && <h2 className={"text-content-headline-sub-size text-[#f0da57] font-bold pt-2"}>{section.headline}</h2>}
							<p dangerouslySetInnerHTML={{__html: section.text}}></p>
						</Fragment>
					))
				}
			</div>
		)
	}

	function MobileMenuContent() {
		return (
			<div className={"px-6 overflow-scroll"}>
				<MenuContent/>
			</div>
		)
	}
}
