import cn from "classnames"
import styles from "./UpperIcon.module.scss";

const UpperIcon = () => {
    const handleUp = () => {
        window.scrollTo(0,0)
    }

    return (
        <div className={cn(styles['upperIcon'])} onClick={handleUp}>
            &#9650;
        </div>
    )
}

export default UpperIcon