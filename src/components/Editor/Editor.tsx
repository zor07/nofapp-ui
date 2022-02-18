import React, {useCallback, useEffect, useMemo, useState} from "react";
import "remirror/styles/all.css";

import {
    BoldExtension,
    BulletListExtension,
    DocExtension,
    FontSizeExtension,
    HeadingExtension,
    IframeExtension,
    ImageExtension,
    LinkExtension,
    NodeFormattingExtension,
    OrderedListExtension,
    TaskListItemExtension,
    UnderlineExtension,
    wysiwygPreset
} from "remirror/extensions";
import {EditorComponent, Remirror, useHelpers, useKeymap, useRemirror} from "@remirror/react";
import Toolbar from "./Toolbar/Toolbar";
import {htmlToProsemirrorNode, PrimitiveSelection, RemirrorContentType, RemirrorJSON} from "remirror";
import {useDebouncedCallback} from "use-debounce";
import {message} from "antd";
import MyItalicExtension from "./extensions/MyItalicExtension";


const hooks = [
    () => {
        const {getJSON} = useHelpers();
        const handleSaveShortcut = useCallback(
            ({state}) => {
                console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

                return true; // Prevents any further key handlers from being run.
            },
            [getJSON]
        );
        // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
        useKeymap("Mod-s", handleSaveShortcut);
    }
];


type EditorPropsType = {
    content: RemirrorContentType,
    selection: PrimitiveSelection | null | undefined
    saveContent: (content: RemirrorJSON, selection: PrimitiveSelection, title: string) => void
}

const Editor: React.FC<EditorPropsType> = ({content, selection,  saveContent}) => {

    const linkExtension = useMemo(() => {
        const extension = new LinkExtension({autoLink: true, defaultTarget: '_blank'});
        extension.addHandler('onClick', (_, data) => {
            window.open(data.href,'_blank');
            return true;
        });
        return extension;
    }, []);

    const {manager, state, setState} = useRemirror({
        extensions: () => [new BoldExtension({}),
            new DocExtension({content: 'heading block+'}),
            linkExtension,
            new MyItalicExtension(),
            new UnderlineExtension(),
            new HeadingExtension({}),
            new FontSizeExtension({}),
            new NodeFormattingExtension({}),
            new BulletListExtension({}),
            new OrderedListExtension(),
            new TaskListItemExtension(),
            new IframeExtension({ enableResizing: true }),
            new ImageExtension({ enableResizing: true }),
            ...wysiwygPreset()],
        content: {
            type: "doc",
            content: []
        },
        // selection: "start",
        stringHandler: htmlToProsemirrorNode
    });

    useEffect(() => {
        // make api request and get initial data then set content
        manager.view.updateState(
            manager.createState({
                content: content,
                selection: selection
            })
        );
        manager.view.focus();
    }, [content]);

    const [shouldAutoSave, setShouldAutoSave] = useState(false)
    const [shouldSaveImmediately, setShouldSaveImmediately] = useState(false)

    const debounced = useDebouncedCallback(
        (document, selection, title) => {
            saveContent(document, selection, title)
            message.info('Saved')
        },
        // delay in ms
        10000
    );

    useEffect(() => {
        if (shouldSaveImmediately) {
            const currSelection: PrimitiveSelection = {
                anchor: state.selection.anchor,
                head: state.selection.head
            }
            const titleNode = state.doc.nodeAt(1)
            if (titleNode && titleNode.text) {
                const title = titleNode.text
                saveContent(state.doc as unknown as RemirrorJSON, currSelection, title)
                setShouldSaveImmediately(false)
                message.info('Saved')
            } else {
                message.warn('Please add title', 1)
                setShouldSaveImmediately(false)
            }
        }
    }, [shouldSaveImmediately]);

    useEffect(() => {
        if (shouldAutoSave) {
            const currSelection: PrimitiveSelection = {
                anchor: state.selection.anchor,
                head: state.selection.head
            }
            const titleNode = state.doc.nodeAt(1)
            if (titleNode && titleNode.text) {
                const title = titleNode.text
                debounced(state.doc, currSelection, title);
            }
            setShouldAutoSave(false)
        }
    }, [shouldAutoSave]);

    const handleChange = useCallback(({ tr, state }) => {
        setState(state)
        if (tr?.docChanged) {
            setShouldAutoSave(true)
        }
    }, [debounced]);

    return (
        <div className="remirror-theme">
            {/* the className is used to define css variables necessary for the editor */}
            <Remirror
                manager={manager}
                initialContent={state}
                hooks={hooks}
                onChange={handleChange}>

                <Toolbar saveContent={() => setShouldSaveImmediately(true)}/>

                <div className="remirror-editor remirror-a11y-dark" >
                    <EditorComponent/>
                </div>
            </Remirror>
        </div>
    );
}

export default Editor
