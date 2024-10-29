import { LoginForm } from "@/components/custom/login-form";
import { Logo } from "@/components/custom/logo";
import constants from "@/constants";

export default function Login() {
	return <div className="flex flex-col justify-center items-center w-screen h-screen">
		<div className="flex justify-between items-center space-x-2 mb-4">
			<Logo size="xl" />
			<div className="flex flex-col flex-1 text-left leading-tight">
				<span className="truncate text-xl font-semibold">{constants.name}</span>
				<span className="truncate text-sm text-secondary-foreground">{constants.description}</span>
			</div>
		</div>
		<LoginForm />
	</div>;
};
