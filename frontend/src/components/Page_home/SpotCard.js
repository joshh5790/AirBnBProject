import './SpotCard.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const SpotCard = ({ spot }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseEnter = (e) => {
        setIsVisible(true);
        updateTooltipPosition(e);
    };

    const handleMouseMove = (e) => {
        updateTooltipPosition(e);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    const updateTooltipPosition = (e) => {
        const currCard = e.currentTarget.getBoundingClientRect()
        setPosition({
            x: e.clientX - currCard.left + 10,
            y: e.clientY - currCard.top + 10
        });
    };

    return (
        <NavLink
            to={`/spots/${spot.id}`}
            className="spot-card"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <img
                    src={spot.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={spot.previewImage || 'Image not found'}
                    className='previewImage' />
                <div className='loc-rating'>
                    <p className='loc'>{spot.city}, {spot.state}</p>
                    <p className='rating'>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgStarRating ? `  ${spot.avgStarRating}` : "  New"}
                    </p>
                </div>
                <div className='price'><span className='price-num'>{`$${spot.price} `}</span>night</div>
            </div>
            {isVisible && (
                <div className="tooltip" style={{ left: position.x, top: position.y }}>
                    {spot.name}
                </div>
            )}
        </NavLink>
    )
}

export default SpotCard
