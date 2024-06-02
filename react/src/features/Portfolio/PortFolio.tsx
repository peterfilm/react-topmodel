import cn from "classnames"
import styles from "./Portfolio.module.scss";
import { useSelector, useDispatch} from "react-redux";
import { hidePortfolio, nextPhoto, prevPhoto } from "./portfolio-slice";
import {RootState} from '../../store'
import { useEffect, useCallback, useState,  useRef  } from "react";
import MiniGallery from "../../components/MiniGallery/MiniGallery";
import photo_thumbnail from '../../assets/photos.png'
import { showThumbnails } from "./portfolio-slice";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

const Portfolio = () => {
    const dispatch = useDispatch()
    const portfolio = useSelector((state: RootState) => state.portfolio);
    const navigate = useNavigate()
    const sizeOfContainer = useRef<HTMLDivElement>(null)
    const [imgPxSize, setImgPxSize] = useState(1)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    const isMobile = useMediaQuery({ query: '(max-width: 768px)'})

    const onNextPhoto = useCallback(() => {
        dispatch(nextPhoto());
      }, [dispatch]);
    
      const onPrevPhoto = useCallback(() => {
        dispatch(prevPhoto());
      }, [dispatch]);

      const hidePortfolioHandler = useCallback(() => {
        dispatch(hidePortfolio())
      }, [dispatch])

      const showThumbnailsHandler = useCallback(() => {
        dispatch(showThumbnails());
      }, [dispatch]);
    
      useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "ArrowRight") {
            onNextPhoto();
          } else if (event.key === "ArrowLeft") {
            onPrevPhoto();
          } else if (event.key === "Escape") {
            hidePortfolioHandler()
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [onNextPhoto, onPrevPhoto, hidePortfolioHandler]);

    const moveLink = () => {
      dispatch(hidePortfolio())
      navigate(`/models/${portfolio.pk}`)
    }

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array ensures the effect runs only once

    useEffect(() => {
      const obj = sizeOfContainer.current
      if (obj) {
        setImgPxSize(obj.getBoundingClientRect().height - (43 + (portfolio.thumbnails ? (isMobile ? 100: 150) : 0) + (isMobile ? 100: 0)))
      }
    }, [portfolio.thumbnails, sizeOfContainer, isMobile, screenWidth])

    return (
        <div className={cn(styles['portfolio'])}>
            <div className={cn(styles['set__container'])}>
              <div><img className={cn(styles['thumbnails'])} onClick={showThumbnailsHandler} src={photo_thumbnail} alt='Show Thumbnails' /></div>
              <div className={cn(styles['name'])} onClick={moveLink}>{portfolio.name}&nbsp;<span>{portfolio.surname[0]}.</span></div>
              <div className={cn(styles['close'])} onClick={hidePortfolioHandler}>&#x2716;</div>
            </div>
            <div className={cn(styles['response'])} ref={sizeOfContainer}>
              <div className={cn(styles['portfolio__container'])}>
              <div className={cn(styles['portfolio__arrow__left'])} onClick={onPrevPhoto}>&lsaquo;</div>
              <div className={cn(styles['forImg'])} style={{height: `${imgPxSize}px`}}><img src={portfolio.photographs[portfolio.fromPhoto].middle_img} alt={`${portfolio.name} ${portfolio.surname[0]}.`} /></div>
              <div className={cn(styles['portfolio__arrow__right'])} onClick={onNextPhoto}>&rsaquo;</div>
              </div>
              <div className={cn(styles['portfolio__pages'])}>{portfolio.fromPhoto + 1} of {portfolio.photographs ? portfolio.photographs.length: ''}</div>
              {portfolio.thumbnails && <Fade><MiniGallery /></Fade>}
            </div>
        </div>
    )
}

export default Portfolio