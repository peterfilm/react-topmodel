import cn from "classnames"
import styles from "./Brands.module.scss";
import Title from "../Title/Title";
import { Zoom } from "react-awesome-reveal";
import armani from '../../../public/logos/armani.png'
import disney from '../../../public/logos/disney.png'
import gucci from '../../../public/logos/gucci.png'
import mh from '../../../public/logos/mens.png'
import obey from '../../../public/logos/obey.png'
import vogue from '../../../public/logos/vogue.png'




const Brands = () => {
    const data = [
        {name: 'Armani', img: armani},
        {name: 'Disney', img: disney},
        {name: 'Gucci', img: gucci},
        {name: 'Mens Health', img: mh},
        {name: 'Obey', img: obey},
        {name: 'Vogue', img: vogue}
    ]

    return (
        <div className={cn(styles['brands'])}>
            <Title appereance="bigwhite">Brands we work with</Title>
            <div className={cn(styles['logos'])}>
                {data.map((item, i) => <Zoom key={i} delay={i*100}><div className={cn(styles['brand__wrapper'])}><img className={cn(styles['logo'])} src={item.img} alt={item.name} /></div></Zoom>)}
            </div>
        </div>
    )
}

export default Brands