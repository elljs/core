import { ChatInput } from "@/components/custom/chat/chat-input";
import { Page } from "@/components/custom/page";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
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
import { MDXProvider } from "@mdx-js/react";
import { useMount, useReactive } from "ahooks";
import { LanguageModelV1, streamText } from 'ai';
import {
    Check,
    ChevronsUpDown,
    CornerDownLeft,
    Mic,
    Paperclip
} from "lucide-react";
import { createOllama } from 'ollama-ai-provider';
import { useRef } from "react";
import Markdown from 'react-markdown';

const models = [
    {
        value: "llama3.2",
        label: "llama3.2",
    },
];

export default function Bot() {
    const state = useReactive<{
        model: LanguageModelV1 | null;
        modelId: string;
        modelOpen: boolean;
        messages: any[];
        content: string;
    }>({
        model: null,
        modelId: "llama3.2",
        modelOpen: false,
        messages: [],
        content: ''
    });

    const contentRef = useRef<HTMLDivElement>(null);

    useMount(async () => {
        const ollama = createOllama({
            baseURL: 'http://127.0.0.1:11434/api',
        });
        state.model = ollama('llama3.2');
    });

    return (
        <Page className="flex flex-col h-layout pb-4" header="聊天机器人">
            <Card className="flex flex-1 flex-col overflow-hidden">
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
                                {state.modelId
                                    ? models.find((model) => model.value === state.modelId)?.label
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
                                                    state.modelId = value;
                                                    state.modelOpen = false;
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        state.modelId === model.value
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
                    <span className="relative flex size-2 ml-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full size-2 bg-green-500" />
                    </span>
                    <p className="text-sm text-muted-foreground">已连接</p>
                </CardHeader>
                <CardContent className="flex flex-1 justify-center">
                    {/* <ChatMessageList>
                        {messages.map((message) => {
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
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </ChatBubbleMessage>
                                </ChatBubble>
                            );
                        })}
                    </ChatMessageList> */}
                    <MDXProvider>
                        <article ref={contentRef} className="prose dark:prose-invert min-w-prose min-h-[800px] max-h-[800px] overflow-y-auto no-scrollbar">
                            <Markdown>
                                {state.content}
                            </Markdown>
                        </article>
                    </MDXProvider>
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

                            <Button size="sm" className="ml-auto gap-1.5" onClick={async () => {
                                const reuslt = await streamText({
                                    model: state.model!,
                                    messages: [
                                        {
                                            role: 'user',
                                            content: '请用 Markdown 格式帮我写一段 React 编写 Headless DataTable 的组件代码'
                                        }
                                    ]
                                });

                                state.content = '';
                                for await (const delta of reuslt.textStream) {
                                    state.content += delta;
                                    if (contentRef.current) {
                                        contentRef.current.scrollTop = contentRef.current.scrollHeight;
                                    }
                                }
                            }}>
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
