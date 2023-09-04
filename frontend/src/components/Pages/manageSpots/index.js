import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SpotCard from '../home/SpotCard'
import { getCurrentSpotsThunk } from '../../../store/spots'
import './manageSpots.css'
import OpenModalButton from '../../OpenModalButton'
import DeleteRecordModal from '../../Modals/deleteRecord'

const ManageSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const allSpots = useSelector(state => Object.values(state.spots))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    const handleUpdate = spotId => {
        history.push(`/spots/${spotId}/edit`)
    }

    const handleNewSpot = () => {
        history.push('/spots/new')
    }


    return (
        <> {isLoaded &&
        <div className='manage-spots'>
            <h1>Manage Your Spots</h1>
            <button
                onClick={handleNewSpot}
                className='gray-color-button'>
                Create a New Spot
            </button>
            {!allSpots.length && <div className='no-spots'>You aren't currently hosting any spots.</div>}
            <ul className='manage-spots-listing'>
                {allSpots.map(spot => (
                    <li
                        className='spot-li'
                        key={spot.id}>
                        <SpotCard spotId={spot.id} />
                        <button
                            onClick={() => handleUpdate(spot.id)}
                            className='gray-color-button modify-spot-button'>
                            Update
                        </button>
                        <OpenModalButton
                            buttonText="Delete"
                            modalComponent={<DeleteRecordModal spotId={spot.id} record='Spot'/>}
                            className='gray-color-button modify-spot-button'
                        />
                    </li>
                ))}
            </ul>
        </div>}
        </>
    )
}

export default ManageSpots
