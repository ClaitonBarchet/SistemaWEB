import React, {useState} from "react";
import {FormGroup, Label, Form, Input, Card, Button } from 'reactstrap';
import {getAuth, sendPasswordResetEmail } from "firebase/auth";
import {NavLink } from "react-router-dom";

import 'firebase/auth';

const auth = getAuth()

function Alterarsenha(){

  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

function recuperarSenha(){

  sendPasswordResetEmail(auth, email)
  .then(() => {
    setMensagem("");
    alert("Email enviado com sucesso");
  }).catch((erro) => {
    setMensagem("Erro ao enviar email: " + erro.message);
  })
  
};

  return (
    <div>
        <div className="d-flex justify-content-center">
        <Card style={{width: '18rem'}}>

          {/* NOME */}
          <Form className="ms-2 me-2">

          <h3>REDEFINIR SENHA</h3>

          {/*EMAIL*/}
          <FormGroup className="text-start">
          <Label for="email">
            Email:
          </Label>
            <Input
              className = "input"
              type="email"
              name="email"
              style={{textTransform:"uppercase"}}
              required
              placeholder="Email do usuário"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          {/*SOLICITAR ALTERAÇÃO DE SENHA*/}
          <p>
          <NavLink color="primary" outline onClick={recuperarSenha} className="btn">Redefinir Senha</NavLink>
          </p>
          
          <p></p>

          <p>
          <NavLink color="primary" to = "/login" className="btn">Voltar</NavLink>
          </p>

          </Form>
          </Card>
        </div>
    </div>
  )
 }

export default Alterarsenha