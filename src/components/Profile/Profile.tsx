import React from "react"
import {ProfileType} from "../../redux/profile-reducer";
import {RemirrorJSON} from "remirror";
import EditorReadView from "../Editor/EditorReadView";

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

const Profile: React.FC<MapStatePropsType> = ({profile, posts}) => {

    const postElements = posts.map((post, index) => <EditorReadView key={index} data={post} displayTitle={true}/>);

    return (
        <div>
            <div>Profile</div>
            <div>{profile.id}</div>
            <div>{profile.userId}</div>
            <div>{profile.avatarUri}</div>
            <div>{profile.timerStart.toString()}</div>
            <div>{postElements}</div>

        </div>
    )
}

export default Profile