import cn from "classnames"
import styles from "./TopModels.module.scss";
import Title from "../Title/Title";
import CardMain from "../CardMain/CardMain";
import { useEffect, useState } from "react";
import { PREFIX } from "../../helpers/API";
import axios from "axios";
import { ITopModel } from "./TopModel.interface";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { useMediaQuery } from 'react-responsive'
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const TopModels = () => {
    const [topModels, setTopModels] = useState<ITopModel[] | null | []>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const is1382 = useMediaQuery({ query: '(max-width: 1382px)' })
    const is1117 = useMediaQuery({ query: '(max-width: 1117px)' })
    const is860 = useMediaQuery({ query: '(max-width: 860px)' })

    const countPhotos = is860 ? 6 :
                        is1117 ? 9 :
                        is1382 ? 8 :
                        10
    
    async function fetchData() {
        try {
            const response = await axios.get(
                `${PREFIX}/models/mainpage/`);
            const data = await response.data;
            setTopModels(data)
            setLoading(false)
        } catch(err) {
            setError(true)
            setLoading(false)
        }
      }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={cn(styles['topmodels'])}>
            <Title>Top Models</Title>
            {loading && <Loading/>}
            {!error ?
            <div className={cn(styles['card_table'])}>
            {topModels?.slice(0, countPhotos).map((model, j) => <Link key={model.pk} to={`/models/${model.pk}`}><Fade direction="up" delay={j * 50} triggerOnce><CardMain key={model.pk} {...model}/></Fade></Link>)}
            </div> :
            <Error>Can't fetch data. Please, Try later</Error> }
        </div>
    )
}

export default TopModels