import cn from "classnames"
import styles from "./Icon-Round.module.scss";

interface IIcon {
    img: string
    title: string
    text: string
}

const IconRound = ({img, title, text}: IIcon) => {

    return (
        <div className={cn(styles['icon'])}>
            <div className={cn(styles['icon_image'])}>
                <img src={img} alt="Accepted icon" />
            </div>
            <div className={cn(styles['icon_text'])}>
                <div className={cn(styles['icon_title'])}>{title}</div>
                <div className={cn(styles['icon_description'])}>{text}</div>
            </div>
        </div>
    )
}

export default IconRound