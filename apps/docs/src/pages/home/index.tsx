import { Checkbox } from "@/components/ui/checkbox";

const Home = () => {
	return <div className="h-[2000px]">Home
		<Checkbox isDisabled >
			isDisabled
		</Checkbox>
		<Checkbox >
			Text
		</Checkbox>
		<Checkbox>
			Custom
		</Checkbox>
	</div>;
};

export default Home;
