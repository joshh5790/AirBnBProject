import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import SpotCard from './SpotCard'
import { getAllSpotsThunk } from '../../../store/spots'
import './HomePage.css'

const HomePage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [size, setSize] = useState(20)
    const [page, setPage] = useState(1)
    const [refresh, setRefresh] = useState(false)
    const [cardsLoaded, setCardsLoaded] = useState(0)
    const allSpots = useSelector(state => Object.values(state.spots))

    useEffect(() => {
        if (location.state === 'reset') {
            setSize(20)
            setPage(1)
            setRefresh(prev => !prev)
            location.state = ''
        }
    })

    useEffect(() => {
        dispatch(getAllSpotsThunk({ page, size }))
        .then(() => window.scroll(0,0))
    }, [dispatch, page, refresh])

    const checkSize = value => {
        if (value > 20) sessionStorage.setItem('size', 20)
        else if (value < 0) sessionStorage.setItem('size', 1)
        else sessionStorage.setItem('size', value)
        setSize(sessionStorage.getItem('size'))
    }

    const checkPage = op => {
        setCardsLoaded(0)
        if (op === '-') sessionStorage.setItem('page', page - 1 || 1)
        if (op === '+') sessionStorage.setItem('page', page + 1)
        setPage(parseInt(sessionStorage.getItem('page')))
    }

    const handleFilterSize = e => {
        e.preventDefault()
        if (!size) setSize(20)
        setCardsLoaded(size)
        sessionStorage.setItem('page', 1)
        setRefresh(prev => !prev)
        setPage(1)
    }

    return (
        <div className='home-page'>
            <div className='home-filter-bar'>
                <label className='filter-size-label'>Listings per page (max 20):</label>
                <form  onSubmit={e => handleFilterSize(e)} className='filter-size-div'>
                    <input
                        className='filter-size-input'
                        value={size}
                        onChange={e => checkSize(e.target.value)}
                        type='number' />
                    <button
                        className='filter-size-confirm'>
                        Set
                    </button>
                </form>
            </div>
            {allSpots.length === 0 && <div className='no-spots'>
                Thanos has snapped all spots out of existence. Just kidding, there are just no more spots on this page!
            </div>}
            <ul className='home-page-listings'>
                {allSpots.map(spot => <li
                        className='spot-li'
                        key={spot.id}>
                            <SpotCard spotId={spot.id} setCardsLoaded={setCardsLoaded} />
                    </li>
                )}
            </ul>
            <div className='paginate'>
                    <button
                        disabled={page === 1 || !(parseInt(cardsLoaded) >= allSpots.length)}
                        onClick={() => checkPage('-')}
                        className='page-button'>
                        {`<< Prev`}
                    </button>
                    <span className='page-number'>{page}</span>
                    <button
                        disabled={!(parseInt(cardsLoaded) >= allSpots.length) || allSpots.length === 0}
                        onClick={() => checkPage('+')}
                        className='page-button'>
                        {`Next >>`}
                    </button>
            </div>
        </div>
    )
}

export default HomePage
