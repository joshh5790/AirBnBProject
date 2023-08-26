import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './reviewForm.css'

function ReviewFormModal() {
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const nums = [1,2,3,4,5]

    useEffect(() => {
        if (reviewText.length > 9 && rating > 0) setDisableButton(false)
        else setDisableButton(true)
    }, [reviewText])

    const onSubmit = e => {
        e.preventDefault()
    }
    return (
        <>
            <h1>How was your stay?</h1>
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
                        (<span onClick={() => setRating(num)}>
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
