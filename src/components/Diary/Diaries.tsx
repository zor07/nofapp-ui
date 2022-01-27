import React from 'react';
import {DiaryIdAndTitleType} from "../../redux/diaries-reducer";
import {NavLink} from "react-router-dom";

type DiariesPropsType = {
    diaries: Array<DiaryIdAndTitleType>
}

const Diaries: React.FC<DiariesPropsType> = ({diaries}) => {

    const elements = diaries.map(diary => <li key={diary.id}><NavLink to={`/diary/${diary.id}`}>{diary.title}</NavLink></li>);

    return (
        <div>
            <ul>
                {elements}
            </ul>
        </div>
    )
}

export default Diaries