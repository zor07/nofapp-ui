import React, {useEffect} from "react"
import {ProfileType} from "../../../redux/profile-reducer";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {AppStateType} from "../../../redux/redux-store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {getProfiles} from "../../../redux/profile-list-reducer";


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

    const profileElements = profiles.map(p => (
        <div>
            <div>{p.id}</div>
            <div>{p.user.name}</div>
            <div><img src={p.avatarUri}/> </div>
            <div>{p.timerStart.toDateString()}</div>
        </div>
    ))

    return (
        <div>{profileElements}</div>
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