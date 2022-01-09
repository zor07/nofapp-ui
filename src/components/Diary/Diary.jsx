import React from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import css from './Diary.module.css'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";

const Diary = (props) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return (
        <div className={css.diaryRoot}>
            <div className={css.editor}>
                <Editor editorState={editorState}
                        placeholder="Enter some text..."
                        onChange={setEditorState}/>
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
