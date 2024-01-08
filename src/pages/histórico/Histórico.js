import React, {useState, useContext} from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { AuthContext } from '../../context/AuthContext'
import { Button, Table  } from 'reactstrap';

import { db } from '../../firebase/config';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";

const Histórico = () => {

const navigate = useNavigate();
 //get
const {documents: posts, loading } = useFetchDocuments("posts")
const [mes, setMes] = useState("");
const [postsFiltrados, setPostsFiltrados] = useState([]);
const [ano, setAno] = useState("");
const [showModal, setShowModal] = useState(false)
const {user} = useContext(AuthContext)

const [editDoc, setEditDoc] = useState([]);

//FILTRO DE PESQUISA
const search = () => {

  if (ano === "") {
    setPostsFiltrados([])
  } else {

    let aux = posts.filter(p => { 
      if(p.data.includes(ano) && p.data.includes(mes)  && p.ui == user.uid)
        return p
      }
      
    );
    setPostsFiltrados(aux);
  }

  // if (ano === "" || mes === "") {
  //   setPostsFiltrados([])
  // } else {
  //   let aux = posts.filter(p => { 
  //     if(p.data.includes(ano + "-" + mes) && p.ui == user.uid)
  //       return p
  //     }
  //   );
  //   setPostsFiltrados(aux);
  // }

};

//EDIÇÃO
   const editar = async(
    id,
    data,
    placa,
    carregamento,
    cliente,
    material,
    volume,
    hoInicial,
    hoFinal,
    hoProduzido,
    observações
    )=> {
    
     console.log(
      id,
      data,
      placa,
      carregamento,
      cliente,
      material,
      volume,
      hoInicial,
      hoFinal,
      hoProduzido,
      observações
      )
   }

//DELEÇÃO
  const deletar = async(id) => {
    try {
      await deleteDoc(doc(collection(db, 'posts'), id));
      setPostsFiltrados([])
      console.log('Objeto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir o objeto:', error);
    }
  }
  
  return (
    <div>
       {/* ANO */}
        <h5>Informe o ano</h5>
        <select name="ano" id="ano" onChange={(e) => {setAno(e.target.value)}} >
            <option value=""></option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
        </select>

        {/* MÊS */}
        <h5>Informe o mês</h5>
        <p>
        <select name="mes" id="mes" onChange={(e) => {setMes(e.target.value)}}>
            <option value=""></option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
        </select>
        </p>

        <div>
        
        {loading && <p>Carregando...</p>}

        <Button color="primary" type="button" onClick={search} className="btn">Carregar</Button>

          {/* TABELA - CABEÇALHO */}

          <Table striped>
            <thead>
              <tr>
                <th scope="col">DATA</th>
                <th scope="col">PLACA</th>
                <th scope="col">CARREGAMENTO</th>
                <th scope="col">CLIENTE</th>
                <th scope="col">MATERIAL</th>
                <th scope="col">VOLUME</th>
                <th scope="col">HO. INICIAL</th>
                <th scope="col">HO. FINAL</th>
                <th scope="col">DISTÂNCIA</th>
                <th scope="col">OBSERVAÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {postsFiltrados && postsFiltrados.map((post, index) => (

              <tr key={index}>
                <td>{post.data}</td>
                <td>{post.placa}</td>
                <td>{post.carregamento}</td>
                <td>{post.cliente}</td>
                <td>{post.material}</td>
                <td>{post.volume}</td>
                <td>{post.hoInicial}</td>
                <td>{post.hoFinal}</td>
                <td>{post.hoProduzido}</td>
                <td>{post.observações}</td>
                <td>

                <NavLink to= "/Editar" state={{post}} className = {"btn btn-warning"} onClick={()=>editar(post)}>  EDITAR  </NavLink>
                
                </td>
                <td><button  className="btn btn-danger" onClick={()=>deletar(post.id)}> X </button></td>
              </tr>
            ))}
            </tbody> 
          </Table>

        {postsFiltrados && postsFiltrados.length === 0 && (
          <div>
          </div>
        )}
      
        </div>
    </div>
  )
}

export default Histórico