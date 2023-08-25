import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './newSpot.css'
import { createNewSpot } from '../../store/spots'
import { createSpotImage } from '../../store/spotImages'

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
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [image4, setImage4] = useState();
    const [image5, setImage5] = useState();
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (Object.keys(errors).length) {

        }
    })

    const onSubmit = async e => {
        setErrors({})
        e.preventDefault()
        const newSpot = await dispatch(createNewSpot({
            country,
            address: streetAddress,
            city,
            state,
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            description,
            name: title,
            price,
            previewImage
        }))
            .catch(
                async res => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                    console.log(data.errors)
                }
            )
        if (image2) {
            dispatch(createSpotImage(image2, newSpot.id))
                // .catch(async res => {
                //     const data = await res.json()
                //     if (data && data.errors) setErrors(data.errors)
                //     console.log(data.errors)
                // })
        }

        history.push(`/spots/${newSpot.id}`)

    }

    return (
        <div className='new-spot-page'>
            <h1>Create a new Spot</h1>
            <h2 className='subheader'>Where's your place located?</h2>
            <p className='new-spot-subdesc'>Guests will only get your exact address once they booked a reservation.</p>
            <form
                className='new-spot-form'
                onSubmit={onSubmit}>
                <label name='country'>Country <span className='error-msg new-spot'>{errors.country && `${errors.country}`}</span></label>

                <input
                    className='new-spot-input'
                    name='country'
                    value={country}
                    onChange={e => {setCountry(e.target.value)}}
                    type='text'
                    placeholder='Country' />
                <label name='streetAddress'>Street Address<span className='error-msg new-spot'>{errors.address && `${errors.address}`}</span></label>
                <input
                    className='new-spot-input'
                    name='streetAddress'
                    value={streetAddress}
                    onChange={e => {setStreetAddress(e.target.value)}}
                    type='text'
                    placeholder='Street Address' />
                <div className='input-div'>
                    <div className='city-div'>
                        <label name='city'>City<span className='error-msg new-spot'>{errors.city && `${errors.city}`}</span></label>
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
                        <label name='state'>State<span className='error-msg new-spot'>{errors.state && `${errors.state}`}</span></label>
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
                        <label name='latitude'>Latitude<span className='error-msg new-spot'>{errors.lat && `${errors.lat}`}</span></label>
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
                        <label name='longitude'>Longitude<span className='error-msg new-spot'>{errors.lng && `${errors.lng}`}</span></label>
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
                    className='new-spot-input desc'
                    value={description}
                    onChange={e => {setDescription(e.target.value)}}
                    placeholder='Description' />
                <span className='error-msg new-spot'>{errors.description && `${errors.description}`}</span>
                <h2 className='new-spot subheader'>Create a title for your spot</h2>
                <p className='new-spot-subdesc'>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    className='new-spot-input'
                    value={title}
                    onChange={e => {setTitle(e.target.value)}}
                    type='text'
                    placeholder='Title' />
                <span className='error-msg new-spot'>{errors.name && `${errors.name}`}</span>
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
                <span className='error-msg new-spot'>{errors.price && `${errors.price}`}</span>
                <h2 className='new-spot subheader'>Liven up your spot with photos</h2>
                <p className='new-spot-subdesc'>Submit a link to at least one photo to publish your spot.</p>
                <input
                    className='new-spot-input img'
                    value={previewImage}
                    onChange={e => {setPreviewImage(e.target.value)}}
                    type='text'
                    placeholder='Preview Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.previewImage && `${errors.previewImage}` || <div className='gap'/>)}
                </span>
                <input
                    className='new-spot-input img'
                    value={image2}
                    onChange={e => {setImage2(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.previewImage && `${errors.previewImage}` || <div className='gap'/>)}
                </span>
                <input
                    className='new-spot-input img'
                    value={image3}
                    onChange={e => {setImage3(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.previewImage && `${errors.previewImage}` || <div className='gap'/>)}
                </span>
                <input
                    className='new-spot-input img'
                    value={image4}
                    onChange={e => {setImage4(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.previewImage && `${errors.previewImage}` || <div className='gap'/>)}
                </span>
                <input
                    className='new-spot-input img'
                    value={image5}
                    onChange={e => {setImage5(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.previewImage && `${errors.previewImage}` || <div className='gap'/>)}
                </span>
                <div className='new-spot-button-div'>
                    <button
                        className='form-submit'>Create Spot</button>
                </div>
            </form>
        </div>
    )
}

export default NewSpot
