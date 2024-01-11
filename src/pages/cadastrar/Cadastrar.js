//AUTHENTICATION FIREBASE
import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { FormGroup, Label, Form, Input, Card, Button  } from 'reactstrap';
import { NavLink } from "react-router-dom";

import { useInsertUsuário } from "../../hooks/useInsertUsuário";

const Cadastrar = () => {
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ confirmPassword, setConfirmPassword] = useState("")
    const { createUser, error,setError, loading } = useAuthentication();
    
    const [ data, setData ] = useState("");
    const [ permissão, setPermissão] = useState("não")
    const [ nome, setNome] = useState("meu nme")
    const [ apelido, setApelido] = useState("nick name")
    const { insertUsuário} = useInsertUsuário("users")

    // MÉTODO SALVAR NO AUTHENTICATION
      const handleSubmit = async (e) => {
       e.preventDefault()
       setError(null)

        const user = {
            email,
            password,
        }

        //VERIFICA SE AS SENHAS SÃO IGUAIS
         if(password !== confirmPassword){
           setError("As senhas precisam ser iguais!")
         return;
         }else{
          setError ("")       
         }

        //VERIFICA PREENCHIMENTO DE SENHA
        if(password == ("")){
          setError("Informe uma senha!")
        return;     
        }else{
        setError ("")       
        }
        
        //VERIFICAÇÃO DE VALOR NULO
        if (error == null){
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        }

        //CHAMA REGISTRO NO AUTHENTICATION
        const res = await createUser (user)

        console.log("registro authentication")
        //CHAMA REGISTRO NO FIRESTORE DATABASE <-
         insertUsuário({
           data,
           ui: user.uid,
           permissão,
           nome,
           apelido
         })
         console.log("registro bd users")
         console.log(permissão)
         console.log(nome)
         console.log(apelido)

    };

  return (
    <div>

        <div className="d-flex justify-content-center">
        <Card style={{width: '18rem'}}>

          {/* NOME */}
          <Form className="ms-2 me-2">

          <h3>NOVO CADASTRO</h3>

          {/*EMAIL*/}
          <FormGroup className="text-start">
          <Label for="email">
            Email:
          </Label>
            <Input
              type="email"
              name="email"
              style={{textTransform:"uppercase"}}
              required
              placeholder="Email do usuário"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          {/*SENHA*/}
          <FormGroup className="text-start">
          <Label for="senha">
            Senha:
          </Label>
            <Input
              type="password"
              name="password"
              required
              placeholder="Insira sua senha"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

            {/*CONFIRMAR SENHA*/}
            <FormGroup className="text-start">
            <Label for="senha">
            Confirmar Senha:
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirme a sua senha"

              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          {/*CADASTRAR*/}
          <p>
          {!loading && <Button color="primary" outline
          type="button" onClick={handleSubmit} className="btn">Cadastrar</Button>}
          {loading && (<Button className="btn" disabled>Aguarde...</Button>)}
          </p>

          <p></p>

          {/* PÓS CADASTRO */}
          <p>
          <NavLink color="primary" to= "/login">Voltar</NavLink>
          </p>

          {/*SENHAS DIFERENTES*/}
          {error && <p className="error">{error}</p>}

          </Form>
          </Card>
        </div>
    </div>
  )
}

export default Cadastrar