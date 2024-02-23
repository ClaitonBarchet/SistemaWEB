import React from 'react'
import { useState } from "react";
import { FormGroup, Label, Form, Input, Card, Button  } from 'reactstrap';
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";

const Permissão = () => {
  const [ permissão, setPermissão] = useState("não")
  const [ nome, setNome] = useState("meu nome")
  const [ apelido, setApelido] = useState("nick name")
  const { response, insertDocument} = useInsertDocument("users")
  const { user } = useAuthValue();
  const [ error, setError ] = useState("");

  const navigate = useNavigate()

  // MÉTODO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)

        //CHAMA REGISTRO NO FIRESTORE DATABASE <-

          insertDocument({
           ui: user.uid,
           permissão,
           nome,
           apelido
         })
         console.log("registro bd users")
         console.log(user.uid)
         console.log(permissão)
         console.log(nome)
         console.log(apelido)
    };
  return (
    <div>

          {/*CADASTRAR*/}
          <p>
          {<Button color="primary" outline
          type="button" onClick={handleSubmit} className="btn">Cadastrar</Button>}
          </p>
        <h5>Aguarde seu cadastro ser aprovado por um dos gestores.</h5>
    </div>
  )
  }

export default Permissão