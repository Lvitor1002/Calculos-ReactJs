import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from './pages/Home'

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PageBase/>}>
                    <Route index element={<Home/>}></Route>
                    {/* <Route path="/Aposentadoria"></Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}