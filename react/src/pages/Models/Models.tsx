import cn from "classnames"
import styles from "./Models.module.scss";
import Search from "../../features/Search/Search";
import ModelCard from "../../components/ModelCard/ModelCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { PREFIX } from "../../helpers/API";
import NavigationPages from "../../components/NavigationPages/NavigationPages";
import { useLocation } from "react-router-dom";
import { IModelCard } from "../../components/ModelCard/ModelCard.interface";

const Models = () => {

    const [models, setModels] = useState<IModelCard[] | null | []>([])
    const [count, setCount] = useState(0)
    const [nextPage, setNextPage] = useState<string | null>(null)
    const [previousPage, setPreviousPage] = useState<string | null>(null)
    const [pagesCount, setPagesCount] = useState(0)
    const location = useLocation()

    
    async function fetchData() {
        const response = await axios.get(
            `${PREFIX}/models/${location.search ? location.search : ''}`);
        const data = await response.data;
        setCount(data.count)
        setNextPage(data.next)
        setPreviousPage(data.previous)
        setModels(data.results)
        const pCount = Math.ceil(data.count / 10)
        setPagesCount(pCount)
      }
    
    useEffect(() => {
        fetchData()
    }, [location])

    return (
        <div className={cn(styles['models'])}>
            <Search/>
            <div className={cn(styles['cards'])}>
                {models?.map(item => <ModelCard key={item.pk} {...item}/>)}
            </div>
            {pagesCount > 1 ? <NavigationPages count = {pagesCount} nextPage={nextPage} previousPage={previousPage}/> : ''}
        </div>

    )
}

export default Models