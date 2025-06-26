
import { Link } from 'react-router-dom'
import './Footer.css'
export default function Footer(){
    return(
        <div className="controleFooter">
            
            <p>&copy; 2025. Desenvolvido por</p>

            <Link to="https://portfolio-pi-green-27.vercel.app/" target='_blank'>Lvitor.</Link>
        </div>
    )
}