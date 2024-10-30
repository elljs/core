import { Page } from "@/components/custom/page";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	ChatBubble,
	ChatBubbleAction,
	ChatBubbleAvatar,
	ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useReactive } from "ahooks";
import {
	Check,
	ChevronsUpDown,
	Copy,
	CornerDownLeft,
	Mic,
	Paperclip,
	RefreshCcw,
} from "lucide-react";

const models = [
	{
		value: "llama3.2",
		label: "llama3.2",
	},
];

const messages = [
	{
		id: 1,
		message: "Hello, how has your day been? I hope you are doing well.",
		sender: "user",
	},
	{
		id: 2,
		message:
			"Hi, I am doing well, thank you for asking. How can I help you today?",
		sender: "bot",
	},
	{
		id: 3,
		message: "",
		sender: "bot",
		isLoading: true,
	},
];

const actionIcons = [
	{ icon: Copy, type: "Copy" },
	{ icon: RefreshCcw, type: "Regenerate" },
];

export default function AI() {
	const state = useReactive({
		model: "llama3.2",
		modelOpen: false,
	});

	return (
		<Page className="flex flex-col pb-4" header="聊天机器人">
			<Card className="flex flex-col flex-1 overflow-hidden">
				<CardHeader className="flex flex-row justify-center items-center space-x-2 space-y-0">
					<p className="text-sm text-muted-foreground">模型</p>
					<Popover
						open={state.modelOpen}
						onOpenChange={(e) => (state.modelOpen = e)}
					>
						<PopoverTrigger asChild>
							<Button
								className="w-[150px] mt-0 text-center rounded"
								variant="outline"
								size="sm"
								aria-expanded={state.modelOpen}
							>
								{state.model
									? models.find((model) => model.value === state.model)?.label
									: "选择模型..."}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput placeholder="搜索模型..." />
								<CommandList>
									<CommandEmpty>未找到相关模型</CommandEmpty>
									<CommandGroup>
										{models.map((model) => (
											<CommandItem
												key={model.value}
												value={model.value}
												onSelect={(value) => {
													state.model = value;
													state.modelOpen = false;
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														state.model === model.value
															? "opacity-100"
															: "opacity-0",
													)}
												/>
												{model.label}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</CardHeader>
				<CardContent className="flex-1">
					<ChatMessageList>
						{messages.map((message, index) => {
							const variant = message.sender === "user" ? "sent" : "received";
							return (
								<ChatBubble key={message.id} layout="ai">
									<ChatBubbleAvatar
										fallback={variant === "sent" ? "US" : "AI"}
									/>
									<ChatBubbleMessage>
										{message.message}

										{message.sender === "bot" && (
											<div>
												{actionIcons.map(({ icon: Icon, type }) => (
													<ChatBubbleAction
														className="size-6"
														key={type}
														icon={<Icon className="size-3" />}
														onClick={() =>
															console.log(
																"Action " +
																	type +
																	" clicked for message " +
																	index,
															)
														}
													/>
												))}
											</div>
										)}
									</ChatBubbleMessage>
								</ChatBubble>
							);
						})}
					</ChatMessageList>
				</CardContent>
				<CardFooter>
					<div className="w-full relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
						<ChatInput
							placeholder="请输入您的消息..."
							className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
						/>
						<div className="flex items-center p-3 pt-0">
							<Button variant="ghost" size="icon">
								<Paperclip className="size-4" />
								<span className="sr-only">Attach file</span>
							</Button>

							<Button variant="ghost" size="icon">
								<Mic className="size-4" />
								<span className="sr-only">Use Microphone</span>
							</Button>

							<Button size="sm" className="ml-auto gap-1.5">
								发送消息
								<CornerDownLeft className="size-3.5" />
							</Button>
						</div>
					</div>
				</CardFooter>
			</Card>
		</Page>
	);
}
