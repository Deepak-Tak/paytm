import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'


function App() {

  return (
     <RouterProvider router={router} />
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
      element: <Dashboard/>
    }

  ])


export default App
