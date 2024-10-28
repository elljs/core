import { defer } from "react-router-dom";
import { proxy } from "valtio";

const state = proxy<{ user: any }>({
	user: {},
});

const actions = {
	load: async () => {
		let user = state.user;
		return defer({ user });
	},

	login: async () => {

	},
	logout: async () => {
		window.location.href = '/login';
	},
};

export default {
	state,
	...actions,
};
