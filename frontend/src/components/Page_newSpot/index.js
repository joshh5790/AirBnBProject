import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './newSpot.css'

const NewSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState('')
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [disableButton, setDisableButton] = useState(true)

    const onSubmit = () => {
        // history.push(`/spots/${newSpot.id}`)
    }

    return (
        <div className='new-spot-page'>
            <h1>Create a new Spot</h1>
            <h2 className='subheader'>Where's your place located?</h2>
            <p className='new-spot-subdesc'>Guests will only get your exact address once they booked a reservation.</p>
            <form
                className='new-spot-form'
                onSubmit={onSubmit}>
                <label for='country'>Country</label>
                <input
                    className='new-spot-input'
                    name='country'
                    value={country}
                    onChange={e => {setCountry(e.target.value)}}
                    type='text'
                    placeholder='Country' />
                <label for='streetAddress'>Street Address</label>
                <input
                    className='new-spot-input'
                    name='streetAddress'
                    value={streetAddress}
                    onChange={e => {setStreetAddress(e.target.value)}}
                    type='text'
                    placeholder='Street Address' />
                <div className='input-div'>
                    <div className='city-div'>
                        <label for='city'>City</label>
                        <input
                            className='new-spot-input-city'
                            name='city'
                            value={city}
                            onChange={e => {setCity(e.target.value)}}
                            type='text'
                            placeholder='City' />
                    <span className='comma'>&nbsp;&nbsp;,</span>
                    </div>
                    <div className='state-div'>
                        <label for='state'>State</label>
                        <input
                            className='new-spot-input-state'
                            name='state'
                            value={state}
                            onChange={e => {setState(e.target.value)}}
                            type='text'
                            placeholder='STATE' />
                    </div>
                </div>
                <div className='input-div'>
                    <div className='lat-div'>
                        <label for='latitude'>Latitude</label>
                        <input
                            className='new-spot-input-lat'
                            name='latitude'
                            value={latitude}
                            onChange={e => {setLatitude(e.target.value)}}
                            type='number'
                            placeholder='Latitude' />
                        <span className='comma'>&nbsp;&nbsp;,</span>
                    </div>
                    <div className='lng-div'>
                        <label for='longitude'>Longitude</label>
                        <input
                            className='new-spot-input-lng'
                            name='longitude'
                            value={longitude}
                            onChange={e => {setLongitude(e.target.value)}}
                            type='number'
                            placeholder='Longitude' />
                    </div>
                </div>
                <h2 className='new-spot subheader'>Describe your place to guests</h2>
                <p className='new-spot-subdesc'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    className='new-spot-input'
                    value={description}
                    onChange={e => {setDescription(e.target.value)}}
                    placeholder='Description' />
                <h2 className='new-spot subheader'>Create a title for your spot</h2>
                <p className='new-spot-subdesc'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    className='new-spot-input'
                    value={title}
                    onChange={e => {setTitle(e.target.value)}}
                    type='text'
                    placeholder='Title' />
                <h2 className='new-spot subheader'>Set a base price for your spot</h2>
                <p className='new-spot-subdesc'>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className='input-div'>
                    $&nbsp;
                    <input
                        className='new-spot-input price'
                        value={price}
                        onChange={e => {setPrice(e.target.value)}}
                        type='number'
                        placeholder='Price per night (USD)' />
                </div>
                <h2 className='new-spot subheader'>Liven up your spot with photos</h2>
                <p className='new-spot-subdesc'>Submit a link to at least one photo to publish your spot.</p>
                <input
                    className='new-spot-input img'
                    value={previewImage}
                    onChange={e => {setPreviewImage(e.target.value)}}
                    type='text'
                    placeholder='Preview Image URL' />
                <input
                    className='new-spot-input img'
                    value={image2}
                    onChange={e => {setImage2(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <input
                    className='new-spot-input img'
                    value={image3}
                    onChange={e => {setImage3(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <input
                    className='new-spot-input img'
                    value={image4}
                    onChange={e => {setImage4(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <input
                    className='new-spot-input img'
                    value={image5}
                    onChange={e => {setImage5(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <div className='new-spot-button-div'>
                    <button
                        className='form-submit'
                        disabled={disableButton}>Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default NewSpot
