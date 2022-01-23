import Undo from "./Buttons/Undo";
import Redo from "./Buttons/Redo";
import HeadingButtons from "./Buttons/HeadingButtons";
import Bold from "./Buttons/Bold";
import Italic from "./Buttons/Italic";
import Underline from "./Buttons/Underline";
import React from "react";
import SaveButton from "./Buttons/SaveButton";
import BulletList from "./Buttons/BulletList";
import OrderedList from "./Buttons/OrderedList";
import TaskList from "./Buttons/TaskList";


const Toolbar = ({state}) => {

    return (
        <div className="remirror-role remirror-toolbar">
            <div className="remirror-role remirror-group">
                <Undo/>
                <Redo/>
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <SaveButton state={state}/>
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <HeadingButtons />
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <Bold/>
                <Italic/>
                <Underline/>
            </div>
            <hr role="separator" aria-orientation="vertical" className="remirror-role remirror-separator"/>
            <div className="remirror-role remirror-group">
                <BulletList />
                <OrderedList />
                <TaskList />
            </div>

        </div>
    )
}
export default Toolbar