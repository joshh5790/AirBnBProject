import './SpotCard.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getSpotDetailsThunk } from '../../../store/spots'

const SpotCard = ({ spotId, setCardsLoaded }) => {
    const dispatch = useDispatch()
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isLoaded, setIsLoaded] = useState(false)
    const spot = useSelector(state => state.spots[spotId])

    // future functionality to view all spotImages from home page

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
        .then(() => setIsLoaded(true))
        .then(() => {
            if (setCardsLoaded) return setCardsLoaded(prev => prev + 1)
        })
    }, [dispatch])

    const handleMouseMove = (e) => {
        const currCard = e.currentTarget.getBoundingClientRect()
        setPosition({
            x: e.clientX - currCard.left + 10,
            y: e.clientY - currCard.top + 10
        });
    };

    if (isLoaded) return (
        <NavLink
            to={`/spots/${spot.id}`}
            className="spot-card"
            onMouseMove={handleMouseMove}>
            <div>
                <div className='image-container'>
                    <img
                        src={spot.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                        alt={spot.previewImage || 'Image not found'}
                        onError={e => {e.target.error=null; e.target.src='https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}}
                        className='previewImage' />
                </div>
                <div className='loc-rating'>
                    <p className='loc'>{spot.city}, {spot.state}</p>
                    <p className='rating'>
                        <i className="fa-solid fa-star"></i>
                        {spot?.avgStarRating ? `  ${parseFloat(spot.avgStarRating).toFixed(1)}` : "  New"}
                    </p>
                </div>
                <div className='spot-card-price'><b>${spot.price}</b> night</div>
            </div>
            <div className="tooltip" style={{ left: position.x, top: position.y }}>
                {spot.name}
            </div>
        </NavLink>
    )
    else return (
        <>
            <div className='image-container skeleton' />
            <div className='weird-4-px'/>
            <div className='loc-rating'>
                <p className='loc skeleton'>&nbsp;</p>
                <p className='rating skeleton'>&nbsp;</p>
            </div>
            <div className='spot-card-price skeleton'>&nbsp;</div>
        </>
    )
}

export default SpotCard
