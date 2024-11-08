import ProfileForm from "./profile-form";
import ContentSection from "../components/content-section";

export default function SettingProfile() {
	return (
		<ContentSection
			title="账户"
			desc="修改您的账户资料"
		>
			<ProfileForm />
		</ContentSection>
	);
}
