import cn from "classnames"
import styles from "./HeaderCover.module.scss";
import Button from "../Button/Button";
import mainImg from '../../assets/main_photo.jpg'
import { Link } from "react-router-dom";


const HeaderCover = () => {

    return (
        <div className={cn(styles['cover'])} style={{'background': `url(${mainImg}) center center / cover no-repeat`}}>
            <div className={cn(styles['left'])}>
                <div className={cn(styles['start_booking'])}>
                    <Link to='/models'><Button appereance="main">Start booking</Button></Link>
                </div>
            </div>
            <div className={cn(styles['right'])}><h1 className={cn(styles['slogan'])}>find and book top talent and creatives all in one place</h1></div>
        </div>
    )
}

export default HeaderCover