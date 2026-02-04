"use client"
import {ReactNode, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Modal from "@/components/modal";

export default function ClientLayout({children}: Readonly<{ children: ReactNode }>) {
	const [modalOpen, setModalOpen] = useState(true);
	const pathname = usePathname()
	// eslint-disable-next-line react-hooks/set-state-in-effect
	useEffect(() => setModalOpen(true), [pathname])

	return (
		<>
			<Modal open={modalOpen} onRequestClose={() => setModalOpen(false)}>
				{children}
			</Modal>
		</>
	);
}
