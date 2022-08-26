import React, {useEffect} from "react"
import {ProfileType} from "../../../redux/profile-reducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {AppStateType} from "../../../redux/redux-store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {getProfiles} from "../../../redux/profile-list-reducer";
import {List} from "antd";
import VirtualList from 'rc-virtual-list';
import Avatar from "antd/es/avatar/avatar";
import {NavLink} from "react-router-dom";
import {TimerType} from "../../../redux/timer-reducer";
import Timer from "../../Timer/Timer";


type MapStatePropsType = {
    profiles: Array<ProfileType>
}

type MapDispatchPropsType = {
    getProfiles: () => void
}

type ProfileListContainerPropsType = MapStatePropsType & MapDispatchPropsType

const ProfileListContainer: React.FC<ProfileListContainerPropsType> = ({profiles}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfiles())
    }, [])

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
            <List>
                <VirtualList
                    data={profiles}
                    itemHeight={600}
                    itemKey="id"
                >
                    {(profile) => (
                        <List.Item key={profile.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={profile.avatarUri}/>
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profiles: state.profileList.profiles
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        getProfiles
    })
)(ProfileListContainer);