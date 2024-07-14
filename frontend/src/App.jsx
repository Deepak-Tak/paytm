import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import { Provider } from 'react-redux'
import store from './store/store'


function App() {

  return (
     <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
  )
}
  const router = createBrowserRouter([
    {path:'/signup',
     element: <Signup/>
    },
    {
      path:'/signin',
      element: <Signin/>
    },
    {
      path:'/dashboard',
      element: <Dashboard/>,
    }

  ])


export default App
