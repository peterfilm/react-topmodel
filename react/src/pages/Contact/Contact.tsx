import styles from "./Contact.module.scss";
import ContactForm from "../../features/ContactForm/ContactForm";
import modelImg from '../../assets/models.jpg'
import { Helmet } from 'react-helmet';

const Contact  = () => {

  return (
    <div className={styles['wrapper']}>
      <Helmet>
        <meta
            name="description"
            content={`TOPMODEL - Contact us`}
            />
        <title>TOPMODEL - Contact us</title>
        </Helmet>
        <img className={styles['models']} src={modelImg} alt="Models" />
        <h2 className={styles['title']}>Contact us!</h2>
        <div className={styles['contact']}>
            <p className={styles['pContact']}>For inquiries or collaborations, please contact our model agency. We're here to help with bookings, partnerships, and any questions you may have. Reach out to us via email or phone, and our team will respond promptly.</p>
            <ContactForm who={true}/>
        </div>
    </div>
  )
}

export default Contact 
