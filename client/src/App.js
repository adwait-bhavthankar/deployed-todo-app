import ListHeader from "./components/ListHeader";
import {useEffect, useState} from 'react';
import  ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useCookies } from "react-cookie";
const  App =() => {
  const [cookies,setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail =cookies.email;
  const [tasks,setTasks] = useState(null);

  const getData = async() =>{
    
    try{
      const response= await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json= await response.json();
      setTasks(json);
    }
    catch(err){
      console.error(err);
    }
  };

  useEffect(()=> {if(authToken){
    getData()
  }},[]);
  console.log(tasks);

  const sortedTasks = tasks?.sort((a,b) => new Date(a.Date) - new Date(b.Date) ) 



  return (
    <div className="app">
      {!authToken && <Auth />}
      { authToken && 
      <>
      <ListHeader listname={" 🏖️ holiday tick list"} getData={getData} />
      <p className="user-email">Welcome Back {userEmail}</p>
      {sortedTasks?.map((task) =><ListItem key={task.id} task={task} getData={getData} />)}
      </>
      }
      <p className="copyright">© Creative Coding LLC</p>
      
    </div>
  );
}

export default App;
