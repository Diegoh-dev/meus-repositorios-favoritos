import { useCallback, useState } from "react";
import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";
import api from "../../services/api";


export default function Main() {

  const [newRepo,setNewRepo] = useState('');
  const [repositorio,setRepositorio] = useState([]);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit(){
      const response = await api.get(`repos/${newRepo}`)
      
      const data = {
        name: response.data.full_name,
  
      }
  
      setRepositorio([...repositorio,data]);
      console.log(response.data);
      setNewRepo('');
    }
    submit();
    
  },[newRepo,repositorio])


  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input type="text" name="" id="" placeholder="Adicionar Repositório" onChange={(e) => {
          setNewRepo(e.target.value);
        }} value={newRepo}/>

        <SubmitButton>
          <FaPlus size={14} color="#FFF" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
