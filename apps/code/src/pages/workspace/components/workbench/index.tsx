import {
    SplitviewReact,
    SplitviewReadyEvent
} from '@/components/custom/dockview';
import MainView from './main-view';
import SideView from './side-view';

import "./index.css";


export default function Workbench() {

    const onReady = (event: SplitviewReadyEvent) => {
        event.api.addPanel({
            id: 'side-view',
            component: 'SideView',
            size: 300,
            minimumSize: 100,
            maximumSize: 400,
            snap: true,
        });

        event.api.addPanel({
            id: 'main-view',
            component: 'MainView',
        });
    };

    return (
        <SplitviewReact
            className={'dockview-theme-abyss'}
            components={{
                SideView,
                MainView
            }}
            onReady={onReady}
            hideBorders
        />
    );
}