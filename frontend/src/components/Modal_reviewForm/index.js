import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNewReview } from "../../store/reviews";
import { retrieveSpotDetails } from "../../store/spots";
import './reviewForm.css'

function ReviewFormModal({ spotId }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const nums = [1,2,3,4,5]

    useEffect(() => {
        if (reviewText.length > 9 && rating > 0) setDisableButton(false)
        else setDisableButton(true)
    }, [reviewText, rating])

    const onSubmit = e => {
        e.preventDefault()
        setErrors({})
        dispatch(createNewReview({ review: reviewText, stars: rating }, spotId))
            .then(() => dispatch(retrieveSpotDetails(spotId)))
            .catch(
                async res => {
                    const data = await res.json()
                    if (data && data.message) setErrors(data)
                }
            )
        closeModal()
    }
    return (
        <>
            <h1>How was your stay?</h1>
            {errors.message && <div className="error-msg">{errors.message}</div>}
            <form
                onSubmit={onSubmit}
                className="review-form">
                <textarea
                    className="review-text"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Leave your review here...">
                </textarea>
                <div className="rating-div">
                    {nums.map(num =>
                        (<span
                            key={num}
                            onClick={() => setRating(num)}>
                            {rating >= num ? <i className="fa-solid fa-star"></i>
                            : <i className="fa-regular fa-star"></i>}
                        </span>)
                    )} Stars
                </div>
                <button
                    className="submit-review-button red-button"
                    disabled={disableButton}>
                    Submit Your Review
                </button>
            </form>
        </>
    )
}

export default ReviewFormModal
