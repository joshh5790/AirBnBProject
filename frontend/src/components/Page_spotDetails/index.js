import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSpotDetailsThunk } from "../../store/spots"
import { getReviewsThunk, allSpotReviews } from "../../store/reviews"
import { month } from "../../utils/utils"
import OpenModalButton from "../OpenModalButton"
import ReviewFormModal from "../Modal_reviewForm"
import DeleteRecordModal from "../Modal_deleteRecord"
import ViewImageModal from "../Modal_viewImage"
import './SpotDetailsPage.css'
import { useHistory } from "react-router-dom"

const SpotDetails = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const spotId = useParams().id
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(allSpotReviews)
    const sessionUser = useSelector(state => state.session.user)
    const hasReview = reviews.find(review => review.userId === sessionUser?.id)
    const [imageList, setImageList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
        .then(res => setImageList([{ url: res.previewImage }, ...res.SpotImages]))
        .then(() => dispatch(getReviewsThunk(spotId)))
        .then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    const handleReserve = () => {
        alert("Feature coming soon!")
    }

    const handleMap = () => {
        history.push(`/spots/${spotId}/map`)
    }

    return (
        <> {isLoaded &&
        <div className="spot-details-page">
            <h1>{spot?.name}</h1>
            <div
                onClick={handleMap}
                className="spot-details-loc">
                {spot?.city}, {spot?.state}, {spot?.country}
            </div>
            <div className="spot-details-images">
                <ViewImageModal
                    imageOrder='0'
                    imageList={imageList}
                    className='spot-details-image-1'/>
                <ViewImageModal
                    imageOrder='1'
                    imageList={imageList}
                    className="spot-details-image-2"/>
                <ViewImageModal
                    imageOrder='2'
                    imageList={imageList}
                    className="spot-details-image-3"/>
                <ViewImageModal
                    imageOrder='3'
                    imageList={imageList}
                    className="spot-details-image-4"/>
                <ViewImageModal
                    imageOrder='4'
                    imageList={imageList}
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
                            {(spot?.avgStarRating &&
                                `  ${parseFloat(spot?.avgStarRating).toFixed(1)} · ${spot?.numReviews} review${spot?.numReviews!==1 && 's'}`)
                                || ' New '}
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
                <h2>
                    <i className="fa-solid fa-star"></i>
                    {(spot?.avgStarRating &&
                        `  ${parseFloat(spot?.avgStarRating).toFixed(1)} · ${spot?.numReviews} review`)
                        || ' New '}{spot?.avgStarRating && spot?.numReviews!==1 && 's'}
                </h2>
                {sessionUser && sessionUser?.id !== spot?.Owner?.id && !hasReview &&
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<ReviewFormModal spotId={spot?.id}/>}
                    className='gray-color-button'
                />}
                {!spot?.numReviews &&
                    ((sessionUser?.id === spot?.Owner?.id &&
                    <div className="no-reviews">Your spot currently has no reviews.</div>)
                    || (sessionUser?.id && <div className="no-reviews">Be the first to post a review!</div>)
                    || <div className="no-reviews">Log in to post a review!</div>)
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
        </div>}
        </>
    )
}

export default SpotDetails
