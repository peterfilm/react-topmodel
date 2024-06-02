import cn from "classnames"
import styles from "./Loading.module.scss";
import loading from '../../assets/loading.gif'

const Loading = () => {
    return (
        <div className={cn(styles['loading'])}><img className={cn(styles['loading-img'])} src={loading} alt="Loading..." /></div>
    )
}

export default Loading