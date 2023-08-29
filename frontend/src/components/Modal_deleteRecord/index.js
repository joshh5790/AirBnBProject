import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteReview } from '../../store/reviews'
import { removeSpot, retrieveSpotDetails } from '../../store/spots'
import './deleteRecord.css'

function DeleteRecordModal({ spotId, reviewId, record }) {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [clicked, setClicked] = useState(false)
    const { closeModal } = useModal()

    const handleDelete = () => {
        if (record === 'Review' && !clicked) {
            dispatch(deleteReview(reviewId))
                .then(() => dispatch(retrieveSpotDetails(spotId)))
                .then(() => setClicked(true))
        }
        if (record === 'Spot' && !clicked) {
            dispatch(removeSpot(spotId))
                .then(() => setClicked(true))
            setRefresh(prev => !prev)
        }
        closeModal()
    }

    return (
        <div className='delete-modal-container'>
            <h1>Confirm Delete</h1>
            <p className='delete-modal-text'>
                {record === 'Review' && 'Are you sure you want to delete this review?'}
                {record === 'Spot' && 'Are you sure you want to remove this spot from the listings?'}
            </p>
            <button
                className='delete-modal-button delete-modal-yes'
                onClick={handleDelete}>
                {`Yes (Delete ${record})`}
            </button>
            <button
                className='delete-modal-button delete-modal-no'
                onClick={closeModal}>
                {`No (Keep ${record})`}
            </button>
        </div>
    )
}

export default DeleteRecordModal
