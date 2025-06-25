import { LuArrowDownNarrowWide } from "react-icons/lu";

import './Navbar.css'
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar(){

    const [sidebar, setSidebar] = useState(false)

    // esconder se estiver visível e mostrar se estiver escondida.
    // função callback que recebe o valor anterior (prev) do sidebar e retorna o valor oposto
    const alternarSidebar = () => setSidebar(prev => !prev)

    return(
        <div className="controleNavbar">
            <div className="controeImgIcone">
                
                <Link to='/'><img src="../../public/favicon.png" alt="Logo" /></Link>
                
                <Link to="#" className="iconeSeta">
                    <LuArrowDownNarrowWide onClick={alternarSidebar}/>
                </Link>
                
            </div>
            <h1>Calculus Tech.</h1>
            <div></div>

            {/*                 menu               */}
            <nav className={sidebar ? 'opcoesBar ativo' : 'opcoesBar'}>
                
                <ul className="campoItens">

                    <li className="campoIconeFechar">

                        <Link to="#" className="iconeFechar" onClick={alternarSidebar}>

                            <AiOutlineClose/>
                        
                        </Link>

                    </li>

                    {Sidebar.map((item, posicao) => {
                        
                        return(
                        
                            <li key={posicao} className={item.classe}>

                                <Link to={item.rota} onClick={alternarSidebar}>

                                    <span>{item.titulo}</span>
                                    {item.icone}
                                
                                </Link>

                            </li>
                        )
                    })}

                </ul>

            </nav>

            {sidebar && <div className="overlay" onClick={alternarSidebar}/>}
            
        </div>
    )
}