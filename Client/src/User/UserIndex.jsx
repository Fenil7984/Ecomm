import { Outlet } from "react-router-dom";
import Navigation from "./modules/Navigation";
import Footer from "./modules/Footer";

export default function UserIndex(){
    return (
        <>
        <Navigation/>
        
        <Outlet/>

        <Footer/>
       
        </>
    )
}