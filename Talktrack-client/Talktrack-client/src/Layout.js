import Header from "./Header";
import {Outlet} from "react-router-dom";
import Footer from "./pages/Footer";
import VisitorCount from "./pages/Count";


export default function Layout() {
  return (
    <div >
    <Header />
      
    <main >
    
      <Outlet />
    </main>
    <VisitorCount/>
    <Footer/>
    </div>
  );
}