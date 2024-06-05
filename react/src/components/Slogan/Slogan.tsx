import cn from "classnames"
import styles from "./Slogan.module.scss";
import { Fade } from "react-awesome-reveal";
import { useMediaQuery } from 'react-responsive'
import girl from '../../../public/girl_main.png'

const Slogan = () => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 426px)' })

    return (
        <div className={cn(styles['slogan'])}>
            {!isSmallScreen &&<Fade><div className={cn(styles['girl'])}><img src={girl} alt="Girl" /></div></Fade>}
            <div className={cn(styles['texts'])}>
                <div className={cn(styles['texts__main'])}>
                Connect with models and clients from all over the world!
                </div>
                <div className={cn(styles['texts__secondary'])}>
                We are an international online model portal that connects you directly with different models and successful industry professionals!
                </div>
            </div>
        </div>
    )
}

export default Slogan