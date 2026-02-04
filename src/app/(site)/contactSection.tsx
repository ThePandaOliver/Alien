"use client";

import Modal from "@/components/modal";
import {useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import axios from "axios";

export default function ContactSection() {
	const [contactOpen, setContactOpen] = useState(false);
	const [isMessageSent, setIsMessageSent] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const isValid = useMemo(() => name.length > 0 && email.length > 0 && message.length > 0, [name, email, message]);

	async function sendMessage() {
		await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/contact`,
			{"name": name, "email": email, "message": message}
			);

		setIsMessageSent(true);
		setTimeout(() => {
			setContactOpen(false);
			setName("");
			setEmail("");
			setMessage("");
			setIsMessageSent(false)
		}, 2000);
	}

	return (
		<footer className={"mt-2"}>
			<button
				className={"ml-auto block bg-[#bf532a] cursor-pointer text-contact-size py-1 pl-3 pr-6 rounded-tl-xl"}
				onClick={() => setContactOpen(true)}>Contact
			</button>

			<div className={"z-20"}>
				<Modal open={contactOpen} onRequestClose={() => setContactOpen(false)} closeableOnMobile={true}>
					<form
						className={"flex flex-col gap-4 p-10 h-full w-full overflow-scroll bg-black/50"}
						onSubmit={e => e.preventDefault()}
					>
						<input className={"border-2 border-white rounded-md p-2"} placeholder={"Name"} required
							   onChange={e => setName(e.target.value)} value={name}/>
						<input className={"border-2 border-white rounded-md p-2"} placeholder={"Email"} required
							   onChange={e => setEmail(e.target.value)} value={email}/>
						<textarea className={"border-2 border-white rounded-md p-2 mt-6"} placeholder={"Message"} required
								  onChange={e => setMessage(e.target.value)} value={message}/>
						<div className={"grid grid-cols-[1fr_auto]"}>
							<div>
								<AnimatePresence>
									{isMessageSent && (
										<motion.p className={"font-bold text-lg"}
												  transition={{duration: 1}}
												  initial={{opacity: 0}}
												  animate={{opacity: 1}}
										>
											Message sent, Check your email.
										</motion.p>
									)}
								</AnimatePresence>
							</div>
							<button
								type="submit"
								className={`bg-[#bf532c] cursor-pointer px-4 py-1 rounded-full transition 
								hover:bg-white hover:text-black 
								disabled:bg-[#bf532c] disabled:text-white disabled:opacity-20 disabled:cursor-auto`}
								disabled={!isValid && !isMessageSent}
								onClick={sendMessage}
							>
								Send Message
							</button>
						</div>
					</form>
				</Modal>
			</div>
		</footer>
	);
}