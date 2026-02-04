import {ReactNode} from "react";
import ClientLayout from "@/app/(site)/(menus)/clientLayout";

export default function layout({children}: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<ClientLayout>
				{children}
			</ClientLayout>
		</>
	);
}
