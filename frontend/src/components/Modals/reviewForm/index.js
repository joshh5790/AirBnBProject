import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createReviewThunk, updateReviewThunk } from "../../../store/reviews";
import { getSpotDetailsThunk } from "../../../store/spots";
// import { validateImg } from "../../../utils/utils";
import './reviewForm.css'

function ReviewFormModal({ spotId, review, spotName }) {
    const dispatch = useDispatch()
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState('')
    const [hoverRating, setHoverRating] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    // const [images, setImages] = useState({})
    // const [imageArr, setImageArr] = useState([])
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const nums = [1,2,3,4,5]

    const handleMouseEnter = num => {
        setHoverRating(num)
    };

    const handleMouseLeave = () => {
        setHoverRating(rating)
    };

    useEffect(() => {
        if (review) {
            setReviewText(review.review)
            setRating(review.stars)
            setHoverRating(review.stars)
            // setImages({
            //     0: review?.reviewImages[0].url || '',
            //     1: review?.reviewImages[1].url || '',
            //     2: review?.reviewImages[2].url || '',
            //     3: review?.reviewImages[3].url || '',
            //     4: review?.reviewImages[4].url || '',
            //     5: review?.reviewImages[5].url || '',
            //     6: review?.reviewImages[6].url || '',
            //     7: review?.reviewImages[7].url || '',
            //     8: review?.reviewImages[8].url || '',
            //     9: review?.reviewImages[9].url || '',
            // })
            // setImageArr([...review.reviewImages])
        }
    }, [review])

    useEffect(() => {
        if (reviewText.length > 9 && rating > 0) setDisableButton(false)
        else setDisableButton(true)
    }, [reviewText, rating])

    const onSubmit = e => {
        e.preventDefault()
        setErrors({})
        if (review) {
            dispatch(updateReviewThunk({
                id: review.id,
                review: reviewText,
                stars: rating }))
                .then(() => dispatch(getSpotDetailsThunk(spotId)))
                .catch(
                    async res => {
                        const data = await res.json()
                        if (data) setErrors(data)
                })
        } else {
            dispatch(createReviewThunk({
                review: reviewText,
                stars: rating }, spotId))
                .then(() => dispatch(getSpotDetailsThunk(spotId)))
                .catch(
                    async res => {
                        const data = await res.json()
                        if (data) setErrors(data)
                })
        }
        closeModal()
    }
    return (
        <>
            <h1 className="review-modal-header">
                How was your stay{spotName && ` at ${spotName}`}?
            </h1>
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
                            onMouseEnter={() => handleMouseEnter(num)}
                            onMouseLeave={handleMouseLeave}
                            className="star-span"
                            key={num}

                            onClick={() => setRating(num)}>
                            {hoverRating >= num ? <i className="fa-solid fa-star"></i>
                            : <i className="fa-regular fa-star"></i>}
                        </span>)
                    )} Stars
                </div>
                <button
                    className="submit-review-button red-button"
                    disabled={disableButton}>
                    {review && 'Update Your Review'}
                    {!review && 'Submit Your Review'}
                </button>
            </form>
        </>
    )
}

export default ReviewFormModal
