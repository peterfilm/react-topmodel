import cn from "classnames"
import styles from "./Benefits.module.scss";
import Title from "../Title/Title";
import IconRound from "../Icon-Round/Icon-Round";
import { Fade } from "react-awesome-reveal";
import benefits from '../../../public/search_icon.png'
import modelicon from '../../../public/model_icon.png'
import freelance from '../../../public/freelance_icon.png'
import accepted from '../../../public/accepted_icon.png'

const Benefits = () => {

    return (
        <div className={cn(styles['benefits'])}>
            <Title>Benefits</Title>
            <div className={cn(styles['card_table'])}>
                <Fade direction="up" triggerOnce><IconRound 
                img={benefits}  
                title='finding agency'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>

                <Fade direction="up" triggerOnce><IconRound 
                img={modelicon}  
                title='TYPES OF MODELING'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>

                <Fade direction="up" triggerOnce><IconRound 
                img={freelance}  
                title='search models'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>

                <Fade direction="up" triggerOnce><IconRound 
                img={accepted}  
                title='finding agency'
                text='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                /></Fade>
            </div>
        </div>
    )
}

export default Benefits