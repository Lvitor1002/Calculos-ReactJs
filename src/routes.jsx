import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from './pages/Home'
import Financiamento from "./pages/Financiamento";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PageBase/>}>

                    <Route index element={<Home/>}></Route>

                    <Route path="/Financiamento" element={<Financiamento/>}></Route>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}