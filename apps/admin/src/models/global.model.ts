import { AppAbility } from "@/components/custom/ability-provider";
import { RawRuleOf } from '@casl/ability';
import { defer } from "react-router-dom";
import { proxy } from "valtio";

interface UserInfo {
	nickname: string;
	email: string;
	avatar?: string;
}

const state = proxy<{ user: UserInfo, permissions: RawRuleOf<AppAbility>[] }>({
	user: {
		nickname: "Roy Lin",
		email: "admin@elljs.com",
		avatar: "https://avatars.githubusercontent.com/u/19965768?v=4",
	},
	permissions: [
		{ action: 'manage', subject: 'all' },
	]
});

const actions = {
	load: async () => {
		const user = state.user;
		return defer({ user });
	},
	login: async () => {
		window.location.href = "/";
	},
	logout: async () => {
		window.location.href = "/login";
	},
};

export default {
	state,
	...actions,
};
