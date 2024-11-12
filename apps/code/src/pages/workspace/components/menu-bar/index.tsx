import { Logo } from "@/components/custom/logo";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";

export default function StatusBar() {
    return (
        <div className="h-8 w-screen flex items-center shadow bg-primary">
            <div className="flex justify-center items-center w-12">
                <Logo size="md" />
            </div>
            <Menubar className="h-auto p-0 bg-transparent border-none space-x-0 [&>a]:px-3 [&>a]:text-xs">
                <MenubarMenu>
                    <MenubarTrigger asChild>
                        <a className="focus:bg-white focus:bg-opacity-10 hover:bg-white hover:bg-opacity-10 data-[state=open]:bg-white data-[state=open]:bg-opacity-10">
                            文件
                        </a>
                    </MenubarTrigger>
                    <MenubarContent >
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu >
                    <MenubarTrigger asChild>
                        <a className="focus:bg-white focus:bg-opacity-10 hover:bg-white hover:bg-opacity-10 data-[state=open]:bg-white data-[state=open]:bg-opacity-10">
                            查看
                        </a>
                    </MenubarTrigger>
                    <MenubarContent >
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu >
                    <MenubarTrigger asChild>
                        <a className="focus:bg-white focus:bg-opacity-10 hover:bg-white hover:bg-opacity-10 data-[state=open]:bg-white data-[state=open]:bg-opacity-10">
                            帮助
                        </a>
                    </MenubarTrigger>
                    <MenubarContent >
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    );
}