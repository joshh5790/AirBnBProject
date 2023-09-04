import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getCurrentReviewsThunk } from '../../../store/reviews'
import { month } from '../../../utils/utils'
import OpenModalButton from '../../OpenModalButton'
import ReviewFormModal from '../../Modals/reviewForm'
import DeleteRecordModal from '../../Modals/deleteRecord'
import './manageReviews.css'

const ManageReviews = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getCurrentReviewsThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <> {isLoaded &&
        <div className='manage-reviews'>
            <h1>Manage Reviews</h1>
            {!reviews.length && <div>You haven't written any reviews. Go and explore!</div>}
            {reviews.map(review => {
                return (
                    <div key={review.id}>
                        <div
                            className="spot-details-review-list"
                            key={review.id}>
                            <h2>
                                {review.Spot.name}
                            </h2>
                            <h3 className="review-date">
                                {month[review.createdAt.slice(5,7)]}&nbsp;
                                {review.createdAt.slice(0,4)}
                            </h3>
                            {review.review}
                        </div>
                        <div>
                            <OpenModalButton
                                buttonText="Update"
                                modalComponent={<ReviewFormModal spotId={review.Spot.id} review={review} spotName={review.Spot.name}/>}
                                className='manage-review-button gray-color-button'
                            />
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteRecordModal spotId={review.Spot.id} reviewId={review.id} record='Review'/>}
                                className='manage-review-button gray-color-button'
                            />
                        </div>
                    </div>
                )
            })}
        </div>}
        </>
    )
}

export default ManageReviews
