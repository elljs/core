import { AppearanceForm } from "./appearance-form";
import ContentSection from "../components/content-section";

export default function SettingAppearance() {
	return (
		<ContentSection
			title="Appearance"
			desc="Customize the appearance of the app. Automatically switch between day
          and night themes."
		>
			<AppearanceForm />
		</ContentSection>
	);
}
