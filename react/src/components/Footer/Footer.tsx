import cn from "classnames"
import styles from "./Footer.module.scss";
import { NavLink, Link } from "react-router-dom";
import logo from '../../assets/logo.png' 
import { searchModels, changeGender, showModels } from "../../features/Search/search-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

const Footer = () => {
    const setActive = ({ isActive }: { isActive: boolean }): string =>
  isActive ? cn(styles['active-link']) : cn(styles['link']);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const isMiddleScreen = useMediaQuery({ query: '(max-width: 992px)' })
    const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' })

    const goGender = (value:string) => {
        dispatch(showModels())
        dispatch(changeGender(value))
        dispatch(searchModels(''))
        navigate(`/models/?gender=${value}`)
    }

    return (
        <>
        <div className={cn(styles['footer'])}>
            {!isMobileScreen && <div className={cn(styles['topmodel'])}><img src={logo} alt="Logo" /></div>}
            <div className={cn(styles['forWidth'])}>
                <nav>
                    <ul className={cn(styles['nav_list'])}>
                        <li className={cn(styles['nav'])}><NavLink to='/' className={setActive}>Home</NavLink></li>
                        <li className={cn(styles['nav'])}><NavLink to='/about' className={setActive}>About</NavLink></li>
                        <li className={cn(styles['nav'])}><NavLink to='/models' className={setActive}>Models</NavLink></li>
                        <li className={cn(styles['nav'])}><NavLink to='/contact' className={setActive}>Contact</NavLink></li>
                    </ul>
                </nav>
            </div>
            {!isMiddleScreen && <div className={cn(styles['all_nav'])}>
                <div className={cn(location.search.includes('gender=FEMALE') ? styles['active-link'] : styles['link'])} style={{cursor:'pointer'}} onClick={() => goGender('FEMALE')} >Female Models</div>
                <div className={cn(location.search.includes('gender=MALE') ? styles['active-link'] : styles['link'])} style={{cursor:'pointer'}} onClick={() => goGender('MALE')} >Male Models</div>
            </div>}
            {!isMobileScreen && <div className={cn(styles['all_nav'])}>
                <a className={cn(styles['link'])} href="#">Instagram</a>
                <a className={cn(styles['link'])} href="#">Facebook</a>
                <a className={cn(styles['link'])} href="#">Pinterest</a>
                <a className={cn(styles['link'])} href="#">VK</a>
            </div>}
        </div>
            {!isMobileScreen && <div className={cn(styles['copyright'])}>Copyright <Link className={cn(styles['link'])} to={'https://github.com/peterfilm'} target="_blank">Peterfilm</Link> {new Date().getFullYear()}</div>}
            </>
    )
}

export default Footer