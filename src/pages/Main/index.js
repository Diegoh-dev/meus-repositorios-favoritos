import { useCallback, useState } from "react";
import { Container, Form, SubmitButton,List ,DeleteButoon} from "./styles";
import { FaBars, FaGithub, FaPlus ,FaSpinner, FaTrash} from "react-icons/fa";
import api from "../../services/api";


export default function Main() {

  const [newRepo,setNewRepo] = useState('');
  const [repositorios,setRepositorios] = useState([]);
  const [loading,setLoading] = useState(false);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit(){
      setLoading(true);
     try {
      const response = await api.get(`repos/${newRepo}`)
      
      const data = {
        name: response.data.full_name,
  
      }
  
      setRepositorios([...repositorios,data]);
      console.log(response.data);
      setNewRepo('');
     } catch (error) {
      console.log(error)
     } finally{
      setLoading(false);
     }
    }
    submit();
    
  },[newRepo,repositorios])

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  },[repositorios])

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

        <SubmitButton Loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner size={14} color="#FFF" />
          ) : (
            <FaPlus size={14} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List>
            {repositorios.map(repo => (
              <li key={repo.name}>
               <span>
               <DeleteButoon onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14}/>
               </DeleteButoon>
                 {repo.name}
                 </span>
               <a href="">
                <FaBars size={20}/>
               </a>
              </li>
            ))}
      </List>
    </Container>
  );
}
