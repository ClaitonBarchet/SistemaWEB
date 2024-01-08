import React from 'react'
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { FormGroup, Label, Form, Input, Card, Button  } from 'reactstrap';
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const Editar = () => {
  const location = useLocation();
  const dados = location.state.post
  const [id] = useState(dados.id)
  const [data, setData ] = useState(dados.data);
  const [placa, setPlaca ] = useState(dados.placa);
  const [carregamento, setCarregamento] = useState(dados.carregamento);
  const [cliente, setCliente ] = useState(dados.cliente);
  const [material, setMaterial ] = useState(dados.material);
  const [volume, setVolume ] = useState(dados.volume);
  const [hoInicial, setHoInicial ] = useState(dados.hoInicial);
  const [hoFinal, setHoFinal ] = useState(dados.hoFinal);
  const [observações, setObservações ] = useState(dados.observações);

  const [error, setError] = useState("");
  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts");

  const navigate = useNavigate()
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null)

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

    console.log("OK Teste validação ho")
  }
  // checar todos os valores
  if (!placa || !carregamento || !cliente || !volume || !hoInicial || !hoFinal || !data){
    setError("Por favor, preencha todos os campos!")
  }else{
    setError (null)       
  }

    updateDocument({
    id,
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

  setData("")
  setPlaca("")
  setCarregamento("")
  setCliente("")
  setMaterial("")
  setVolume("")
  setHoInicial("")
  setHoFinal("")
  setObservações("")

  alert("Edição realizada com sucesso!")

 navigate("/Histórico");

}

    return (
      <div>
        <div className="d-flex justify-content-center">
        <Card style={{width: '18rem'}}>
        <Form onSubmit={handleSubmit} className="ms-2 me-2">
        <h3>EDIÇÃO DE VIAGEM</h3>

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
            autocomplete="off"
            required
            placeholder="Placa do veículo"
            onChange={(e) => setPlaca(e.target.value)}
            value={placa}
            />
            </FormGroup>

           {/*CARREGAMENTO*/}
           <FormGroup>
           <Label>
            Carregamento:
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
            Cliente:
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
            Material:
            </Label>
            <Input
            className = "input"
            type="text"
            name="material"style={{textTransform:"uppercase"}}
            autocomplete="off"
            required
            placeholder="Material a ser carregado"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            />
            </FormGroup>

          {/*VOLUME*/}
          <FormGroup>
          <Label>
            Volume:
            </Label>
            <Input
            className = "input"
            type="number"
            name="volume"
            style={{textTransform:"uppercase"}}
            autocomplete="off"
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
            // required //OBRIGATORIEDADE DE PREENCHIMENTO
            placeholder=""
            onChange={(e) => setObservações(e.target.value)}
            value={observações}
            />
          </FormGroup>

          <p>
          {!response.loading && <Button color="primary" outline className="btn">SALVAR</Button>}
          
          {response.error && <p className="error">{response.error}</p>}

          {error && <p className="error">{error}</p>}
          </p>

             </Form>
             </Card>
             </div>
      </div>
    )
  }

export default Editar