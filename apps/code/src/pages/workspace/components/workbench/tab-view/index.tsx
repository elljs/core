import {
    DockviewApi,
    DockviewReact,
    DockviewReadyEvent,
    IDockviewPanelProps,
} from '@/components/custom/dockview';
import React from 'react';
import CodePanel from '../code-panel';
import EditorView from '../editor-view';

const Default = (props: IDockviewPanelProps) => {
    return (
        <div style={{ height: '100%' }}>
            <div>{props.api.title}</div>
        </div>
    );
};

const components = {
    default: Default,
    CodePanel
};

export default function TabView() {
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

        event.api.addPanel({
            id: 'code-1',
            component: 'CodePanel',
        });
    };

    return (
        <DockviewReact
            className='dockview-theme-abyss'
            onReady={onReady}
            components={components}
            disableFloatingGroups
        />
    );
};
