import { Link, useParams } from "react-router-dom";
import {
  BotaoRetorno,
  Container,
  ContainerBtns,
  ContainerListIssues,
  HeaderRepositorio,
} from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
export default function Repositorio() {
  const params = useParams();

  const nameRepo = params["*"];

  const [dadosRepositorio, setDadosRepositorios] = useState({});
  const [dadosIssuesUser, setDadosIssuesUser] = useState([]);
  console.log("dadosRepositorio:", dadosRepositorio);
  console.log("dadosIssuesUser:", dadosIssuesUser);

  async function handleDadosRepo() {
    const [repositorios, issues] = await Promise.all([
      api.get(`repos/${nameRepo}`),
      api.get(`repos/${nameRepo}/issues`, {
        params: {
          state: "open",
        },
      }),
    ]);

    setDadosRepositorios(repositorios?.data);
    setDadosIssuesUser(issues?.data);
  }

  useEffect(() => {
    handleDadosRepo();
  }, []);

  return (
    <Container>
      <Link to={"/"}>
        <FaArrowLeft size={25} color="#0D2636" />
      </Link>

      <HeaderRepositorio>
        <div>
          <img
            src={dadosRepositorio.owner?.avatar_url}
            alt={dadosRepositorio.owner?.login}
          />
          <h1>{dadosRepositorio?.name}</h1>
          <p>{dadosRepositorio?.description}</p>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <div>
                <img src={issue.user?.avatar_url} alt={issue.user?.login} />
                <h2>
                  <a href={issue.html_url}>{issue?.title}</a>
                  <div style={{display:'flex'}}>
                  {issue.labels.map((label) => (
                    <span key={label.id}>{label.name}</span>
                  ))}
                  </div>
                 
                </h2>
              </div>

              <p>{issue.user?.login}</p>
            </div>
          </li>
        ))}
      </ContainerListIssues>
    </Container>
  );
}
