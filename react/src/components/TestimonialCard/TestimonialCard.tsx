import cn from "classnames"
import styles from "./TestimonialCard.module.scss";
import { ITestimonialClick } from "./TestimonialCard.interface";

const TestimonialCard: React.FC<ITestimonialClick> = ({id, avatar, name, text, position, clicker}) => {
    return (
        <div className={cn(styles['testimonialCard'])} onClick={() =>clicker(id - 1)}>
            <div className={cn(styles['testimonialImg'])}>
                <img className={cn(styles['img'])} src={avatar} alt={name} />
            </div>
            <div className={cn(styles['text'])}>
            {text}
            </div>
            <div className={cn(styles['name'])}><span>{name}</span><br/>{position}</div>
        </div>
    )
}

export default TestimonialCard