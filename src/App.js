import React, {useState,useEffect} from "react";
import api from "./services/api"
import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data)
    })
  } ,[repositories])
  async function handleAddRepository() {
     const repository = await api.post("repositories",{
       title: `Novo Projeto ${Date.now()}`,
       url:"github.com/lhfam97",
       techs:["React", "Node"]

       
     })
     setRepositories([...repositories,repository]);


  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    set(repositories.filter(repository=>{
      repository.id!==id;
    }))

  }

  return (
    <div>
      <ul data-testid="repository-list">
 

          {repositories.map((repository)=>(
            <li key={repository}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button></li>
          ))}

          {/* <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button> */}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
