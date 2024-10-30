import { Page } from "@/components/custom/page";
// import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { Content } from "@tiptap/core";
import { useReactive } from "ahooks";

export default function Editor() {
    const state = useReactive<{ content: Content }>({
        content: ''
    });

    return (
        <Page className="flex flex-col pb-4" header="文本编辑器">
            {/* <MinimalTiptapEditor
                className="w-full rounded bg-card"
                editorContentClassName="p-5"
                editorClassName="focus:outline-none"
                value={state.content}
                onChange={content => state.content = content}
                output="html"
                placeholder="请输入..."
                autofocus
                editable
            /> */}
        </Page>
    );
}