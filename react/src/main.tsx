import ReactDOM from 'react-dom/client'
import Layout from './Layout.tsx'
import './style/style.scss'
import { createBrowserRouter, defer, RouterProvider} from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage.tsx'
import OneModel from './pages/OneModel/OneModel.tsx'
import axios from 'axios'
import { PREFIX } from './helpers/API.ts'
import { Provider } from 'react-redux'
import { store } from './store';
import SearchPage from './pages/SearchPage/SearchPage.tsx'
import Contact from './pages/Contact/Contact.tsx'
import About from './pages/About/About.tsx'
import Error from './components/Error/Error.tsx'
import Page404 from './pages/Page404/Page404.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,

    children: [
      {
        path: '/',
        element: <MainPage/>
      },
      {
        path: '/models',
        element: <SearchPage/>
      },
      {
        path: '/models/:pk',
        element: <OneModel/>,
        errorElement: <div className='error'><Error>Can't fetch data. Please, Try later</Error></div>,
        loader: async ({ params }) => {
          return defer({
            data: axios.get(`${PREFIX}/models/${params.pk}`).then(data => data)
          })
    }
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '*',
        element: <Page404/>
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router = {router}/>
    </Provider>
  // </React.StrictMode>,
)
