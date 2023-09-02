import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SpotCard from './SpotCard'
import { getAllSpotsThunk } from '../../../store/spots'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const [size, setSize] = useState(20)
    const allSpots = useSelector(state => Object.values(state.spots))

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const checkSize = value => {
        if (value > 20) setSize(20)
        else if (value < 0) setSize(1)
        else setSize(value)
    }

    const handleFilterSize = () => {
        if (!size) setSize(20)
        dispatch(getAllSpotsThunk({ size: size || 20 }))
    }

    return (
        <div className='home-page'>
            <div className='home-filter-bar'>
                <label className='filter-size-label'>Listings per page (max 20):</label>
                <div className='filter-size-div'>
                    <input
                        className='filter-size-input'
                        value={size}
                        onChange={e => checkSize(e.target.value)}
                        type='number' />
                    <button
                        onClick={handleFilterSize}
                        className='filter-size-confirm'>
                        Set
                    </button>
                </div>
            </div>
            <ul className='home-page-listings'>
                {allSpots.map(spot => (
                    <li
                    className='spot-li'
                    key={spot.id}>
                        <SpotCard spotId={spot.id} />
                    </li>
                ))}
            </ul>
            <div className='paginate'>

            </div>
        </div>
    )
}

export default HomePage
