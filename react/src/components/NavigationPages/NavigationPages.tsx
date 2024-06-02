import cn from "classnames"
import { useLocation } from "react-router-dom"
import ButtonPages from "../ButtonPages/ButtonPages"
import styles from "./NavigationPages.module.scss";
import { Link } from "react-router-dom";

interface INavPages {
    previousPage: string | null
    nextPage: string | null
    count: number
}

function numberRange (start: number, end: number) {
    return new Array(end - start).fill(0).map((_, i) => i + start);
  }

const NavigationPages = ({ previousPage, nextPage, count }: INavPages) => {
    const searchParams = new URLSearchParams(window.location.search);
    const location = useLocation()
    const nextLink = nextPage ? '?' + nextPage.split('?')[1]: ''
    const prevLink = previousPage ? previousPage.includes("?") ?
                                 '?' + previousPage.split('?')[1]
                                 : '?page=1'
                                 : ''
    const pageNow = +location.search?.split('page=')[1] || 1
    const leftPages = pageNow - 3 > 0 ? pageNow - 3 : 0
    const rightPages = pageNow + 3 <= count ? pageNow + 3 : count
    return (
        <div className={cn(styles['pages'])}>
            
            {previousPage && (
                <Link to={prevLink}>
                    <ButtonPages appereance='prev'>&#9204;</ButtonPages>
                </Link>
            )}
            {count &&
                [...numberRange(leftPages, rightPages)].map(i => {
                    const page = i + 1;
                    searchParams.set('page', String(page));
                    const queryString = searchParams.toString();
                    const link = `${location.pathname}${queryString ? `?${queryString}` : ''}`;
                    return link.includes(location.search) && location.search.includes('page') && location.search !== '' || (!location.search.includes('page') && i === 0)?
                        <div className={cn(styles['active'])} key={i+1}>{i + 1}</div>
                        : <Link key={i+1} to={link}><ButtonPages>{i + 1}</ButtonPages></Link>
                })}
            {nextPage && (
                <Link className={cn(styles['pages__next'])} to={nextLink}>
                    <ButtonPages appereance='next'>&#9205;</ButtonPages>
                </Link>
            )}
        </div>
    );
};

export default NavigationPages;