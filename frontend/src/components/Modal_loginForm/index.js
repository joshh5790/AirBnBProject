import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginThunk } from '../../store/session'
import { useModal } from '../../context/Modal'
import { demoLoginThunk } from '../../store/session'
import './LoginForm.css'

function LoginFormModal() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [disableButton, setDisableButton] = useState(true)
    const currUser = useSelector(state => state.session.user)
    const { closeModal } = useModal()

    useEffect(() => {
        if (credential.length > 3 && password.length > 5) {
            setDisableButton(false)
        } else setDisableButton(true)
    }, [credential, password])

    if (currUser) {
        history.push('/')
    }

    const onSubmit = e => {
        setErrors({})
        e.preventDefault()
        dispatch(loginThunk({ credential, password }))
            .then(closeModal)
            .catch(
                async res => {
                    const data = await res.json()
                    if (data && data.message) setErrors(data)
                }
            )
        history.push('/')
    }

    const handleDemo = () => { // demo
        dispatch(demoLoginThunk())
        closeModal()
        history.push('/')
    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={onSubmit}>
                <input
                    className='login-input'
                    name='credential'
                    placeholder='Username or Email'
                    type='text'
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                    required />
                <input
                    className='login-input'
                    name='password'
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required />
                {errors.message && <p className='error-msg'>{errors.message}</p>}
                <button
                    className='red-button'
                    disabled={disableButton}>Log In</button>
            </form>
            <p
                className='demo-user'
                onClick={handleDemo}>Demo User</p>
        </>
    )
}

export default LoginFormModal
