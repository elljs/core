import {
    DockviewApi,
    DockviewReact,
    DockviewReadyEvent,
    IDockviewPanelProps,
} from '@/components/custom/dockview';
import React from 'react';
import TabView from '../tab-view';

const Default = (props: IDockviewPanelProps) => {
    return (
        <div style={{ height: '100%' }}>
            <div>{props.api.title}</div>
        </div>
    );
};

const components = {
    default: Default,
    TabView
};

export default function MainView() {
    const [api, setApi] = React.useState<DockviewApi>();

    React.useEffect(() => {
        if (!api) {
            return;
        }

        const disposables = [
            api.onWillShowOverlay((e: { kind: string; preventDefault: () => void; }) => {
                if (e.kind === 'header_space' || e.kind === 'tab') {
                    return;
                }
                e.preventDefault();
            }),
        ];

        return () => {
            disposables.forEach((disposable) => {
                disposable.dispose();
            });
        };
    }, [api]);

    const onReady = (event: DockviewReadyEvent) => {
        setApi(event.api);

        const tabView = event.api.addPanel({
            id: 'tab-view',
            component: 'TabView',
        });
        tabView.group.header.hidden = true;

        const consoleView = event.api.addPanel({
            id: 'console-view',
            component: 'default',
            minimumHeight: 0,
            position: {
                direction: 'below'
            }
        });
        consoleView.group.header.hidden = true;

        consoleView.group.api.setSize({ height: 0 })
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
