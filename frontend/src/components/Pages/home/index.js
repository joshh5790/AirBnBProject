import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SpotCard from './SpotCard'
import { getAllSpotsThunk } from '../../../store/spots'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const [size, setSize] = useState(20)
    const [page, setPage] = useState(1)
    const allSpots = useSelector(state => Object.values(state.spots))

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const checkSize = value => {
        if (value > 20) sessionStorage.setItem('size', 20)
        else if (value < 0) sessionStorage.setItem('size', 1)
        else sessionStorage.setItem('size', value)
        setSize(sessionStorage.getItem('size'))
    }

    const checkPage = op => {
        if (op === '-') sessionStorage.setItem('page', page - 1 || 1)
        if (op === '+') sessionStorage.setItem('page', page + 1)
        setPage(parseInt(sessionStorage.getItem('page')))
        dispatch(getAllSpotsThunk({ page: sessionStorage.getItem('page'), size }))
    }

    const handleFilterSize = () => {
        console.log(size, "SUBMIT")
        sessionStorage.setItem('page', 1)
        dispatch(getAllSpotsThunk({ page: 1, size }))
    }

    return (
        <div className='home-page'>
            <div className='home-filter-bar'>
                <label className='filter-size-label'>Listings per page (max 20):</label>
                <div className='filter-size-div'>
                    <input
                        className='filter-size-input'
                        value={size}
                        onChange={e => checkSize(e.target.value)}
                        type='number' />
                    <button
                        onClick={handleFilterSize}
                        className='filter-size-confirm'>
                        Set
                    </button>
                </div>
            </div>
            <ul className='home-page-listings'>
                {allSpots.map(spot => (
                    <li
                    className='spot-li'
                    key={spot.id}>
                        <SpotCard spotId={spot.id} />
                    </li>
                ))}
            </ul>
            <div className='paginate'>
                    <button
                        disabled={page === 1}
                        onClick={() => checkPage('-')}
                        className='page-button'>
                        {`<< Previous`}
                    </button>
                    <span className='page-number'>{page}</span>
                    <button
                        onClick={() => checkPage('+')}
                        className='page-button'>
                        {`Next >>`}
                    </button>
            </div>
        </div>
    )
}

export default HomePage
