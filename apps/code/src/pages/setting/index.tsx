import { Page } from "@/components/custom/page";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useReactive } from "ahooks";
import { MonitorCog, PaletteIcon, User2 } from "lucide-react";
import SettingAppearance from "./appearance";
import SettingProfile from "./profile";
import SettingSystem from "./system";
import { Can, useAbility } from "@/components/custom/ability-provider";

const items = [
	{
		name: "账户",
		icon: <User2 size={18} />,
		url: "/setting",
	},
	{
		name: "系统",
		icon: <MonitorCog size={18} />,
		url: "/setting/system",
	},
	{
		name: "外观",
		icon: <PaletteIcon size={18} />,
		url: "/setting/appearance",
	},
];

export default function Setting() {
	const { cannot } = useAbility();
	const state = useReactive({ active: "/setting" });
	return (
		<Page header="设置">
			<div className="flex flex-1 flex-col space-y-8 p-2 rounded-lg border md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0 bg-card">
				<aside className="top-0 lg:sticky lg:w-1/5">
					<SidebarGroup>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuButton
									key={item.url}
									className={
										state.active === item.url
											? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
											: ""
									}
									asChild
									tooltip={item.name}
								>
									<a
										className="cursor-pointer"
										onClick={() => {
											if (cannot("manage", item.url)) {
												return;
											}
											state.active = item.url;
										}}
									>
										{item.icon}
										<span>{item.name}</span>
									</a>
								</SidebarMenuButton>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</aside>
				<div className="flex w-full p-2 md:overflow-y-hidden overflow-x-hidden">
					{"/setting" === state.active && <SettingProfile />}
					<Can I="manage" a="/setting/system">
						{"/setting/system" === state.active && <SettingSystem />}
					</Can>
					{"/setting/appearance" === state.active && <SettingAppearance />}
				</div>
			</div>
		</Page>
	);
}
