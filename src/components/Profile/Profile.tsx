import React from "react"
import {ProfileType} from "../../redux/profile-reducer";
import {RemirrorJSON} from "remirror";
import EditorReadView from "../Editor/EditorReadView";
import Timer from "../Timer/Timer";
import {TimerType} from "../../redux/timer-reducer";

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

const Profile: React.FC<MapStatePropsType> = ({profile, posts}) => {

    const postElements = posts.map((post, index) => <EditorReadView key={index} data={post} displayTitle={true}/>);

    const timer: TimerType = {
        id: "",
        isRunning: true,
        start: profile.timerStart,
        description: "main"
    }

    return (
        <div>
            <div>Profile</div>
            <div>{profile.id}</div>
            <div>{profile.user.name}</div>
            <div>{profile.user.username}</div>
            <div>{profile.avatarUri}</div>

            <div>
                <Timer timer={timer} />
            </div>

            <div>{postElements}</div>

        </div>
    )
}

export default Profile