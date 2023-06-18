import { Link, useParams } from "react-router-dom";
import { BotaoRetorno, Container, ContainerBtns, ContainerListIssues, HeaderRepositorio } from "./styles";
import {FaArrowLeft} from 'react-icons/fa'
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
export default function Repositorio() {

  const params = useParams();

  const nameRepo = params['*'];

  const [dadosRepositorio,setDadosRepositorios] = useState([]);
  const [dadosIssuesUser,setDadosIssuesUser] = useState([]);


 async function handleDadosRepo(){
  const response = await api.get(`repos/${nameRepo}`)
  
  setDadosRepositorios(response.data)

}

async function getDadosIssues(){
  // https://api.github.com/repos/facebook/react/issues/events
  const response = await api.get(`repos/${nameRepo}/issues/events`)
  setDadosIssuesUser(response.data);
}
console.log('issues:',dadosIssuesUser);

  useEffect(()=>{
    handleDadosRepo();
    getDadosIssues()
  },[]);



  return (
    <Container>
      <Link to={"/"}>
        <FaArrowLeft size={25} color="#0D2636" />
      </Link>

      <HeaderRepositorio>
        <div>
          <img
            src={dadosRepositorio.organization?.avatar_url}
            alt={dadosRepositorio.owner?.login}
          />
          <p>{dadosRepositorio.description}</p>
        </div>
      </HeaderRepositorio>

      <ContainerBtns>
        <button>Todas</button>
        <button>Abertas</button>
        <button>Fechadas</button>
      </ContainerBtns>

      <ContainerListIssues>
        {dadosIssuesUser.map((issue) => (
          <li key={issue.id}>
            <div>
              <div>
                <img src={issue.actor?.avatar_url} alt="" />
               <h2>
               <a href="/">{issue.issue.title}</a>
               </h2>
              </div>

              <p>{issue.actor.login}</p>
            </div>
          </li>
        ))}
      </ContainerListIssues>
    </Container>
  );
}
