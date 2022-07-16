import React from "react"
import {ProfileType} from "../../redux/profile-reducer";

type MapStatePropsType = {
    profile: ProfileType
}

const Profile: React.FC<MapStatePropsType> = ({profile}) => {
    return (
        <div>
            <div>Profile</div>
            <div>{profile.id}</div>
            <div>{profile.userId}</div>
            <div>{profile.avatarUri}</div>
            <div>{profile.timerStart.toString()}</div>
        </div>
    )
}

export default Profile