import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { retrieveSpotDetails } from "../../store/spots"
import { retrieveReviews } from "../../store/reviews"
import { month } from "../../utils/utils"
import OpenModalButton from "../OpenModalButton"
import ReviewFormModal from "../Modal_reviewForm"
import './SpotDetailsPage.css'

const SpotDetails = () => {
    const dispatch = useDispatch()
    const spotId = useParams().id
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(state => Object.values(state.reviews))
    const sessionUser = useSelector(state => state.session.user)
    const hasReview = reviews.find(review => review.userId === sessionUser.id)

    useEffect(() => {
        dispatch(retrieveSpotDetails(spotId))
        dispatch(retrieveReviews(spotId))
    }, [dispatch, spotId])

    const handleReserve = () => {
        alert("Feature coming soon!")
    }

    return (
        <div className="spot-details-page">
            <h1>{spot?.name}</h1>
            <div className="spot-details-loc">
                {spot?.city}, {spot?.state}, {spot?.country}
            </div>
            <div className="spot-details-images">
                <img
                    src={spot?.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={spot?.previewImage || 'Image not found'}
                    className="spot-details-image-1"/>
                <img
                    src={spot?.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={spot?.previewImage || 'Image not found'}
                    className="spot-details-image-2"/>
                <img
                    src={spot?.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={spot?.previewImage || 'Image not found'}
                    className="spot-details-image-3"/>
                <img
                    src={spot?.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={spot?.previewImage || 'Image not found'}
                    className="spot-details-image-4"/>
                <img
                    src={spot?.previewImage || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={spot?.previewImage || 'Image not found'}
                    className="spot-details-image-5"/>
            </div>
            <div className="spot-details-description">
                <div className="spot-details-text">
                    <h2>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
                    <p>{spot?.description}</p>
                </div>
                <div className="spot-details-reserve">
                    <div className="spot-details-reserve-top">
                        <p>${spot?.price} night</p>
                        <p>
                            <i className="fa-solid fa-star"></i>
                            {(spot?.avgStarRating && `  ${spot?.avgStarRating}  `) || ' New '}
                            &nbsp;·&nbsp;
                            {reviews.length} review{reviews.length!==1 && 's'}
                        </p>
                    </div>
                    <button
                        className="reserve-button"
                        onClick={handleReserve}>
                        Reserve
                    </button>
                </div>
            </div>
            <div className="spot-details-reviews">
                <h1>
                    <i className="fa-solid fa-star"></i>
                    {(spot?.avgStarRating && `  ${spot?.avgStarRating}  `) || ' New '}
                    &nbsp;·&nbsp;
                    {reviews.length} review{reviews.length!==1 && 's'}
                </h1>
                {sessionUser && sessionUser?.id !==spot?.Owner?.id && !hasReview &&
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<ReviewFormModal />}
                    className='create-review-button'
                />}
                {reviews.map(review => {
                    return (
                        <div
                            className="spot-details-review-list"
                            key={review?.id}>
                            <h2>
                                {review?.User?.firstName}
                            </h2>
                            <h3 className="review-date">
                                {month[review?.createdAt.slice(5,7)]}&nbsp;
                                {review?.createdAt.slice(0,4)}
                            </h3>
                            {review?.review}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SpotDetails
