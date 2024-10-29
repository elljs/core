import { defer } from "react-router-dom";
import { proxy } from "valtio";

const state = proxy<{ user: any }>({
	user: {
		name: "Roy Lin",
		email: "admin@elljs.com",
		avatar: "https://avatars.githubusercontent.com/u/19965768?v=4"
	},
});

const actions = {
	load: async () => {
		let user = state.user;
		return defer({ user });
	},

	login: async () => {
		window.location.href = '/';
	},
	logout: async () => {
		window.location.href = '/login';
	},
};

export default {
	state,
	...actions,
};
