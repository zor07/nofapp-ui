import React from "react";
import {ProfileType} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Profile from "./Profile";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileType
}

type MapDispatchPropsType = {
}

type ProfileContainerType = MapStatePropsType & MapDispatchPropsType

const ProfileContainer: React.FC<ProfileContainerType> = ({profile}) => {
    return (
        <Profile profile={profile}/>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profile.profile
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {})
)(ProfileContainer);