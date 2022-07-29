import AllRoutes from 'route'

import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify'

const App = () => (
  <div className='App'>
    <ToastContainer />
    <AllRoutes />
  </div>
)

export default App
