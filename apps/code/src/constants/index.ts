const isDev = process.env.NODE_ENV === "development";

export default {
	isDev,
	name: "Ell Code",
	description: "自然语言IDE",
	localStorageKeyPrefix: "ell-code",
};
