import cn from "classnames"
import styles from "./ModelCard.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { IModelCard} from "./ModelCard.interface";
import { useDispatch} from "react-redux";
import { showPortfolio } from "../../features/Portfolio/portfolio-slice";
import { useState } from "react";
import { showBookModel } from "../../features/BookModel/book-slice";
import { IPhoto } from "../../helpers/Api.interface";
import { useMediaQuery } from 'react-responsive'


const ModelCard = ({avatar, name, surname, city, price_hour, price_day, pk, photographs, gender}:IModelCard) => {

    const dispatch = useDispatch()

    const showBook = () => {
        dispatch(showBookModel({name, surname, gender, pk, avatar, show: true}))
    }
    const is1440 = useMediaQuery({ query: '(max-width: 1440px)' })
    const is1200 = useMediaQuery({ query: '(max-width: 1200px)' })
    const is992 = useMediaQuery({ query: '(max-width: 992px)' })
    const is768 = useMediaQuery({ query: '(max-width: 768px)' })
    const is576 = useMediaQuery({ query: '(max-width: 576px)' })
    const is420 = useMediaQuery({ query: '(max-width: 420px)' })
    const countOfPhotos = is420 ? 0 :
                        is576 ? 1 :
                        is768 ? 2 :
                        is992 ? 3 :
                        is1200 ? 4 :
                        is1440 ? 5 : 5

    const secretSurName = surname[0] + '.'
    return (
        <div className={cn(styles['modelCard'])}>
            <div className={cn(styles['modelCard__wrapper'])}>
                <div className={cn(styles['info__wrapper'])}><div className={cn(styles['modelCard__info'])}>
                    <Link to={`/models/${pk}`}><img src={avatar} alt="Model" className={cn(styles['modelCard__img'])}  /></Link>
                    <div className={cn(styles['modelCard__name'])}>{name} {secretSurName}</div>
                    <div className={cn(styles['modelCard__city'])}>{city}</div>
                    {!is1440 &&<div className={cn(styles['modelCard__price'])}>
                        <div className={cn(styles['modelCard__per'])}>
                            <span>{price_hour} $</span><br/>
                            Per Hour
                        </div>
                        <div className={cn(styles['modelCard__per'])}>
                        <span>{price_day} $</span><br/>
                            Per Day
                        </div>
                    </div>}
                        <div className={cn(styles['buttons__container'])}>
                            <Link to={`/models/${pk}`}><Button appereance="smallWhite">See portfolio</Button></Link>
                            <Button appereance="smallBeige" onClick={showBook}>Book model</Button>
                        </div>
                </div></div>
                <div className={cn(styles['modelCard__photos'])}>
                    {photographs.slice(0,countOfPhotos).map((item, i) => <OnePhoto key={item.pk} 
                                                item={item}
                                                i = {i}
                                                name={name}
                                                surname={surname}
                                                gender={gender}
                                                pk={pk}
                                                photographs={photographs}/>)}
                </div>
            </div>
        </div>
    )
}

export default ModelCard



interface IOnePhoto {
    item: IPhoto
    i: number
    name: string
    surname: string
    pk: number
    photographs: IPhoto[]
    gender: "MALE" | "FEMALE"
}


export const OnePhoto = ({item, i, name, surname, pk, photographs, gender}: IOnePhoto) => {
    const [onImg, setOnImg] = useState(false);

    const dispatch = useDispatch()

    const showPhotos = (i: number) => {
        dispatch(showPortfolio({name, surname, pk, photographs, fromPhoto:i, show: true, gender, thumbnails:false}))
    }

    const imgChangeOn = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target) {
          setOnImg(true);
        }
      };
    
      const imgChangeOff = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target) {
          setOnImg(false);
        }
      };
    return (
        <div 
        className={cn(styles['onePhoto'])}
        onMouseOver={(e) => imgChangeOn(e)}
        onMouseLeave={(e) => imgChangeOff(e)}
        onClick={() => showPhotos(i)}>
        <div className={cn(styles['overlay'])} style={onImg ? {opacity: '0.5'} : {opacity: '0'}}></div>
        <img src={item.small_img} className={cn(styles['modelCard__photo'])} alt={`${name} ${surname}`} />
        <h3 className={cn(styles['quickPreview'])} style={onImg ? {opacity:1, fontSize: '18px'} : {opacity:0, fontSize: '14px'}}>Quick Preview</h3>
      </div>
    )
}