import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../store/maps';
import { useParams } from 'react-router-dom';
import { getSpotDetailsThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import Maps from './Maps';
import './mapContainer.css'

const MapContainer = () => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();
  const { spotId }= useParams()
  const currSpot = useSelector(state => state.spots[spotId])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!key) dispatch(getKey())
    dispatch(getSpotDetailsThunk(spotId))
    .then(() => setIsLoaded(true))
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  const center = {
    lat: currSpot?.lat,
    lng: currSpot?.lng
  }

  return (
    <> {isLoaded &&
    <div className='map-page'>
      <div className='map-container'>
          <Maps apiKey={key} center={center} />
      </div>
      <div className='map-page-desc'>
        <h1 className='map-page-header'>Where you'll be:</h1>
        <p className='map-loc'>{currSpot?.city}, {currSpot?.state}, {currSpot?.country}</p>
        <p>Latitude: {currSpot?.lat}</p>
        <p>Longitude: {currSpot?.lng}</p>
        <NavLink
          className='map-page-return'
          exact to={`/spots/${spotId}`}>
          {'< '}Back to location
        </NavLink>
      </div>
    </div>}
    </>
  );
};

export default MapContainer;
