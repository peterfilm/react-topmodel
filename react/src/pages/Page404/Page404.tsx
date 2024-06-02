import cn from "classnames"
import styles from "./Page404.module.scss";
import error from '../../assets/error.png'
import { Link } from "react-router-dom";


const Page404 = () => {
  return (
    <div className={cn(styles['wrapper'])}>
        <img className={cn(styles['img'])} src={error} alt="Error 404" />
      <div className={cn(styles['texts'])}>
        <h2 className={cn(styles['title'])}>OH NO...</h2>
        <p className={cn(styles['sorry'])}>Sorry, but the page does not exist</p>
        <Link className={cn(styles['link'])} to={'/'}>Try from start page</Link>
        </div>
    </div>
  )
}

export default Page404
