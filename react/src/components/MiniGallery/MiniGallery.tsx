import cn from "classnames"
import styles from "./MiniGallery.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../store";
import { changePhoto } from "../../features/Portfolio/portfolio-slice"

const MiniGallery = () => {
    const dispatch = useDispatch()
    const portfolio = useSelector((state:RootState) => state.portfolio)

    const [containerWidth, setContainerWidth] = useState(500)
    const photoWidth = 80
    const adjPhotoWidth = photoWidth + 20
    const totalContentWidth = portfolio.photographs.length * adjPhotoWidth;
    const excessWidth = totalContentWidth - containerWidth;

    const calculateShift = (selectedPhotoIndex: number) => {
        let shift = (containerWidth - adjPhotoWidth) / 2 - selectedPhotoIndex * adjPhotoWidth;
        shift = Math.max(-excessWidth, shift);
        shift = Math.min(0, shift)
        return shift;
    };

    return (
        <div className={cn(styles['wrapper'])} ref={el => {if (!el) return; setContainerWidth(el.getBoundingClientRect().width)}}>
            <div className={cn(styles['miniGallery'])} style={{ transform: `translateX(${calculateShift(portfolio.fromPhoto)}px)` }}>
            {portfolio.photographs.map((photo, i) => 
            <div key={i} className={cn(styles['photoThumbnail'])}>
                <img className={
                portfolio.fromPhoto === i ? cn(styles['img'], styles['selected']) : cn(styles['img'])} 
                onClick={() => dispatch(changePhoto(i))} 
                src={photo.small_img} alt={`Photography ${i}`}
                style={{width: `${photoWidth}px`, height: `${photoWidth}px`}} />
            </div>)}
        </div>
        </div>
    )
}

export default MiniGallery