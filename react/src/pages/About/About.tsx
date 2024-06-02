import styles from "./About.module.scss";
import aboutModels from '../../assets/models_about.jpg'
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <div className={styles['wrapper']}>
        <Helmet>
        <meta
            name="description"
            content={`TOPMODEL - About us`}
            />
        <title>TOPMODEL - About us</title>
        </Helmet>
        <img className={styles['models']} src={aboutModels} alt="Models" />
        <h2 className={styles['title']}>About us</h2>
        <p className={styles['text']}>Welcome to <span>TOPMODEL</span>, the ultimate destination for hiring professional models for your photo and video projects. Whether you're a photographer, filmmaker, advertising agency, or brand, we provide an extensive selection of talented models to suit any creative vision. Our platform connects you with models who possess the experience, versatility, and professionalism needed to elevate your projects to the next level.
<br/><br/>
At <span>TOPMODEL</span>, we understand that every project is unique, and finding the right talent is crucial to achieving your desired outcome. Our comprehensive database features models of all ages, ethnicities, and styles, ensuring that you can find the perfect match for your specific needs. Each model's profile includes a detailed portfolio, showcasing their previous work and giving you a clear sense of their abilities and strengths.
<br/><br/>
Our user-friendly interface makes it easy to browse, search, and filter models based on your requirements. Whether you need a high-fashion runway model, a commercial actor, or a character model for a specific role, our platform has you covered. Additionally, we offer advanced booking tools that streamline the hiring process, allowing you to schedule and manage your projects with ease.
<br/><br/>
We pride ourselves on maintaining a high standard of professionalism and integrity. All our models are carefully vetted to ensure they meet our stringent quality criteria. Moreover, our dedicated support team is always available to assist you with any questions or concerns, ensuring a smooth and hassle-free experience from start to finish.
<br/><br/>
Join the many satisfied clients who have successfully completed their projects with the help of our exceptional models. Discover the perfect talent for your next photo or video shoot at [Site Name] and bring your creative vision to life.</p>
    </div>
  )
}

export default About
