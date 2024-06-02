import cn from "classnames"
import styles from "./NotFound.module.scss";
import notFound from '../../assets/not_found.png'

const NotFound = () => {
  return (
    <div className={cn(styles['wrapper'])}>
      <img className={cn(styles['img'])} src={notFound} alt="Not Found" />
      <h2 className={cn(styles['title'])}>Nothing found</h2>
      <p>try other configurations</p>
    </div>
  )
}

export default NotFound
