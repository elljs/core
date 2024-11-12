import { useReactive } from "ahooks";
import MenuBar from "./components/menu-bar";
import SideBar from "./components/side-bar";
import StatusBar from "./components/status-bar";
import Workbench from "./components/workbench";


export default function Workspace() {
    const state = useReactive<{ active: string }>({
        active: 'file'
    });

    return (
        <div className='h-screen w-screen flex flex-col box-border overflow-hidden'>
            <MenuBar />
            <main className="flex flex-1">
                <SideBar active={state.active} onActiveChange={active => state.active = active} />
                <Workbench />
            </main>
            <StatusBar />
        </div>
    );
}