import { useModal } from '../../context/Modal';
import './viewImage.css'

function ViewImageModal({ url, className }) {
    const { setModalImage } = useModal()

    const onClick = () => {
        if (url) {
            setModalImage((
                <div className='modal-img-background'>
                    <img
                        src={url}
                        alt={url}
                        className='modal-img'/>
                </div>
            ))
        }
    }

    return (<img
                src={url || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}
                alt={url || 'Image not found'}
                onClick={onClick}
                className={className}/>)
}

export default ViewImageModal
