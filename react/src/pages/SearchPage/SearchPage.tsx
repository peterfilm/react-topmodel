import cn from "classnames"
import styles from "./SearchPage.module.scss";
import Search from "../../features/Search/Search";
import ModelCard from "../../components/ModelCard/ModelCard";
import NavigationPages from "../../components/NavigationPages/NavigationPages";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { Helmet } from 'react-helmet';
import NotFound from "../../components/NotFound/NotFound";

const SearchPage = () => {
    const models = useSelector((state: RootState) => state.search.entities)
    const count = useSelector((state: RootState) => state.search.count)
    const nextPage = useSelector((state: RootState) => state.search.next)
    const previousPage = useSelector((state: RootState) => state.search.previous)
    const loading = useSelector((state: RootState) => state.search.loading)
    const error = useSelector((state: RootState) => state.search.error)
    const pagesCount = Math.ceil(count / 2)

    return (
        <div className={cn(styles['searchPage'])}>
            <Helmet>
            <meta
                name="description"
                content={`TOP MODEL - ALL MODELS`}
                />
            <title>TOP MODEL - ALL MODELS</title>
            </Helmet>
            <Search/>
            {loading === 'loading' ? <Loading/>: '' }
            {error && <Error>{error}</Error>}
            {models.length == 0 && <NotFound/>}
            <div className={cn(styles['cards'])}>
                {models?.map(item => <ModelCard key={item.pk} {...item}/>)}
            </div>
            {pagesCount > 1 ? <NavigationPages count = {pagesCount} nextPage={nextPage} previousPage={previousPage}/> : ''}
        </div>

    )
}

export default SearchPage