import { useState } from 'react';
import { useModal } from '../../context/Modal';
import './viewImage.css'

function ViewImageModal({ imageOrder, imageList, className }) {
    const [slideIO, setSlideIO] = useState(false)
    const { setModalImage } = useModal()
    const lastIdx = imageList.length - 1

    const styleSet = num => {
        if (parseInt(imageOrder) === num) return { display: 'none' }
    }

    const handleLeft = () => {
        if (imageOrder > 0) imageOrder--
        setSlideIO(true)
        handleClick({
            lStyle: styleSet(0),
            imgSlideIn: 'slide-in-right',
            imgSlideOut: 'slide-out-right'
        })
    }

    const handleRight = () => {
        if (imageOrder < lastIdx) imageOrder++
        setSlideIO(true)
        handleClick({
            rStyle: styleSet(lastIdx),
            imgSlideIn: 'slide-in-left',
            imgSlideOut: 'slide-out-left'
        })
    }

    const handleClick = ({ lStyle, rStyle, imgSlideIn, imgSlideOut }) => {
        if (imageList[imageOrder]?.url) {
            setModalImage((
                <div className='modal-img-background'>
                    <i
                        onClick={handleLeft}
                        className="fa-solid fa-chevron-left img-arrow-button"
                        style={lStyle} />
                    <img
                        src={imageList[imageOrder]?.url}
                        alt={imageList[imageOrder]?.url}
                        className={(slideIO && `modal-img ${imgSlideOut}`)
                                    || `modal-img ${imgSlideIn}`}/>
                    <i
                        onClick={handleRight}
                        className="fa-solid fa-chevron-right img-arrow-button"
                        style={rStyle} />
                </div>
            ))
        }
    }

    return (<img
                src={imageList[imageOrder]?.url || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                alt={imageList[imageOrder]?.url || 'Image not found'}
                onClick={() => handleClick({ lStyle: styleSet(0), rStyle: styleSet(lastIdx) })}
                className={className}/>)
}

export default ViewImageModal
