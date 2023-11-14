import React from 'react';
import './AdminHomePage.css';
import Logo from '../Assets/Logo.png';

export const AdminHomePage = () => 
{
    return(
        <div className='addcoursecontainer'>
            <nav className='first-nav'>
                <div class ="first-nav-logo">
                   <img src = { Logo } alt=    "Cour-Cert" className="admin-logo"></img>
             </div>
                <div className='first-nav-title'>
                    <p className='p1'> Course-Certification</p>
                <div className='first-nav-title1'>
                <p className='p2'> "Empowering Your Learning Journey"</p>
                </div>
            </div>
        </nav>
        <nav className='second-nav'>
        <div class ="second-nav-links">
            <ul>
              <li><Link to = "/List">List</Link> </li>
              <li><Link to = "/profile"> Account Profile</Link> </li>
              <li><Link to = "/Admin"> Sign out</Link> </li>
             </ul>
           </div>
        </nav>
        <div className='detail'> 
            <div>  
            </div>
        </div>
    </div>
    )
}

export default AdminHomePage;