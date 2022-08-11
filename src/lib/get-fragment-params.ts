export const getFragmentParams = (asPath: string) => {
	const urlSearchParams = new URLSearchParams(asPath.split("#")[1]);
	const fragmentParams = Object.fromEntries(urlSearchParams.entries());
	return fragmentParams;
};
