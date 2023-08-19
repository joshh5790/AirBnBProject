import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../store/session'
import { useModal } from '../../context/Modal'
import './LoginForm.css'

function LoginFormModal() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const currUser = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    if (currUser) {
        history.push('/')
    }

    const handleSubmit = e => {
        setErrors({})
        e.preventDefault()
        dispatch(login({ credential, password }))
        .then(closeModal)
        .catch(
            async res => {
                const data = await res.json()
                if (data && data.message) setErrors(data)
            }
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label name='credential'>Credential:
                    <input
                        name='credential'
                        placeholder='Username or Email'
                        type='text'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        required />
                </label>
                <label name='password'>Password:
                    <input
                        name='password'
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                </label>
                {errors.message && <p>{errors.message}</p>}
                <button>Log In</button>
            </form>
        </div>
    )
}

export default LoginFormModal
