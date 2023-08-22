import { useSelector } from 'react-redux'
import SpotCard from './SpotCard'
import './HomePage.css'

const HomePage = () => {
    const allSpots = useSelector(state => Object.values(state.spots))


    return (
        <>
            <ul className='home-page'>
                {allSpots.map(spot => (
                    <li key={spot.id}>
                        <SpotCard spot={spot} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default HomePage
