import './SpotCard.css'
import { NavLink } from 'react-router-dom'

const SpotCard = ({ spot }) => {
    return (
        <NavLink to={`/spots/${spot.id}`}>
            <div className="spot-card">
                <img
                    src={spot.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={spot.previewImage || 'Image not found'}
                    className='previewImage' />
                <div className='loc-rating'>
                    <p className='loc'>{spot.city}, {spot.state}</p>
                    <p className='rating'>
                        <i class="fa-solid fa-star"></i>
                        {spot.avgStarRating ? `  ${spot.avgStarRating}` : "  -.-"}
                    </p>
                </div>
                <div className='price'><span className='price-num'>{`$${spot.price} `}</span>night</div>
            </div>
        </NavLink>
    )
}

export default SpotCard
