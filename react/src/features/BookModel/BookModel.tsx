import cn from "classnames"
import styles from "./BookModel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { hideBookModel } from "./book-slice";
import {RootState} from '../../store'
import { useEffect, useCallback } from "react";
import { useMediaQuery } from 'react-responsive'
import ContactForm from "../ContactForm/ContactForm";

const BookModel = () => {
    const dispatch = useDispatch()
    const bookModel = useSelector((state: RootState) => state.bookModel);
    const isSmallHeight = useMediaQuery({ query: '(max-height: 600px)' })

    const hideBookHandler = useCallback(() => {
        dispatch(hideBookModel())
      }, [dispatch])
    
      useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            hideBookHandler()
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [hideBookHandler]);
      
    return (
        <div className={cn(styles['bookModel'])}>
            <div className={cn(styles['bookModel__container'])}>
              <div className={cn(styles['popup'])} style={isSmallHeight ? {overflowY : 'scroll'} : {overflowY: 'auto'}}>
              <div className={cn(styles['close__container'])}><div className={cn(styles['close'])} onClick={hideBookHandler}>&#x2716;</div></div>
                <div className={cn(styles['info'])}>
                  <img className={cn(styles['ava'])} src={bookModel.avatar} alt="Photo" />
                  <div className={cn(styles['name'])}>{bookModel.name} {bookModel.surname[0]}.</div>
                  <div className={cn(styles['pre_text'])}>Write your message to {bookModel.name} and {bookModel.gender && bookModel.gender === 'MALE' ? 'he' :
                                                                                              bookModel.gender === 'FEMALE' ? 'she'
                                                                                            : ''} will answer to you as soon as possible</div>
                  <ContactForm/>
                </div>
              </div>
            </div>
        </div>
    )
}

export default BookModel