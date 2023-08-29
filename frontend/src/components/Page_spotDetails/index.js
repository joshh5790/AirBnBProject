import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { retrieveSpotDetails } from "../../store/spots"
import { retrieveReviews, allSpotReviews } from "../../store/reviews"
import { month } from "../../utils/utils"
import OpenModalButton from "../OpenModalButton"
import ReviewFormModal from "../Modal_reviewForm"
import './SpotDetailsPage.css'
import DeleteRecordModal from "../Modal_deleteRecord"

const SpotDetails = () => {
    const dispatch = useDispatch()
    const spotId = useParams().id
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(allSpotReviews)
    const sessionUser = useSelector(state => state.session.user)
    const hasReview = reviews.find(review => review.userId === sessionUser?.id)

    useEffect(() => {
        dispatch(retrieveSpotDetails(spotId))
        .then(() => dispatch(retrieveReviews(spotId)))
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
                    onError={e => {e.target.error=null; e.target.src='https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}}
                    className="spot-details-image-1"/>
                <img
                    src={(spot?.SpotImages && spot?.SpotImages[0]?.url) || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={(spot?.SpotImages && spot?.SpotImages[0]?.url) || 'Image not found'}
                    onError={e => {e.target.error=null; e.target.src='https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}}
                    className="spot-details-image-2"/>
                <img
                    src={(spot?.SpotImages && spot?.SpotImages[1]?.url) || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={(spot?.SpotImages && spot?.SpotImages[1]?.url) || 'Image not found'}
                    onError={e => {e.target.error=null; e.target.src='https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}}
                    className="spot-details-image-3"/>
                <img
                    src={(spot?.SpotImages && spot?.SpotImages[2]?.url) || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={(spot?.SpotImages && spot?.SpotImages[2]?.url) || 'Image not found'}
                    onError={e => {e.target.error=null; e.target.src='https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}}
                    className="spot-details-image-4"/>
                <img
                    src={(spot?.SpotImages && spot?.SpotImages[3]?.url) || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                    alt={(spot?.SpotImages && spot?.SpotImages[3]?.url) || 'Image not found'}
                    onError={e => {e.target.error=null; e.target.src='https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}}
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
                            {spot?.numReviews} review{spot?.numReviews!==1 && 's'}
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
                    {spot?.numReviews} review{spot?.numReviews!==1 && 's'}
                </h1>
                {sessionUser && sessionUser?.id !== spot?.Owner?.id && !hasReview &&
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<ReviewFormModal spotId={spot?.id}/>}
                    className='gray-color-button'
                />}
                {!spot?.numReviews &&
                    ((sessionUser?.id === spot?.Owner?.id &&
                    <div className="no-reviews">Your spot currently has no reviews.</div>) ||
                    <div className="no-reviews">Be the first to post a review!</div>)
                }
                {reviews.map(review => {
                    return (
                        <div key={review.id}>
                            <div
                                className="spot-details-review-list"
                                key={review?.id}>
                                <h2>
                                    {review?.User?.firstName || sessionUser?.firstName}
                                </h2>
                                <h3 className="review-date">
                                    {month[review?.createdAt.slice(5,7)]}&nbsp;
                                    {review?.createdAt.slice(0,4)}
                                </h3>
                                {review?.review}
                            </div>
                            {review?.userId===sessionUser?.id &&
                            <div>
                                <OpenModalButton
                                    buttonText="Update"
                                    modalComponent={<ReviewFormModal spotId={spot?.id} review={review}/>}
                                    className='manage-review-button gray-color-button'
                                />
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteRecordModal spotId={spot?.id} reviewId={review?.id} record='Review'/>}
                                    className='manage-review-button gray-color-button'
                                />
                            </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SpotDetails
