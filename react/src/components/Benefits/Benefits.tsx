import cn from "classnames"
import styles from "./Benefits.module.scss";
import Title from "../Title/Title";
import IconRound from "../Icon-Round/Icon-Round";
import { Fade } from "react-awesome-reveal";

const Benefits = () => {

    return (
        <div className={cn(styles['benefits'])}>
            <Title>Benefits</Title>
            <div className={cn(styles['card_table'])}>
                <Fade direction="up" triggerOnce><IconRound 
                img='search_icon.png'  
                title='finding agency'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>

                <Fade direction="up" triggerOnce><IconRound 
                img='model_icon.png'  
                title='TYPES OF MODELING'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>

                <Fade direction="up" triggerOnce><IconRound 
                img='freelance_icon.png'  
                title='search models'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>

                <Fade direction="up" triggerOnce><IconRound 
                img='accepted_icon.png'  
                title='finding agency'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>
            </div>
        </div>
    )
}

export default Benefits