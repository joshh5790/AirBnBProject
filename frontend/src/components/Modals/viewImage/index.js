import { useModal } from '../../../context/Modal';
import './viewImage.css'

function ViewImageModal({ imageOrder, imageList, className }) {
    const { setModalImage } = useModal()
    const lastIdx = imageList.length - 1

    const styleSet = num => {
        if (parseInt(imageOrder) === num) return { display: 'none' }
    }

    const handleLeft = () => {
        if (imageOrder > 0) imageOrder--
        handleClick({ lStyle: styleSet(0) })
    }

    const handleRight = () => {
        if (imageOrder < lastIdx) imageOrder++
        handleClick({ rStyle: styleSet(lastIdx) })
    }

    const handleClick = ({ lStyle = {}, rStyle = {} }) => {
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
                        className='modal-img'/>
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
