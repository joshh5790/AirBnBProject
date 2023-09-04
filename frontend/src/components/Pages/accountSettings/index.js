import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { restoreUserThunk } from "../../../store/session"
import OpenModalButton from '../../OpenModalButton'
import DeleteAccountModal from "../../Modals/deleteAccount"
import InfoContainer from "./infoContainer"
import './accountSettings.css'

function AccountSettings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [otherEdit, setOtherEdit] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => restoreUser(), [])

    const changeEditStatus = () => {
        setOtherEdit(prev => !prev)
    }

    const restoreUser = () => {
        setIsLoaded(false)
        dispatch(restoreUserThunk())
        .then(() => setIsLoaded(true))
    }

    return (
        <>{isLoaded &&
        <div className="account-settings">
            <h2>Personal Info</h2>
                <InfoContainer
                    label='Legal name'
                    desc='This is the name on your travel document, which could be a license or a passport.'
                    type='name'
                    variables={ {'First Name': user.firstName, 'Last Name': user.lastName} }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                    restoreUser={restoreUser}
                />
                <InfoContainer
                    label='Email address'
                    desc='Use an address you’ll always have access to.'
                    type='email'
                    variables={ {'Email address': user.email} }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                    restoreUser={restoreUser}
                />
            <h2>Security</h2>
                <InfoContainer
                    label='Password'
                    desc='Reset password functionality is unavailable so use with caution!'
                    type='password'
                    variables={ {'Old Password': '', 'New Password': '', 'Confirm New Password': ''} }
                    otherEdit={otherEdit}
                    changeOther={changeEditStatus}
                    restoreUser={restoreUser}
                />
            {!otherEdit &&
            <OpenModalButton
                buttonText='Delete Account'
                modalComponent={<DeleteAccountModal user={user}/>}
                className='delete-account-button'
            />}
        </div>
        }</>
    )
}

export default AccountSettings
