import cn from "classnames"
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png' 

const Header = () => {

    const setActive = ({ isActive }: { isActive: boolean }): string =>
  isActive ? cn(styles['active-link']) : cn(styles['link']);

    return (
        <div className={cn(styles['header'])}>
            <Link to='/'><img src={logo} alt="Logo TopModel" /></Link>
            <nav>
                <ul className={cn(styles['nav_list'])}>
                    <li className={cn(styles['nav'])}><NavLink to='/' className={setActive}>Home</NavLink></li>
                    <li className={cn(styles['nav'])}><NavLink to='/about' className={setActive}>About</NavLink></li>
                    <li className={cn(styles['nav'])}><NavLink to='/models' className={setActive}>Models</NavLink></li>
                    <li className={cn(styles['nav'])}><NavLink to='/contact' className={setActive}>Contact</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header