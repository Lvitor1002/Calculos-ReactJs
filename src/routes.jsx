import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from './pages/Home'
import AluguelFinanciamento from "./pages/AluguelFinanciamento";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PageBase/>}>

                    <Route index element={<Home/>}></Route>

                    <Route path="/Aluguel-Financiamento" element={<AluguelFinanciamento/>}></Route>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}