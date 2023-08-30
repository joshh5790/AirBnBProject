import { useModal } from '../../context/Modal';
import './viewImage.css'

function ViewImageModal({ imageOrder, imageList, className }) {
    const { setModalImage } = useModal()

    const handleClick = ({lStyle, rStyle}) => {
        if (imageList[imageOrder]?.url) {
            setModalImage((
                <div className='modal-img-background'>
                    <i
                        onClick={() => {
                            if (imageOrder > 0) imageOrder--
                            const lStyle = parseInt(imageOrder) === 0
                                ? { display: 'none' } : {}
                            handleClick({lStyle})
                        }}
                        className="fa-solid fa-chevron-left img-arrow-button"
                        style={lStyle} />
                    <img
                        src={imageList[imageOrder]?.url}
                        alt={imageList[imageOrder]?.url}
                        className='modal-img'/>
                    <i
                        onClick={() => {
                            if (imageOrder < imageList.length - 1) imageOrder++
                            const rStyle = parseInt(imageOrder) === imageList.length - 1
                                ? { display: 'none' } : {}
                            handleClick({rStyle})
                        }}
                        className="fa-solid fa-chevron-right img-arrow-button"
                        style={rStyle} />
                </div>
            ))
        }
    }

    return (<img
                src={imageList[imageOrder]?.url || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                alt={imageList[imageOrder]?.url || 'Image not found'}
                onClick={() => {
                    const rStyle = parseInt(imageOrder) === imageList.length - 1
                        ? { display: 'none' } : {}
                    const lStyle = parseInt(imageOrder) === 0
                        ? { display: 'none' } : {}
                    handleClick({lStyle, rStyle})
                }}
                className={className}/>)
}

export default ViewImageModal
