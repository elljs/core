import ProfileForm from "./profile-form";
import ContentSection from "../components/content-section";

export default function SettingProfile() {
	return (
		<ContentSection
			title="Profile"
			desc="This is how others will see you on the site."
		>
			<ProfileForm />
		</ContentSection>
	);
}
