import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SpotCard from '../Page_home/SpotCard'
import { retrieveCurrentSpots } from '../../store/spots'
import './manageSpots.css'

const ManageSpots = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => Object.values(state.spots))


    console.log(allSpots)
    // catching error on componentDidMount when going to home page
    // from spot details, will have duplicate spot for a split second
    useEffect(() => {
        dispatch(retrieveCurrentSpots())
    }, [dispatch])

    const handleUpdate = e => {
        e.preventDefault()
    }
    const handleDelete = e => {
        e.preventDefault()
    }

    return (
        <div className='manage-spots'>
            <h1>Manage Your Spots</h1>
            <button className='gray-color-button'>
                Create a New Spot
            </button>
            <ul className='manage-spots-listing'>
                {allSpots.map(spot => (
                    <li
                        className='spot-li'
                        key={spot.id}>
                        <SpotCard spot={spot} />
                        <button
                            onClick={handleUpdate}
                            className='gray-color-button modify-spot-button'>
                            Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className='gray-color-button modify-spot-button'>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ManageSpots
