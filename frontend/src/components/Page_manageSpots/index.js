import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SpotCard from '../Page_home/SpotCard'
import { retrieveCurrentSpots, removeSpot } from '../../store/spots'
import './manageSpots.css'
import OpenModalButton from '../OpenModalButton'
import DeleteRecordModal from '../Modal_deleteRecord'

const ManageSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [refresh, setRefresh] = useState(false)
    const allSpots = useSelector(state => Object.values(state.spots))

    useEffect(() => {
        dispatch(retrieveCurrentSpots())
    }, [dispatch])

    const handleUpdate = spotId => {
        history.push(`/spots/${spotId}/edit`)
    }

    const handleNewSpot = () => {
        history.push('/spots/new')
    }

    const handleDelete = spotId => {
        dispatch(removeSpot(spotId))
        setRefresh(prev => !prev)
    }


    return (
        <div className='manage-spots'>
            <h1>Manage Your Spots</h1>
            <button
                onClick={handleNewSpot}
                className='gray-color-button'>
                Create a New Spot
            </button>
            <ul className='manage-spots-listing'>
                {allSpots.map(spot => (
                    <li
                        className='spot-li'
                        key={spot.id}>
                        <SpotCard spot={spot} />
                        <button
                            onClick={() => handleUpdate(spot.id)}
                            className='gray-color-button modify-spot-button'>
                            Update
                        </button>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteRecordModal spotId={spot?.id} record='Spot'/>}
                            className='gray-color-button modify-spot-button'
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ManageSpots
