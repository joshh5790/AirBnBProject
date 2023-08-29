import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './newSpot.css'
import { createNewSpot, modifySpot, retrieveSpotDetails } from '../../store/spots'
import { generateSpotImage, editSpotImage, removeSpotImage } from '../../store/spotImages'

const NewSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('');
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
    const [submitStatus, setSubmitStatus] = useState(false)
    const [errors, setErrors] = useState({})
    const imageIdArr = []

    useEffect(() => {
        if (spotId) {
            dispatch(retrieveSpotDetails(spotId))
                .then((data) => {
                    setCountry(data.country);
                    setAddress(data.address);
                    setCity(data.city);
                    setState(data.state);
                    setLatitude(data.lat);
                    setLongitude(data.lng);
                    setDescription(data.description);
                    setTitle(data.name);
                    setPrice(data.price);
                    setPreviewImage(data.previewImage);
                    setImage2(data.SpotImages[0]?.url || '');
                    setImage3(data.SpotImages[1]?.url || '');
                    setImage4(data.SpotImages[2]?.url || '');
                    setImage5(data.SpotImages[3]?.url || '');
                    for (const image in data.SpotImages) {
                        imageIdArr.push(image.id)
                    }
                })
        } else {
            setCountry('');
            setAddress('');
            setCity('');
            setState('');
            setLatitude('');
            setLongitude('');
            setDescription('');
            setTitle('');
            setPrice('');
            setPreviewImage('');
            setImage2('');
            setImage3('');
            setImage4('');
            setImage5('');
        }
    }, [spotId])

    const validateImg = (image, name, errors) => {
        if (!image.length) return true
        if (/\.(jpg|jpeg|png)$/.test(image)) return true
        errors[name] = 'Image URL must end in .png, .jpg, or .jpeg'
    }

    const validateSpot = () => {
        const spotErrors = {}
        if (!country) spotErrors.country = 'Country is required'
        if (!address) spotErrors.address = 'Address is required'
        if (!city) spotErrors.city = 'City is required';
        if (!state) spotErrors.state = 'State is required';
        if (!latitude) spotErrors.lat = 'Latitude is required';
        if (!longitude) spotErrors.lng = 'Longitude is required';
        if (!description || description.length < 30) {
            spotErrors.description = 'Description needs a minimum of 30 characters';
        }
        if (!title) spotErrors.name = 'Name is required';
        if (title.length > 50) spotErrors.name = 'Name must be less than 50 characters'
        if (!price) spotErrors.price = 'Price is required';
        validateImg(previewImage, 'previewImage', spotErrors)
        if (!previewImage) spotErrors.previewImage = 'Preview Image is required';
        validateImg(image2, 'image2', spotErrors)
        validateImg(image3, 'image3', spotErrors)
        validateImg(image4, 'image4', spotErrors)
        validateImg(image5, 'image5', spotErrors)
        return spotErrors
    }

    useEffect(() => {
        if (submitStatus) setErrors(validateSpot())
    }, [country, address, city,
        state, latitude, longitude,
        description, title, price,
        previewImage, image2, image3,
        image4, image5, submitStatus])

    const onSubmit = async e => { // still going through when there are errors on the images
        e.preventDefault()
        setSubmitStatus(true)
        setErrors({})
        const spotErrors = validateSpot()

        if (Object.keys(spotErrors).length) return setErrors({...spotErrors})

        const spotInfo = {
            country,
            address,
            city,
            state,
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            description,
            name: title,
            price,
            previewImage
        }

        if (spotId) {
            spotInfo.id = spotId
            await dispatch(modifySpot(spotInfo))
                .then(() => {
                    if (imageIdArr[0]) {
                        if (!image2) return dispatch(removeSpotImage(imageIdArr[0]))
                        else return dispatch(editSpotImage(image2, imageIdArr[0]))
                    }
                })
                .then(() => history.push(`/spots/${spotId}`))
                .catch(async res => {
                        const data = await res.json()
                        if (data && data.errors) setErrors(data.errors)
                })
            return
        } else {
            const newSpot = await dispatch(createNewSpot(spotInfo))
                .catch(async res => {
                        const data = await res.json()
                        if (data && data.errors) setErrors(data.errors)
                })

            if (image2) dispatch(generateSpotImage(image2, newSpot?.id))
            if (image3) dispatch(generateSpotImage(image3, newSpot?.id))
            if (image4) dispatch(generateSpotImage(image4, newSpot?.id))
            if (image5) dispatch(generateSpotImage(image5, newSpot?.id))
            history.push(`/spots/${newSpot.id}`)
        }


    }

    return (
        <div className='new-spot-page'>
            <h1>{(spotId && 'Update your Spot') || 'Create a new Spot'}</h1>
            <h2 className='subheader'>Where's your place located?</h2>
            <p className='new-spot-subdesc'>Guests will only get your exact address once they booked a reservation.</p>
            <form
                className='new-spot-form'
                onSubmit={onSubmit}>
                <label name='country'>Country&nbsp;&nbsp;
                    <span className='error-msg new-spot'>{errors.country && `${errors.country}`}</span>
                </label>

                <input
                    className='new-spot-input'
                    name='country'
                    value={country}
                    onChange={e => {setCountry(e.target.value)}}
                    type='text'
                    placeholder='Country' />
                <label name='address'>Street Address&nbsp;&nbsp;
                    <span className='error-msg new-spot'>{errors.address && `${errors.address}`}</span>
                </label>
                <input
                    className='new-spot-input'
                    name='address'
                    value={address}
                    onChange={e => {setAddress(e.target.value)}}
                    type='text'
                    placeholder='Street Address' />
                <div className='input-div'>
                    <div className='city-div'>
                        <label name='city'>City&nbsp;&nbsp;
                            <span className='error-msg new-spot'>{errors.city && `${errors.city}`}</span>
                        </label>
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
                        <label name='state'>State&nbsp;&nbsp;
                            <span className='error-msg new-spot'>{errors.state && `${errors.state}`}</span>
                        </label>
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
                        <label name='latitude'>Latitude&nbsp;&nbsp;
                            <span className='error-msg new-spot'>{errors.lat && `${errors.lat}`}</span>
                        </label>
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
                        <label name='longitude'>Longitude&nbsp;&nbsp;
                            <span className='error-msg new-spot'>{errors.lng && `${errors.lng}`}</span>
                        </label>
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
                    {(errors.previewImage && `${errors.previewImage}`) || <div className='gap'/>}
                </span>
                <input
                    className='new-spot-input img'
                    value={image2}
                    onChange={e => {setImage2(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.image2 && `${errors.image2}`) || <div className='gap'/>}
                </span>
                <input
                    className='new-spot-input img'
                    value={image3}
                    onChange={e => {setImage3(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.image3 && `${errors.image3}`) || <div className='gap'/>}
                </span>
                <input
                    className='new-spot-input img'
                    value={image4}
                    onChange={e => {setImage4(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.image4 && `${errors.image4}`) || <div className='gap'/>}
                </span>
                <input
                    className='new-spot-input img'
                    value={image5}
                    onChange={e => {setImage5(e.target.value)}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.image5 && `${errors.image5}`) || <div className='gap'/>}
                </span>
                <div className='new-spot-button-div'>
                    <button
                        className='form-submit'>{(spotId && 'Save Spot') || 'Create New Spot'}</button>
                </div>
            </form>
        </div>
    )
}

export default NewSpot
