import { AppearanceForm } from "./appearance-form";
import ContentSection from "../components/content-section";

export default function SettingAppearance() {
	return (
		<ContentSection
			title="外观"
			desc="自定义您的应用外观"
		>
			<AppearanceForm />
		</ContentSection>
	);
}
