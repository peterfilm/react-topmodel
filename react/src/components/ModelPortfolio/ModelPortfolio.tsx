import cn from "classnames"
import styles from "./ModelPortfolio.module.scss";
import Title from "../Title/Title";
import { IPhotoGallery } from "./ModelPortfolio.interface";
import {  useDispatch } from "react-redux";
import { showPortfolio } from "../../features/Portfolio/portfolio-slice";

const ModelPortfolio = ({photographs, name, surname, bio, pk, gender}: IPhotoGallery) => {
    const dispatch = useDispatch()

    const showPhotos = (i: number) => {
        dispatch(showPortfolio({name, surname, pk, photographs, fromPhoto:i, show: true, gender, thumbnails:false}))
    }

    return (
        <div className={cn(styles['portfolio'])}>
            <Title>Model Portfolio</Title>
            <div className={cn(styles['about'])}>{bio}</div>

            <div className={cn(styles['gallery'])}>
                {photographs.map((photo, i) => <img key={photo.pk} src={photo.small_img} alt={`Photo of ${name} ${surname}`} className={cn(styles['gallery__photo'])} onClick = {() => showPhotos(i)}  />)}
            </div>
        </div>
    )
}

export default ModelPortfolio