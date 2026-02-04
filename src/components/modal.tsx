import {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import DeviceComponent from "@/components/deviceComponent";

export type ModalHandle = {
	close: () => void;
};

interface ModalProps {
	children: ReactNode;
	open: boolean;
	onRequestClose?: () => void;
	closeableOnMobile?: boolean;
}

export default function Modal(
	{
		children,
		open,
		onRequestClose,
		closeableOnMobile = false
	}: ModalProps
) {
	return (
		<DeviceComponent mobile={(<MobileModal/>)}>
			<AnimatePresence>
				{open && (
					<motion.div
						className={"fixed top-0 left-0 w-full h-full p-10 flex pointer-events-none"}
						transition={{duration: 3}}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
					>
						<div
							className="bg-black/70 border-10 border-white/70 rounded-md relative m-auto w-full max-w-300 aspect-video overflow-scroll pointer-events-auto">
							<button
								onClick={onRequestClose}
								className="block absolute top-0 right-0 z-10 w-10 aspect-square cursor-pointer font-bold"
							>
								✕
							</button>

							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</DeviceComponent>

	);

	function MobileModal() {
		return (
			<AnimatePresence>
				{(open || !closeableOnMobile) && (
					<motion.div
						className={"absolute top-0 left-0 w-full h-full flex bg-black"}
						transition={{duration: 3}}
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
					>
						{closeableOnMobile && (
							<button
								onClick={onRequestClose}
								className="block absolute top-0 right-0 z-10 w-10 aspect-square cursor-pointer font-bold"
							>
								✕
							</button>
						)}
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		);
	}
}