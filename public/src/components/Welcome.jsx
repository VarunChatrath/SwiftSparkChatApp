import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({currentUser}) {
    const [userName, setUserName] = useState("");
    useEffect( () => {
        const uname=async()=>{
      setUserName(
        await JSON.parse(
          localStorage.getItem('chat-app-user')
        ).username
      );
        }
        uname()
    }, []);
  return (
    <Container>
        <img src={Robot} alt='Robot'/>
        {console.log(userName)}
        <h1>
            Welcome <span>{userName}</span>
        </h1>
        <h3>Please select a Chat to start Messaging</h3>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;