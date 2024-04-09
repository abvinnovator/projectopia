import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Orders from './pages/Orders';
import NewProject from './pages/NewProject';
import Tasks from './pages/Tasks';
import AddTasks from './pages/AddTasks';
import Auth from './components/Auth';



const App= ()=> {
  
  return(
    <>  
       
  
   <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
              <Routes>
              
                <Route path='/' element={<Auth />} />
                  <Route exact path="/orders" element={<Orders/>} />
                  <Route exact path="/newproject" element={<NewProject/>} />
                  <Route exact path='/tasks' element={<Tasks />} />
                 <Route exact path='/addtasks' element={<AddTasks />} />
              
              </Routes>
          </div>
      </div>
    </Router>
  
    </>
  
  )
}

export default App;