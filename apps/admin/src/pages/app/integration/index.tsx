import { Page } from "@/components/custom/page";
import { Card } from "@/components/ui/card";
import AuthingProvider from "./authing";
import OllamaProvider from "./ollama";

export default function Integrate() {
    return (
        <Page header="第三方应用">
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1 p-2">
                    <div className="text-muted-foreground text-sm mb-2">身份认证</div>
                    <div className="grid gap-4 sm:grid-cols-4 lg:grid-cols-8">
                        <Card><AuthingProvider /></Card>
                    </div>
                </div>
                <div className="flex flex-col space-y-1 p-2">
                    <div className="text-muted-foreground text-sm mb-2">大语言模型</div>
                    <div className="grid gap-4 sm:grid-cols-4 lg:grid-cols-8">
                        <Card><OllamaProvider /></Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}