import React, {useCallback, useEffect} from "react";
import "remirror/styles/all.css";

import {
    BoldExtension,
    HeadingExtension,
    ItalicExtension,
    UnderlineExtension,
    TaskListItemExtension,
    BulletListExtension,
    NodeFormattingExtension,
    OrderedListExtension,
    DocExtension,
    wysiwygPreset
} from "remirror/extensions";
import {EditorComponent, Remirror, useHelpers, useKeymap, useRemirror} from "@remirror/react";
import Toolbar from "./Toolbar/Toolbar";
import {htmlToProsemirrorNode, RemirrorContentType, RemirrorJSON} from "remirror";

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
    saveContent: (content: RemirrorJSON) => void
}

const Editor: React.FC<EditorPropsType> = ({content, saveContent}) => {
    const {manager, state, setState} = useRemirror({
        extensions: () => [new BoldExtension({}),
            new DocExtension({content: 'heading block+'}),
            new ItalicExtension(),
            new UnderlineExtension(),
            new HeadingExtension({}),
            new NodeFormattingExtension({}),
            new BulletListExtension({}),
            new OrderedListExtension(),
            new TaskListItemExtension(),
            ...wysiwygPreset()],
        content: {
            type: "doc",
            content: []
        },
        selection: "start",
        stringHandler: htmlToProsemirrorNode
    });

    useEffect(() => {
        // make api request and get initial data then set content
        manager.view.updateState(manager.createState({content: content}));
    }, [content]);

    return (
        <div className="remirror-theme">
            {/* the className is used to define css variables necessary for the editor */}
            <Remirror
                manager={manager}
                initialContent={state}
                hooks={hooks}
                onChange={(parameter) => {
                    // Update the state to the latest value.
                    setState(parameter.state);
                }}>

                <Toolbar state={state} saveContent={saveContent}/>
                <div className="remirror-editor remirror-a11y-dark">
                    <EditorComponent/>
                </div>
            </Remirror>
        </div>
    );
}

export default Editor
