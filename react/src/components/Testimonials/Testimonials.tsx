import cn from "classnames"
import styles from "./Testimonials.module.scss";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import Title from "../Title/Title";
import { useState, useEffect } from "react";
import { ITestimonial } from "../../helpers/Api.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { Fade } from "react-awesome-reveal";
import { useMediaQuery } from 'react-responsive'
import Error from "../Error/Error";
import Loading from "../Loading/Loading";



const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<ITestimonial[]>([])
    const isMobileScreen = useMediaQuery({ query: '(min-width: 768px)' })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        try {
            const response = await axios.get(
                `${PREFIX}/testimonials/`);
            const data = await response.data;
            setTestimonials(data)
            setLoading(false)
        } catch(err) {
            setError(true)
            setLoading(false)
        }
      }
    
    useEffect(() => {
        fetchData()
    }, [])


    //pages
    const [selected, setSelected] = useState(1)
    const leftPage = (selected - 1) % testimonials.length >= 0 ? selected - 1 : testimonials.length - 1
    const rightPage = (selected + 1) % testimonials.length > selected ? selected + 1 : 0

    const clicker = (page:number) => {
        setSelected(page)
    }

    return (
        <div className={cn(styles['testimonials_wrapper'])}>
            {loading && <Loading/>}
            {!error && isMobileScreen && <div className={cn(styles['gradient-left'])}></div> }
            <Title>Testimonials</Title>
            {!error ? 
            <div>
            <div className={cn(styles['testimonials'])}>                
                {isMobileScreen && <Fade direction="up" triggerOnce><TestimonialCard {...testimonials[leftPage]} clicker={clicker} /></Fade>}
                <Fade direction="up" delay={200} triggerOnce><TestimonialCard {...testimonials[selected]} clicker={clicker}  /></Fade>
                {isMobileScreen && <Fade direction="up" delay={400} triggerOnce><TestimonialCard {...testimonials[rightPage]} clicker={clicker}  /></Fade>}
            </div>
            <div className={cn(styles['testimonials_pages'])}>
                {testimonials.map(page => <div key={page.id} className={selected === page.id - 1 ? cn(styles['page-selected']) : cn(styles['page'])} onClick={() => clicker(page.id - 1)}></div>)}
            </div>
            {isMobileScreen && <div className={cn(styles['gradient-right'])}></div>}
            </div>
            : <Error>Can't fetch data. Please, Try later</Error> }
        </div>
    )
}

export default Testimonials