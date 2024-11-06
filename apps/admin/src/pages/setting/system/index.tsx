import { SystemForm } from "./system-form";
import ContentSection from "../components/content-section";

export default function SettingPlatform() {
	return (
		<ContentSection
			title="System"
			desc="Configure how you receive notifications."
		>
			<SystemForm />
		</ContentSection>
	);
}
