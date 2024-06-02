import cn from "classnames"
import styles from "./ModelHeader.module.scss";
import Button from "../Button/Button";
import { showBookModel } from "../../features/BookModel/book-slice";
import { IModelHeader } from "./ModelHeader.interface";
import { useDispatch } from "react-redux";

const ModelHeader = ({pk, name, surname, avatar, gender, city, price_day, price_hour, height, bust, weist, hips, shoes, hair, eyes}: IModelHeader) => {

    const dispatch = useDispatch()

    const showBook = () => {
        dispatch(showBookModel({name, surname, gender, pk, avatar, show: true}))
    }

    return (
        <div className={cn(styles['modelHeader'])}>
            <div className={cn(styles['modelInfo'])}>
                <div className={cn(styles['modelInfo__left'])}>
                    <div className={cn(styles['modelInfo__img'])}>
                        <img src={avatar} alt={`${name} ${surname[0]}.`} />
                    </div>
                    <div className={cn(styles['modelInfo__description'])}>
                        <h2>{name} {surname[0]}.</h2>
                        {city}
                        <div className={cn(styles['modelInfo__btn'])}><Button appereance="blackMiddle" onClick={showBook}>Book a model</Button></div>
                    </div>
                </div>
                <div className={cn(styles['modelInfo__right'])}>
                    <div className={cn(styles['modelInfo__per'])}> <span>{price_hour} $</span> Per hour </div>
                    <div className={cn(styles['modelInfo__per'])}><span>{price_day} $</span> Per day </div>
                </div>
            </div>
            <hr className={cn(styles['hr'])} />
            <div className={cn(styles['parameters'])}>
                <div className={cn(styles['parameters__info'])}>
                    <span>{gender && gender[0]}</span><br/> Gender
                </div>
                <div className={cn(styles['parameters__info'])}>
                    <span>{height}</span><br/> Height
                </div>
                <div className={cn(styles['parameters__info'])}>
                    <span>{bust}</span><br/> Bust
                </div>
                <div className={cn(styles['parameters__info'])}>
                    <span>{weist}</span><br/> Weist
                </div>
                <div className={cn(styles['parameters__info'])}>
                    <span>{hips}</span><br/> Hips
                </div>
                <div className={cn(styles['parameters__info'])}>
                    <span>{shoes}</span><br/> Shoes
                </div>
                <div className={cn(styles['parameters__info'])}>
                    <span>{hair}</span><br/> Hair
                </div>
                <div className={cn(styles['parameters__info'])}>
                    <span>{eyes}</span><br/> Eyes
                </div>
            </div>
        </div>
    )
}

export default ModelHeader