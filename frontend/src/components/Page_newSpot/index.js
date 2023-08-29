import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './newSpot.css'
import { createNewSpot, modifySpot, retrieveSpotDetails } from '../../store/spots'
import { generateSpotImage, editSpotImage, removeSpotImage, deleteSpotImage } from '../../store/spotImages'

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
    const [images, setImages] = useState({ 0: '', 1: '', 2: '', 3: ''});
    const [submitStatus, setSubmitStatus] = useState(false)
    const [errors, setErrors] = useState({})
    const [imageArr, setImageArr] = useState([])

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
                    setImages({
                        0: data.SpotImages[0]?.url || '',
                        1: data.SpotImages[1]?.url || '',
                        2: data.SpotImages[2]?.url || '',
                        3: data.SpotImages[3]?.url || '',
                    })
                    setImageArr([...data.SpotImages])
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
            setImages({ 0: '', 1: '', 2: '', 3: ''})
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
        else if (latitude > 90 || latitude < -90) spotErrors.lat = 'Invalid latitude';
        if (!longitude) spotErrors.lng = 'Longitude is required';
        else if (longitude > 180 || longitude < -180) spotErrors.lng = 'Invalid longitude';
        if (!description || description.length < 30) {
            spotErrors.description = 'Description needs a minimum of 30 characters';
        }
        if (!title) spotErrors.name = 'Name is required';
        if (title.length > 50) spotErrors.name = 'Name must be less than 50 characters'
        if (!price) spotErrors.price = 'Price is required';
        validateImg(previewImage, 'previewImage', spotErrors)
        if (!previewImage) spotErrors.previewImage = 'Preview Image is required';
        validateImg(images[0], 'image2', spotErrors)
        validateImg(images[1], 'image3', spotErrors)
        validateImg(images[2], 'image4', spotErrors)
        validateImg(images[3], 'image5', spotErrors)
        return spotErrors
    }

    useEffect(() => {
        if (submitStatus) setErrors(validateSpot())
    }, [country, address, city,
        state, latitude, longitude,
        description, title, price,
        previewImage, images, submitStatus])

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
                .then(async () => {
                    let count = 0
                    for (let i in images) {
                        if (images[i].length) { // if text is in input
                            console.log(imageArr, 'ADD ADD ADD')
                            if (imageArr[count]) { // if old image data was passed in
                                if (imageArr[count].url !== images[i]) await dispatch(editSpotImage(images[i], imageArr[count].id))
                                count++
                            }
                            else await dispatch(generateSpotImage(images[i], spotId))
                        }
                        else if (imageArr[count]) { // if old data was passed in and no text in input
                            await dispatch(removeSpotImage(imageArr[count].id)) // delete image from backend
                            count++
                        }
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

            for (const image in images) {
                if (images[image].length) dispatch(generateSpotImage(image, newSpot?.id))
            }

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
                    value={images[0]}
                    onChange={e => {setImages(prev => {
                        return { ...prev, 0: e.target.value }
                    })}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.image2 && `${errors.image2}`) || <div className='gap'/>}
                </span>
                <input
                    className='new-spot-input img'
                    value={images[1]}
                    onChange={e => {setImages(prev => {
                        return { ...prev, 1: e.target.value }
                    })}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.image3 && `${errors.image3}`) || <div className='gap'/>}
                </span>
                <input
                    className='new-spot-input img'
                    value={images[2]}
                    onChange={e => {setImages(prev => {
                        return { ...prev, 2: e.target.value }
                    })}}
                    type='text'
                    placeholder='Image URL' />
                <span className='error-msg new-spot'>
                    {(errors.image4 && `${errors.image4}`) || <div className='gap'/>}
                </span>
                <input
                    className='new-spot-input img'
                    value={images[3]}
                    onChange={e => {setImages(prev => {
                        return { ...prev, 3: e.target.value }
                    })}}
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
