import React from "react"
import {ProfileType} from "../../redux/profile-reducer";
import {RemirrorJSON} from "remirror";

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

const Profile: React.FC<MapStatePropsType> = ({profile, posts}) => {
    return (
        <div>
            <div>Profile</div>
            <div>{profile.id}</div>
            <div>{profile.userId}</div>
            <div>{profile.avatarUri}</div>
            <div>{profile.timerStart.toString()}</div>
            <div>{`Got ${posts.length} posts`}</div>
        </div>
    )
}

export default Profile