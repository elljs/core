import { SystemForm } from "./system-form";
import ContentSection from "../components/content-section";

export default function SettingPlatform() {
	return (
		<ContentSection title="系统" desc="配置您的系统参数">
			<SystemForm />
		</ContentSection>
	);
}
