import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getSpotDetailsThunk } from "../../../store/spots"
import { getReviewsThunk, allSpotReviews } from "../../../store/reviews"
import { month } from "../../../utils/utils"
import OpenModalButton from "../../OpenModalButton"
import ReviewFormModal from "../../Modals/reviewForm"
import DeleteRecordModal from "../../Modals/deleteRecord"
import ViewImageModal from "../../Modals/viewImage"
import './SpotDetailsPage.css'
import { useHistory } from "react-router-dom"

const SpotDetails = () => {
    window.scroll(0, 0)
    const dispatch = useDispatch()
    const history = useHistory()
    const spotId = useParams().id
    const spot = useSelector(state => state.spots[spotId])
    const reviews = useSelector(allSpotReviews)
    const sessionUser = useSelector(state => state.session.user)
    const hasReview = reviews.find(review => review.userId === sessionUser?.id)
    const [imageList, setImageList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const nums = [1,2,3,4,5]
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

    if (isLoaded) return (
        <div className="spot-details-page">
            <h1 className="spot-details-header">{spot?.name}</h1>
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
                            {(parseInt(spot?.avgStarRating) &&
                                `  ${parseFloat(spot?.avgStarRating).toFixed(1)} · ${spot?.numReviews} review`)
                                || ' New '}{spot?.numReviews > 1 && 's'}
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
                    <i className="fa-solid fa-star" />
                    {(parseInt(spot?.avgStarRating) &&
                        `  ${parseFloat(spot?.avgStarRating).toFixed(1)} · ${spot?.numReviews} review`)
                        || ' New '}{parseInt(spot?.numReviews) > 1 && 's'}
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
                                {nums.map(num =>
                                    (<span
                                        className="star-span"
                                        key={num}>
                                        {review?.stars >= num ? <i className="fa-solid fa-star"></i>
                                        : <i className="fa-regular fa-star"></i>}
                                    </span>)
                                )}
                                <h3 className="gray">
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
    else return (
        <div className="spot-details-page">
            <h1 className="spot-details-header skeleton">&nbsp;</h1>
            <div className="spot-details-loc skeleton">&nbsp;</div>
            <div className="spot-details-images">
                <div className="spot-details-image-1 skeleton">&nbsp;</div>
                <div className="spot-details-image-2 skeleton">&nbsp;</div>
                <div className="spot-details-image-3 skeleton">&nbsp;</div>
                <div className="spot-details-image-4 skeleton">&nbsp;</div>
                <div className="spot-details-image-5 skeleton">&nbsp;</div>
            </div>
        </div>
    )
}

export default SpotDetails
