import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SpotCard from './SpotCard'
import { getAllSpotsThunk } from '../../../store/spots'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => Object.values(state.spots))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <> {isLoaded &&
        <ul className='home-page'>
            {allSpots.map(spot => (
                <li
                    className='spot-li'
                    key={spot.id}>
                    <SpotCard spot={spot} />
                </li>
            ))}
        </ul>}
        </>
    )
}

export default HomePage
