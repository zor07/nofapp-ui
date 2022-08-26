import React from "react"
import {ProfileType} from "../../../redux/profile-reducer";
import {List} from "antd";
import VirtualList from 'rc-virtual-list';
import Avatar from "antd/es/avatar/avatar";
import {NavLink} from "react-router-dom";
import {TimerType} from "../../../redux/timer-reducer";
import Timer from "../../Timer/Timer";


type MapStatePropsType = {
    profiles: Array<ProfileType>
}

type ProfileListPropsType = MapStatePropsType

const ProfileList: React.FC<ProfileListPropsType> = ({profiles}) => {

    const getTimer = (profile: ProfileType): TimerType => {
        return {
            id: "",
            isRunning: true,
            start: profile.timerStart,
            description: "main"
        }
    }

    return (
        <div>
            <List itemLayout="vertical"
                  size="small">
                <VirtualList
                    data={profiles}
                    itemHeight={6000}
                    itemKey="id"
                >
                    {(profile) => (
                        <List.Item key={profile.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar size={90} src={profile.avatarUri}/>
                                }
                                title={
                                    <NavLink to={`/profile/${profile.id}`}>
                                        {profile.user.name}
                                    </NavLink>
                                }
                                description={
                                    <Timer timer={getTimer(profile)}/>
                                }
                            />
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </div>
    )
}

export default ProfileList