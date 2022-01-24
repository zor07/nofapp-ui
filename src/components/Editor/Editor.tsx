import React, {useCallback, useEffect} from "react";
import "remirror/styles/all.css";

import {
    BoldExtension,
    HeadingExtension,
    ItalicExtension,
    UnderlineExtension,
    TaskListItemExtension,
    BulletListExtension,
    OrderedListExtension,
    DocExtension,
    wysiwygPreset
} from "remirror/extensions";
import {EditorComponent, Remirror, useHelpers, useKeymap, useRemirror} from "@remirror/react";
import Toolbar from "./Toolbar/Toolbar";

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

const initialContent = {
    type: "doc",
    content: [
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": "24.01.2022"
                }
            ]
        }
    ]
};

const Editor = () => {
    const {manager, state, setState} = useRemirror({
        extensions: () => [new BoldExtension({}),
            new DocExtension({content: 'heading block+'}),
            new ItalicExtension(),
            new UnderlineExtension(),
            new HeadingExtension({}),
            new BulletListExtension({}),
            new OrderedListExtension(),
            new TaskListItemExtension(),
            ...wysiwygPreset()],
        content: {
            type: "doc",
            content: []
        },
        selection: "start",
        stringHandler: "html"
    });

    useEffect(() => {
        // make api request and get initial data then set content
        manager.view.updateState(manager.createState({content: initialContent}));
    }, [manager]);

    return (
        <div>
            <h2>Start editing to see some magic happen!</h2>
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

                    <Toolbar state={state}/>
                    <div className="remirror-editor remirror-a11y-dark">
                        <EditorComponent/>
                    </div>
                </Remirror>
            </div>
        </div>
    );
}

export default Editor
