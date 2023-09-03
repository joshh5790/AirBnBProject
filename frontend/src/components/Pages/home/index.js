import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SpotCard from './SpotCard'
import { getAllSpotsThunk } from '../../../store/spots'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const [size, setSize] = useState(20)
    const [page, setPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const allSpots = useSelector(state => Object.values(state.spots))

    useEffect(() => {
        dispatch(getAllSpotsThunk({ page, size }))
        .then(setIsLoaded(true))
    }, [dispatch, page, refresh])

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
    }

    const handleFilterSize = () => {
        sessionStorage.setItem('page', 1)
        setRefresh(prev => !prev)
        setPage(1)
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
                        <SpotCard spotId={spot.id} homeLoaded={isLoaded} setHomeLoaded={setIsLoaded} />
                    </li>
                ))}
            </ul>
            <div className='paginate'>
                    {isLoaded && <button
                        disabled={page === 1}
                        onClick={() => checkPage('-')}
                        className='page-button'>
                        {`<< Prev`}
                    </button>}
                    <span className='page-number'>{page}</span>
                    {isLoaded && <button
                        onClick={() => checkPage('+')}
                        className='page-button'>
                        {`Next >>`}
                    </button>}
            </div>
        </div>
    )
}

export default HomePage
