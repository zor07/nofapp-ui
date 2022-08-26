import React, {useEffect} from "react"
import {ProfileType} from "../../../redux/profile-reducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {AppStateType} from "../../../redux/redux-store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {getProfiles} from "../../../redux/profile-list-reducer";
import ProfileList from "./ProfileList";

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

    return <ProfileList profiles={profiles}/>
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