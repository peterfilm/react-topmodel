import cn from "classnames"
import styles from "./ContactForm.module.scss";
import { useSelector } from "react-redux";
import {RootState} from '../../store'
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import Input from "../../components/Input/Input";
import { PREFIX } from "../../helpers/API";
import { Fade } from "react-awesome-reveal";
import well from '../../assets/well_sent.png'

interface IForm {
  nameField: string | null,
  emailField: string | null,
  textField: string | null,
  serverError: string | null
}

interface ContactFormProps {
  who?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ who = false }) => {
    const getInitialValue = (key: string) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : '';
    };

    const bookModel = useSelector((state: RootState) => state.bookModel);

    const [fname, setFname] = useState<string>(getInitialValue('name'));
    const [femail, setFemail] = useState<string>(getInitialValue('email'));
    const [fagency, setFagency] = useState<string>(getInitialValue('agency'));

    const [ftext, setFtext] = useState('')
    const [allErrors, setAllErrors] = useState<IForm>({nameField:null , emailField: null, textField: null, serverError: null})
    const [sendButton, setSendButton] = useState(false)
    const [successSent, setSuccessSent] = useState(false)
    const [firstCheckText, setFirstCheckText] = useState(false)

    useEffect(() => {
    localStorage.setItem('name', JSON.stringify(fname));
    localStorage.setItem('email', JSON.stringify(femail));
    localStorage.setItem('agency', JSON.stringify(fagency));
    
  }, [fname, femail, fagency]);

    useEffect(() => {
      if (fname && femail && ftext && Object.values(allErrors).every(item => item === null)) {
        setSendButton(true)
      } else {
        setSendButton(false)
      }

    }, [allErrors, fname, femail, ftext])

    useEffect(() => {
      if (firstCheckText) {
        checkText()
      }
    }, [ftext])
      
      /// Checks

      const correctNameHandler = (value: string) => {
        setFname(value.replace(/[^a-zа-я \-]/gi, ''))
      }

      const checkName = () => {
        const cname = fname.trim()
      if (cname.length >= 2 && cname.length < 50) {
        setAllErrors(errors => ({...errors, nameField: null}))
      } else {
          setAllErrors(errors => ({...errors, nameField: 'Invalid name!'}))
        }
      }

      const checkEmail = () => {
        if (/^([a-zA-Z0-9][a-zA-Z0-9\-_\.]+@([a-zA-Z0-9]+[\.]?[a-zA-Z0-9]?)+\.([a-zA-Z0-9]+(\.?[a-zA-Z0-9]+)?){1}){1,63}$/g.test(femail)) {
          setAllErrors(errors => ({...errors, emailField: null}))
      } else {
          setAllErrors(errors => ({...errors, emailField: 'Invalid email!'}))
        }
      }

      const checkText = () => {
        setFirstCheckText(true)
        const ctext = ftext.trim()
      if (ctext.length < 10) {
        setAllErrors(errors => ({...errors, textField: 'Very little text!'}))
      }
      else if (ctext.length > 2000) {
          setAllErrors(errors => ({...errors, textField: 'A lot of text. Cut it a little bit!'}))
      } else {
        setAllErrors(errors => ({...errors, textField: null}))
        }
      }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${PREFIX}/send_email/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pk: who ? 0 : bookModel.pk,
                    name: fname,
                    email: femail,
                    agency: fagency,
                    text: ftext,
                }),
            });

            if (response.ok) {
              setSuccessSent(true)
              setTimeout(() => {
                setSuccessSent(false)
                setFtext('')
                setFirstCheckText(false)
              }, 3000)
          } else {
              throw new Error('Failed to send email');
          }
        } catch (error) {
          setAllErrors(errors => ({...errors, serverError: 'Something went wrong...'}))
        }
    };

    return (
      <>
      { !successSent ?
      <div>
        {allErrors.serverError ?  <div className={cn(styles['serverError'])}>{allErrors.serverError}</div> : '' }
         <form className={cn(styles['form'])} onSubmit={handleSubmit}>
                      {allErrors.nameField !== null && <div className={cn(styles['errorMessage'])}>{allErrors.nameField}</div>}
                      <Input name='name' type="text" placeholder="Name" 
                                value={fname}
                                appereance={allErrors.nameField !== null ? 'bigError' : 'big'} 
                                onChange={(e) => 
                                  correctNameHandler(e.target.value)}
                                onBlur={checkName} />
                      {allErrors.emailField !== null && <div className={cn(styles['errorMessage'])}>{allErrors.emailField}</div>}
                      <Input name='email' 
                            type='email'
                            appereance={allErrors.emailField !== null ? 'bigError' : 'big'}
                            value={femail}
                            onChange={(e) => setFemail(e.target.value)}
                            onBlur={checkEmail}
                            placeholder="Email"/>
                      <Input name='agency' type="text" value={fagency} onChange={(e) => setFagency(e.target.value)}  placeholder="Agency (Optional)"/>
                      {allErrors.textField !== null && <div className={cn(styles['errorMessage'])}>{allErrors.textField}</div>}
                      <TextArea placeholder="Write your message here..." 
                      name='text'
                      value={ftext}
                      appereance={allErrors.textField !== null ? 'bigError' : 'big'}
                      onChange={(e) => setFtext(e.target.value)}
                      onBlur={checkText}
                      />
                      <Button appereance={sendButton ? 'big' : 'bigError'} disabled={sendButton ? false : true}>Send Message</Button>
                    </form>
                    </div>
                    : <WellSent/> }
                    </>
    )
}

export default ContactForm

const WellSent = () => {
  return (
    <Fade><div className={cn(styles['wrapperSent'])}>
      <img className={cn(styles['sentImg'])} src={well} alt="Well Sent" />
      <h2 className={cn(styles['sentText'])}>Thanks for sending!</h2>
      <p className={cn(styles['sentMessage'])}>Your message has been sent successfully</p>
    </div></Fade>
  )
}