import cn from "classnames"
import styles from "./Brands.module.scss";
import Title from "../Title/Title";
import { Zoom } from "react-awesome-reveal";

const Brands = () => {
    const data = [
        {name: 'Armani', img: 'logos/armani.png'},
        {name: 'Disney', img: 'logos/disney.png'},
        {name: 'Gucci', img: 'logos/gucci.png'},
        {name: 'Mens Health', img: 'logos/mens.png'},
        {name: 'Obey', img: 'logos/obey.png'},
        {name: 'Vogue', img: 'logos/vogue.png'}
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