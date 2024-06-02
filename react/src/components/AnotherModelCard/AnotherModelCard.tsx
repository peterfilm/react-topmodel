import cn from "classnames"
import styles from "./AnotherModelCard.module.scss";
import Button from "../Button/Button";
import { useState, useRef, useEffect } from "react";
import { IAnotherModel } from "../AnotherModels/AnotherModels.interface";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

const AnotherModelCard = ({pk,name, surname, city, price_hour, price_day, photographs}: IAnotherModel) => {

    const imgRef = useRef<HTMLDivElement>(null)
    const [counter, setCounter] = useState(0)
    const is1200 = useMediaQuery({ query: '(max-width: 1200px)' })
    const is992 = useMediaQuery({ query: '(max-width: 992px)' })
    const is576 = useMediaQuery({ query: '(max-width: 576px)' })
    const [pos, setPos] = useState(0)
    const [index, setIndex] = useState(0)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    const imgShift = is576? 250 :
    is992 ? 200 :
    is1200 ? 250 : 312
    const [shiftImg, setShiftImg] = useState(imgShift)
    
    const dopImgShift = is576? 62 :
    is992 ? 112 :
    is1200 ? 62 : 0
    const [dopShiftImg, setDopShiftImg] = useState(dopImgShift)
    
    useEffect(() => {
        setPos(0)
        setCounter(0)
        setIndex(0)
    }, [name])


    useEffect(() => {
        setShiftImg(imgShift)
        setDopShiftImg(dopImgShift)
        
    }, [screenWidth, is1200, is992, is576, pos, dopImgShift, imgShift])
    

    const handlePhoto = (arg:string) => {
        if (arg === 'right') {
            if (counter < 3) {
                setPos(pos - shiftImg - dopShiftImg)
                setIndex(index => index + 1)

                setCounter((prevCounter) => prevCounter + 1)
            }
            
        } else {
            if (counter !== 0) {
                setPos(pos + shiftImg  + dopShiftImg)
                setIndex(index => index - 1)
                setCounter((prevCounter) => prevCounter - 1)
            }
        }
    }

    return (
        <div className={cn(styles['anotherModelCard'])}>
            <div className={cn(styles['anotherModelCard__wrapper'])}>
                <div className={cn(styles['anotherModelCard__collection'])}>
                <div style={counter === 0 ? {display: 'none'} : {display: 'block'}} className={cn(styles['anotherModelCard__arrow__left'])} onClick={() => handlePhoto('left')}>&lsaquo;</div>
                    <div ref={imgRef} style={{left: pos + (dopShiftImg * index)}} className={cn(styles['anotherModelCard__slider'])}>{photographs.map((img, index) => <img key={index} src={img.small_img} alt={`Portfolio of ${name} ${surname}`}  className={cn(styles['anotherModelCard__img'])} />)}</div>
                <div style={counter === 3 ? {display: 'none'} : {display: 'block'}}  className={cn(styles['anotherModelCard__arrow__right'])} onClick={() => handlePhoto('right')}>&rsaquo;</div>
                </div>
                </div>
            <div className={cn(styles['anotherModelCard__title'])}>{name} {surname[0]}.</div>
            <div className={cn(styles['anotherModelCard__city'])}>{city}</div>

            <div className={cn(styles['anotherModelCard__price'])}>
                <div className={cn(styles['anotherModelCard__per'])}>
                    <span>{price_hour} $</span><br/>
                    Per Hour
                </div>
                <div className={cn(styles['anotherModelCard__per'])}>
                <span>{price_day} $</span><br/>
                    Per Day
                </div>
                
            </div>
           <Link to={`../models/${pk}`}><Button className={cn(styles['anotherModelCard__btn'])} appereance="middleWhite">See Model</Button></Link>
        </div>
    )
}

export default AnotherModelCard