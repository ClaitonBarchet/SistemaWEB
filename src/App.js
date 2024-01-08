
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';

// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { NavLink } from "react-router-dom";

//context - ATUTENTICAÇAO DE USUÁRIO
import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";

//pages
import Viagem from './pages/viagem/Viagem';
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Cadastrar from "./pages/cadastrar/Cadastrar";
import Histórico from "./pages/histórico/Histórico";
import Editar from "./pages/editar/Editar";
import Alterarsenha from "./pages/alterarsenha/Alterarsenha";

 function App() {
   // AUTENTICAÇAO DO USUÁRIO
   const [user, setUser] = useState(undefined)
   const {auth} = useAuthentication()
   const {logout} = useAuthentication()

   const loadingUser = user === undefined

   useEffect(()=>{

     onAuthStateChanged(auth, (user)=>{
       setUser(user)
     })
   }, [auth])

   if(loadingUser){
     return<p>Carregando...</p>
   }

   return (

//  <div data-bs-theme="dark" style={{ backgroundImage: "url(/Wallpaper.jpg)" }} className="container">
 <div data-bs-theme="light"  className="container">

    <body>
    <p></p>
        <AuthProvider value={{user}}>
          <BrowserRouter>

          {/* NAVBAR */}

               {/* <nav className="navbar bg-primary navbar-expand-lg" data-bs-theme="dark"> */}
               <nav className="navbar bg-primary navbar-expand-lg" data-bs-theme="light">
                    <div className="container-fluid">
                    
                    <Dropdown>

                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        OPÇÕES
                      </Dropdown.Toggle>

                      <Dropdown.Menu>

                          <Dropdown.Divider />
                            {!user && (<Dropdown.Item href="/login">LOGIN</Dropdown.Item>)}
                            {!user && (<Dropdown.Item href="/cadastrar">CADASTRO</Dropdown.Item>)}
                            {user && (<Dropdown.Item href="/histórico">HISTÓRICO</Dropdown.Item>)}
                            {user && (<Dropdown.Item href="/">NOVA VIAGEM</Dropdown.Item>)}
                            {(<Dropdown.Item href="/about">SOBRE</Dropdown.Item>)}
                          <Dropdown.Divider />
                            {user && (<Dropdown.Item onClick={logout} href="/login">SAIR</Dropdown.Item>)}

                        </Dropdown.Menu>

                      </Dropdown>

                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav">

                      </ul>
                    </div>
                  </div>
                </nav>

          {/*FIM NAVBAR */}

          <Routes>
            <Route  path="/" element={user ? <Viagem /> : <Navigate to="/Login" />} />
            <Route  path="/histórico" element={user ? <Histórico /> : <Navigate to="/Login" />} />
            <Route  path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route  path="/cadastrar" element={!user ? <Cadastrar /> : <Navigate to="/" />} />
            <Route  path="/about" element={<About />} />
            <Route  path="/editar" component = {Editar} element={user ? <Editar /> : <Navigate to="/Editar" />} />
            <Route  path="/alterarsenha" element={<Alterarsenha />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </body>
    </div>
  );
}

export default App;
