import cn from "classnames"
import styles from "./CardMain.module.scss";
import { useState } from "react";
import { ITopModel } from "../TopModels/TopModel.interface";
import { useMediaQuery } from 'react-responsive'

const CardMain = ({avatar, bust, eyes, hair, height, name, followers, shoes, size, surname, weist}: ITopModel) => {
    const [showCard, setShowCard] = useState(260)
    const [imgSize, setImgSize] = useState(100)

    const is590 = useMediaQuery({ query: '(min-width: 590px)' })

    const secretSurName = surname[0] + '.'
    const handleShowInfo = () => {
        setShowCard(0)
        setImgSize(120)
    }

    const handleHideInfo = () => {
        setShowCard(260)
        setImgSize(100)
    }

    return (
        <>
        <div className={cn(styles['card'])} onMouseOver={handleShowInfo} onMouseLeave={handleHideInfo}>
            <div style={{top: `${showCard}px`}} className={cn(styles['card-text'])}>
                <div className={cn(styles['name'])}>{name} {secretSurName}</div>
                <hr className={cn(styles['hr'])}/>
                <ul className={cn(styles['cardlist'])}>
                    <li className={cn(styles['cardlist-item'])}>Height: {height}</li>
                    <li className={cn(styles['cardlist-item'])}>Bust: {bust}</li>
                    <li className={cn(styles['cardlist-item'])}>Shoes: {shoes}</li>
                    <li className={cn(styles['cardlist-item'])}>Size: {size}</li>
                    <li className={cn(styles['cardlist-item'])}>Weist: {weist}</li>
                    <li className={cn(styles['cardlist-item'])}>Hair: {hair}</li>
                    <li className={cn(styles['cardlist-item'])}>Eyes: {eyes}</li>
                </ul>
                {is590 && <div className={cn(styles['insta'])}>
                    <div className={cn(styles['insta-icon'])}>
                        <img src="insta.png" alt="Instagram"/>
                       <div className={cn(styles['insta-count'])}>{followers}K</div>
                    </div>
                </div>}
            </div>
            <img style={{scale: `${imgSize}%`}} src={avatar} alt="Face" />
        </div>
        </>
    )
}

export default CardMain