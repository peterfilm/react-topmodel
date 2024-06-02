import cn from "classnames"
import styles from "./Digitstab.module.scss";
import { Zoom, Fade } from "react-awesome-reveal";
import AnimateNumbers from "./AnimateNumbers";

const DigitsTab = () => {
    
    const data = [
        {digit: 1000, title: 'models'},
        {digit: 100, title: 'agencies'},
        {digit: 40, title: 'awards'},
        {digit: 25, title: 'events'},
    ]

    return (
        <div className={cn(styles['digits'])}>
            {data.map((item, i) => <div key={i} className={cn(styles['digits__wrapper'])}>
                <Zoom triggerOnce duration={3000}><div className={cn(styles['digits__number'])}><AnimateNumbers>{item.digit}</AnimateNumbers></div></Zoom>
                <Fade triggerOnce><div className={cn(styles['digits__title'])}>{item.title}</div></Fade>
            </div>)}
            
        </div>
    )
}

export default DigitsTab