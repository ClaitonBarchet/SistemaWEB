import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { FormGroup, Label, Form, Input, Card, Button } from 'reactstrap';
import styles from "./Viagem.css";

const Viagem = () => {
  const [ data, setData ] = useState("");
  const [ placa, setPlaca ] = useState("");
  const [ carregamento, setCarregamento ] = useState("");
  const [ cliente, setCliente ] = useState("");
  const [ material, setMaterial ] = useState("");
  const [ volume, setVolume ] = useState("");
  const [ hoInicial, setHoInicial ] = useState("");
  const [ hoFinal, setHoFinal ] = useState("");
  const [ observações, setObservações ] = useState("");
  const [ error, setError ] = useState("");
  const { user} = useAuthValue();

  const {response, insertDocument} = useInsertDocument("posts");

  const navigate = useNavigate()
  
  // var n1 = parseFloat(prompt("Digite um número:")); ABRE CAIXA NA CONSOLE

  // MÉTODO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)

  // Validar placa
  // var regex = '[a-z]{3}[0-9][0-9a-z][0-9]{2}';

  // if (placa.match(regex)) {
  //   console.log("placa válida")
  // }else{
  //   setFormError("Placa inválida")
  //   console.log(placa)
  //   console.log(regex)
  // }

  const hoInicialInt = parseInt (hoInicial)
  const hoFinalInt = parseInt (hoFinal)

  //FALHA NA COMPARAÇÃO DOS VALORES
  if (hoInicialInt > hoFinalInt){
    setError("O hodômetro inicial não pode ser maior que o hodômetro final!")
    console.log("ERRO Teste validação ho")
    console.log(hoInicialInt)
    console.log(hoFinalInt)
    return;
  }else if (hoInicialInt < hoFinalInt){
    setError(null);

    setData("")
    setPlaca("")
    setCarregamento("")
    setCliente("")
    setMaterial("")
    setVolume("")
    setHoInicial("")
    setHoFinal("")
    setObservações("")
    
    console.log("OK Teste validação ho")
  }

  if (!placa || !carregamento || !cliente || !volume || !hoInicial || !hoFinal || !data){
    setError("Por favor, preencha todos os campos!")
    console.log("ERRO Teste validação preenchimento")
    return
  }else{
    setError (null)       
  }

  insertDocument({
    data,
    mes: data.toLocaleString('default', {month: 'long'}),
    ano: data.toLocaleString('default', {year: 'long'}),
    ui: user.uid,
    placa: placa.toUpperCase(),
    carregamento: carregamento.toUpperCase(),
    cliente: cliente.toUpperCase(),
    material: material.toUpperCase(), 
    volume,
    hoInicial, 
    hoFinal,
    hoProduzido: hoFinal - hoInicial,
    observações  
  })

  alert("Viagem registrada com sucesso!")
  navigate("/");
  // window.location.reload(true);//COMANDO PARA RECARREGAR A PÁGINA
};

    return (
      <div>
       {/* <div style={{ backgroundImage: "url(/Wallpaper.jpg)" }} className="container"> */}

        <div className="d-flex justify-content-center">
        <Card style={{width: '18rem'}}>
        <Form onSubmit={handleSubmit} className="ms-2 me-2">
        <h3>NOVA VIAGEM</h3>

          {/*DATA*/}
          <FormGroup className="text-start mt-2">
          <Label>
            Data da viagem:
            </Label>
            <Input
            className = "input"
            type="date"
            name="data"
            style={{textTransform:"uppercase"}}
            required
            placeholder="Data da viagem"
            onChange={(e) => setData(e.target.value)}
            value={data}
            />
            </FormGroup>

           {/*PLACA*/}
           <FormGroup>
          <Label>
            Placa:
            </Label>
            <Input
            className = "input"
            type="text"
            name="placa"style={{textTransform:"uppercase"}}
            autocomplete="on"
            required
            placeholder="Placa do veículo"
            onChange={(e) => setPlaca(e.target.value)}
            value={placa}
            />
            </FormGroup>

           {/*CARREGAMENTO*/}
           <FormGroup>
           <Label>
            Carregamento (remetente):
            </Label>
            <Input
            className = "input"
            type="text"
            name="title"
            style={{textTransform:"uppercase"}}
            required
            placeholder="Local de carregamento"
            onChange={(e) => setCarregamento(e.target.value)}
            value={carregamento}
            />
            </FormGroup>
          
           {/*CLIENTE*/}
           <FormGroup>
           <Label>
            Cliente (destinatário):
            </Label>
            <Input
            className = "input"
            type="text"
            name="title"
            style={{textTransform:"uppercase"}}
            required
            placeholder="Nome do cliente"
            onChange={(e) => setCliente(e.target.value)}
            value={cliente}
            />
            </FormGroup>
            
          {/*MATERIAL*/}
          <FormGroup>
          <Label>
            Material (produto):
            </Label>
            <Input
            className = "input"
            type="text"
            name="material"style={{textTransform:"uppercase"}}
            autocomplete="on"
            required
            placeholder="Material a ser carregado"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            />
            </FormGroup>

          {/*VOLUME*/}
          <FormGroup>
          <Label>
            Volume (quantidade):
            </Label>
            <Input
            className = "input"
            type="number"
            name="volume"
            autocomplete="on"
            required
            placeholder="Volume a ser carregado"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            />
            </FormGroup>

          {/*HODOMETRO INICIAL*/}
          <FormGroup>
          <Label>
            Hodômetro Inicial:
            </Label>
            <Input
            className = "input"
            type="number"
            name="hoInicial"
            style={{textTransform:"uppercase"}}
            autocomplete="off"
            required
            placeholder="Hodômetro Inicial"
            onChange={(e) => setHoInicial(e.target.value)}
            value={hoInicial}
            />
            </FormGroup>

          {/*HODOMETRO FINAL*/}
          <FormGroup>
          <Label>
            Hodômetro Final:
            </Label>
            <Input
            className = "input"
            type="number"
            name="hoFinal"
            style={{textTransform:"uppercase"}}
            autocomplete="off"
            required
            placeholder="Hodômetro Final"
            onChange={(e) => setHoFinal(e.target.value)}
            value={hoFinal}
            />
          </FormGroup>      

          {/*OBSERVAÇÕES*/}
          <FormGroup>
          <Label>
            Observações:
            </Label>
            <Input
            className = "input"
            type="textarea"
            name="observações"
            style={{textTransform:"uppercase"}}
            autocomplete="off"
            maxlength = "50"
            placeholder=""
            onChange={(e) => setObservações(e.target.value)}
            value={observações}
            />
          </FormGroup>

          <p>
            {!response.loading && <Button color="primary" outline className="btn">REGISTRAR</Button>}
            {response.loading && (<button className="btn" disabled>Aguarde...</button>)}

            {/* {response.error && <p className="error">{response.error}</p>} */}
            {error && <p className="error">{error}</p>}
          </p>

          </Form>
          </Card>
          </div>
      </div>
    )
  }

export default Viagem