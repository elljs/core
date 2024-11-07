import { Can } from "@/components/custom/ability-provider";
import { Page } from "@/components/custom/page";
import { Button } from "@/components/ui/button";

export default function Customer() {
	return <Page header="客户管理">
		<div className="flex flex-col space-y-2 bg-card border rounded-lg p-2">
			<Can I="read" a="/block/customer">
				<Button>Read Customer</Button>
			</Can>
			<Can I="manage" a="/block/customer">
				<Button>Manage Customer</Button>
			</Can>
			<Can I="read" a="/component">
				<Button>Read Component</Button>
			</Can>
			<Can I="manage" a="/component" passThrough>
				{allowed => <Button disabled={!allowed}>Manage Component</Button>}
			</Can>
		</div>
	</Page>;
}
