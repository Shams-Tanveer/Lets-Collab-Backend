import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';

export default function LogOut() {

    const history = useHistory();

    useEffect(() => {
        fetch("/user/logoutUser", {
            method: "POST",
            mode: "no-cors",
            headers: { 'Content-Type': 'application/json;charset=UTF-8', },
            credentials: "include"
          }).then(() => {
            history.push("/login");
          });
    }, [])
    
  return (
    <div></div>
  )
}
