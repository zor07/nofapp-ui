import React from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import css from './Diary.module.css'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";

const Diary = (props) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty()
    );

    const onEditorChange = (editorState) => {
        setEditorState(editorState)
    }

    return (
        <div>
            <div >
                <Editor editorClassName={css.editor}
                        editorState={editorState}
                        onEditorStateChange={onEditorChange}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {

    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {})
)(Diary);
