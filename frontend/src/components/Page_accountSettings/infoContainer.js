import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import './infoContainer.css'

function InfoContainer({label, desc, variables, otherEdit}) {
    const dispatch = useDispatch()
    const [editForm, setEditForm] = useState(false)
    const [values, setValues] = useState({})
    const entries = Object.entries(variables)

    useEffect(() => {
        setValues(() => {return { ...variables }})
    }, [editForm, variables])
    // variables is an object e.g. { firstName: 'Josh', lastName: 'Ho'}

    const handleSubmit = e => {
        e.preventDefault()

    }

    return (
        <div className="info-container">
            <div className="info-label">{label}</div>
            <div
                className="info-edit-button"
                onClick={() => setEditForm(prev => !prev)}
                disabled={otherEdit}>
                {(!editForm && 'Edit') || 'Cancel'}
            </div>
            {!editForm && <div className="curr-info">
                {entries.map(entry => <span key={entry[0]}>{`${entry[1]} `}</span>)}
            </div>}
            {editForm && <div className="info-edit-panel">
                <div>{desc}</div>
                <form onSubmit={handleSubmit}>
                    <div className="info-inputs-div">
                        {entries.map(entry =>
                        <span key={entry[0]} className={entry[0]}>
                            <div>{entry[0]}</div>
                            <input
                                className="info-input"
                                placeholder={entry[0]}
                                value={values[entry[0]]}
                                onChange={e => setValues(prev => {return {...prev, [entry[0]]: e.target.value}})} />
                        </span>)}
                    </div>
                    <button className="save-personal">Save</button>
                </form>
            </div>}
        </div>
    )
}

export default InfoContainer
