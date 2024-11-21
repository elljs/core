import { Calculator, Calendar, CreditCard, SearchIcon, Settings, Smile, User } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"
import { useReactive } from "ahooks"
import { useEffect } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { CommandShortcut } from "@/components/ui/command";

export function Search() {
    const state = useReactive({ open: false });

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                state.open = !open;
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <SidebarInput
                        id="search"
                        placeholder="Search the docs..."
                        className="pl-8 cursor-pointer"
                        readOnly
                        onClick={() => state.open = true}
                    />
                    <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </SidebarGroupContent>
            </SidebarGroup>
            <CommandDialog open={state.open} onOpenChange={(e) => state.open = e}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <Calendar />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <Smile />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <Calculator />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <User />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
