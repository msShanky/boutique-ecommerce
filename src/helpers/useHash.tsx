import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useHash = (initialValue: any) => {
	const router = useRouter();
	const [hash, setHash] = useState(initialValue);

	const updateHash = (str: string) => {
		if (!str) return;
		setHash(str.split("#")[1]);
	};

	useEffect(() => {
		const onWindowHashChange = () => updateHash(window.location.hash);
		const onHashChangeStart = (url: string) => updateHash(url);

		router.events.on("hashChangeStart", onHashChangeStart);
		window.addEventListener("hashchange", onWindowHashChange);
		window.addEventListener("load", onWindowHashChange);
		return () => {
			router.events.off("hashChangeStart", onHashChangeStart);
			window.removeEventListener("load", onWindowHashChange);
			window.removeEventListener("hashchange", onWindowHashChange);
		};
	}, [router.events]);

	return hash;
};
