import React from "react";
import {ProfileType} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import Profile from "./Profile";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {RemirrorJSON} from "remirror";

type MapStatePropsType = {
    profile: ProfileType
    posts: Array<RemirrorJSON>
}

type MapDispatchPropsType = {
}

type ProfileContainerType = MapStatePropsType & MapDispatchPropsType

const ProfileContainer: React.FC<ProfileContainerType> = ({profile, posts}) => {
    return (
        <Profile profile={profile} posts={posts}/>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profile.profile,
        posts: state.profile.posts
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {})
)(ProfileContainer);