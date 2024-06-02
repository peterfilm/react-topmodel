import cn from "classnames"
import styles from "./Slogan.module.scss";
import { Fade } from "react-awesome-reveal";
import { useMediaQuery } from 'react-responsive'

const Slogan = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 425px)' })

    return (
        <div className={cn(styles['slogan'])}>
            {!isSmallScreen &&<Fade><img src="girl_main.png" alt="Girl" className={cn(styles['girl'])} /></Fade>}
            <div className={cn(styles['texts'])}>
                <Fade direction="up"><div className={cn(styles['texts__main'])}>
                Connect with models and clients from all over the world!
                </div></Fade>
                <Fade direction="up" delay={300}><div className={cn(styles['texts__secondary'])}>
                We are an international online model portal that connects you directly with different models and successful industry professionals!
                </div></Fade>
            </div>
        </div>
    )
}

export default Slogan