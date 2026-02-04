"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Suspense} from "react";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import {useSuspenseQuery} from "@tanstack/react-query";
import axios from "axios";
import {MenuData} from "@/models/MenuModel";

export default function Header() {
	return (
		<header>
			<nav className="p-4">
				<Suspense fallback={<p>Loading...</p>}>
					<ErrorBoundary errorComponent={props => (<p>Something went wrong: {props.error.message}</p>)}>
						<NavList/>
					</ErrorBoundary>
				</Suspense>
			</nav>
		</header>
	);
}

function NavList() {
	const path = usePathname();
	const {data: menus} = useSuspenseQuery({
		queryKey: ["nav menus"],
		queryFn: async () => {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menus`);
			return response.data as MenuData[] | undefined;
		},
	});

	return (
		<ul className={"flex gap-4 flex-wrap"}>
			{
				menus?.map(menu => (
					<li key={menu.id}><NavButton href={menu.name} label={menu.name} active={path == `/${menu.name}`}/></li>
				))
			}
		</ul>
	);
}

interface NavButtonProps {
	href: string,
	active: boolean,
	label: string
}

function NavButton({href, active, label}: NavButtonProps) {
	return (
		<Link href={href} className={`text-menu-size font-bold inline-block 
		px-4 py-2 rounded-xl transition-colors ${active ? "bg-[#BF532C]" : "hover:bg-white hover:text-black"}`}>{label}</Link>
	);
}