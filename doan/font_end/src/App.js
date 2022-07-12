
import './App.css';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import RootRoute from './route/RootRoute';


function App() {
  return (
    <>

      <RootRoute />

      <ToastContainer />
    </>

  );
}

export default App;
