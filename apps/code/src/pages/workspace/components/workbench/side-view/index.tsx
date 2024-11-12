import {
    DockviewReact,
    DockviewReadyEvent,
    IDockviewPanelProps,
} from '@/components/custom/dockview';
import PaneView from '../pane-view';

const Default = (props: IDockviewPanelProps) => {
    return (
        <div style={{ height: '100%' }}>
            <div>{props.api.title}</div>
        </div>
    );
};

const components = {
    Default,
    PaneView
};

export default function SideView() {
    const onReady = (event: DockviewReadyEvent) => {
        const panelView = event.api.addPanel({
            id: 'pane-view',
            component: 'PaneView',
        });
        panelView.group.header.hidden = true;
    };

    return (
        <DockviewReact
            className='dockview-theme-abyss'
            onReady={onReady}
            components={components}
            disableFloatingGroups
            disableDnd
        />
    );
};
