import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './PageBase.css'

export default function PageBase(){
    return(
        <main className='controlePageBase'>
            <Navbar/>
            <Outlet/>
            
        </main>
    )
}