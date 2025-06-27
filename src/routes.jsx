import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from './pages/Home'
import Financiamento from "./pages/Financiamento";
import Aposentadoria from "./pages/Aposentadoria";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PageBase/>}>

                    <Route index element={<Home/>}></Route>

                    <Route path="/Financiamento" element={<Financiamento/>}></Route>
                    <Route path="/Aposentadoria" element={<Aposentadoria/>}></Route>
                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}