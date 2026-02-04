"use client";
import Modal from "@/components/modal";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import DeviceComponent from "@/components/deviceComponent";

export default function Page() {
	const [playing, setPlaying] = useState(true);

	return (
		<DeviceComponent mobile={(<MobilePage/>)}>
			<Modal open={playing} onRequestClose={() => setPlaying(false)}>
				<div className={"overflow-clip h-full w-full"}>
					<video src="/intro.mp4" autoPlay muted onEnded={() => setPlaying(false)} className={"opacity-70"}/>
				</div>
			</Modal>
			<AnimatePresence>
				{
					!playing && (
						<motion.div className={"absolute top-0 left-0 w-full h-full text-6xl font-bold pl-80 flex flex-col justify-center"}
									transition={{duration: 3, delay: 2}}
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									exit={{opacity: 0}}
						>
							<h1>Modal closed.</h1>
							<h1 className={"pl-16"}>The alien stays ...</h1>
						</motion.div>
					)
				}
			</AnimatePresence>
		</DeviceComponent>
	);

	function MobilePage() {
		// Empty on mobile
		return (
			<></>
		)
	}
}
