import { BrowserRouter, Route, Routes } from "react-router-dom"
import PageBase from "./pages/PageBase"
import Home from './pages/Home'
import Financiamento from "./pages/Financiamento"
import Aposentadoria from "./pages/Aposentadoria"
import JurosComposto from "./pages/JurosComposto"
import JurosSimples from "./pages/JurosSimples"
import PoupancaSelic from "./pages/PoupancaSelic"
import ReservaEmergencia from "./pages/ReservaEmergencia"

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PageBase/>}>

                    <Route index element={<Home/>}></Route>

                    <Route path="/Financiamento" element={<Financiamento/>}></Route>
                    <Route path="/Aposentadoria" element={<Aposentadoria/>}></Route>
                    <Route path="/jurosComposto" element={<JurosComposto/>}></Route>
                    <Route path="/JurosSimples" element={<JurosSimples/>}></Route>
                    <Route path="/poupancaSelic" element={<PoupancaSelic/>}></Route>
                    <Route path="/reservaEmergencia" element={<ReservaEmergencia/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}