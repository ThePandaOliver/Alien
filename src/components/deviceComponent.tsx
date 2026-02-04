"use client";
import {ReactNode} from "react";
import {useMediaQuery} from "@/hooks/useMediaQueryHook";

export interface DeviceProps {
	children: ReactNode;
	desktop?: ReactNode;
	mobile?: ReactNode;
}

export default function DeviceComponent({
											children,
											desktop = children,
											mobile = children
										}: DeviceProps) {
	const isDesktop = useMediaQuery("(min-width: 640px)");
	return isDesktop ? desktop : mobile;
}