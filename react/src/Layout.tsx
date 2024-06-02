import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import UpperIcon from './components/UpperIcon/UpperIcon'
import Portfolio from './features/Portfolio/PortFolio'
import { useSelector } from "react-redux";
import { RootState } from './store'
import BookModel from './features/BookModel/BookModel'
import { useMediaQuery } from 'react-responsive'

function Layout() {
  const portfolio = useSelector((state: RootState) => state.portfolio);
  const bookModel = useSelector((state: RootState) => state.bookModel);
  const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <div className='container'>
    {portfolio.show ? <Portfolio/> : ''}
    {bookModel.show ? <BookModel/> : ''}
    {portfolio.show || bookModel.show ? document.body.style.overflow = 'hidden' : document.body.style.overflow = ''}
    <Header/>
    <Outlet/>
    <div style={isMobileScreen ? {marginBottom: '100px'} : {marginBottom: '0px'}}></div>
    <Footer/>
    {!isMobileScreen &&<UpperIcon/>}
    </div>
  )
}

export default Layout
