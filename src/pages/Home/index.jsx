
import { Link } from 'react-router-dom'
import './Home.css'
import Footer from '../../components/Footer'
export default function Home(){
    
    return(
        <>
        
            <div className="controleHome">
                
                <div className="titulo">

                    <h1>"Deixe os cálculos com a gente. Você só aproveita o resultado"</h1>
                    <p>Nem toda conta precisa ser feita de cabeça.</p>

                    <div className="controleBtn">
                        <Link to="/Financiamento">
                            <button>Começe agora</button>
                        </Link>
                    </div>
                </div>


                <div className="logo">
                    <img src="/pexels.jpg" alt="Logo Image" />
                    <div className='linha'></div>
                </div>


            </div>
            <Footer/>
        </>
    )
}