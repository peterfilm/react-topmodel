import cn from "classnames"
import styles from "./AnotherModels.module.scss";
import Title from "../Title/Title";
import AnotherModelCard from "../AnotherModelCard/AnotherModelCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { IAnotherModel } from "./AnotherModels.interface";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

const AnotherModels = () => {
    const [cards, setCards] = useState<IAnotherModel[]>([])
    const location = useLocation()
    const excludeModel = location.pathname.slice(8)
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isSmallMobile = useMediaQuery({ query: '(max-width: 576px)' })

    const allPhotos = isSmallMobile ? 3 : isMobile ? 6 : 9
    const countPhotos = isSmallMobile ? 1 : isMobile ? 2 : 3

    async function fetchData() {
        const response = await axios.get(
            `${PREFIX}/models/another/${excludeModel}`);
        const data = await response.data;
        setCards(data)
      }
    
    useEffect(() => {
        fetchData()
    }, [location])

    const [page, setPage] = useState(0)
    const pageList = page === 0 ? 0 : page

    const handlePage = (value:number) => {
        setPage(value)
    }

    return (
        <div className={cn(styles['anotherModels'])}>
            <Title>Another Models</Title>
            <div className={cn(styles['anotherModels__wrapper'])}>
            </div>
            <div className={cn(styles['anotherModels__cards'])}>
                {cards.slice(pageList * countPhotos, (pageList * countPhotos) + countPhotos).map((card, index) => <AnotherModelCard key={index} {...card}/>)}
            </div>

            <div className={cn(styles['anotherModels__pages'])}>
                {cards.slice(0, allPhotos).map((_, index) => index % countPhotos === 0 ? <div key={index / countPhotos} onClick={() => handlePage(index / countPhotos)} className={index / countPhotos === page ? cn(styles['page-selected']) : cn(styles['page'])}></div> : '')}
            </div>
            

        </div>
    )
}

export default AnotherModels