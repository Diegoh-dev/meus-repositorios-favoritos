import { useCallback, useEffect, useState } from "react";
import { Container, Form, SubmitButton, List, DeleteButoon } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        try {
          if (newRepo === "") {
            console.log("object");

            // throw new Error('Você precisa indicar um repositório!');
            // return toast.warn('Você precisa indicar um repositório!')
         return  toast.warning("Wow so easy!");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorios.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            throw new Error("Repositório Duplicado!");
          }

          const data = {
            name: response.data.full_name,
          };

          localStorage.setItem(
            "@repos",
            JSON.stringify([...repositorios, data])
          );

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [newRepo, repositorios]
  );

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorios.filter((r) => r.name !== repo);
      localStorage.setItem("@repos", JSON.stringify(find));
      setRepositorios(find);
    },
    [repositorios]
  );

  useEffect(() => {
    const getReposStorage = localStorage.getItem("@repos");

    if (getReposStorage) {
      setRepositorios(JSON.parse(getReposStorage));
    }
  }, []);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Adicionar Repositório"
          onChange={(e) => {
            setNewRepo(e.target.value);
          }}
          value={newRepo}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner size={14} color="#FFF" />
          ) : (
            <FaPlus size={14} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButoon onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButoon>
              {repo.name}
            </span>
            <Link to={`/repositorio/${repo.name}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
