import { useSelector } from "react-redux"
import InfoContainer from "./infoContainer"
import './accountSettings.css'

function AccountSettings() {
    const user = useSelector(state => state.session.user)

    return (
        <div className="account-settings">
            <h2>Personal Info</h2>
                <InfoContainer
                    label='Legal name'
                    desc='This is the name on your travel document, which could be a license or a passport.'
                    variables={ {'First Name': user.firstName, 'Last Name': user.lastName} }
                    />
                <InfoContainer
                    label='Email address'
                    desc='Use an address you’ll always have access to.'
                    variables={ {'Email address': user.email} }
                    />
            <h2>Security</h2>
        </div>
    )
}

export default AccountSettings
