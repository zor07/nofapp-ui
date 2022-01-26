import React from 'react';
import Editor from "../Editor/Editor";
import {DiaryType} from "../../redux/diary-reducer";
import {RemirrorContentType, RemirrorJSON} from "remirror";

type DiaryPropsType = {
    diary: DiaryType
    saveDiary: (diary: DiaryType) => void
}

const Diary: React.FC<DiaryPropsType> = ({diary, saveDiary}) => {

    const saveContent = (content: RemirrorJSON) => {
        const newDiary = {
            id: diary.id,
            title: content.content[0].content[0].text,
            data: content
        }

        saveDiary(newDiary)
    }

    return (
        <div>
            <Editor content={diary.data}
                    saveContent={saveContent} />
        </div>
    );
}


export default Diary
