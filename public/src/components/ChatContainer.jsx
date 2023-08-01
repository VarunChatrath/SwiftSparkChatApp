import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([])
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {

    const fetchChat = async () => {
      // console.log(currentUser._id, currentChat._id)
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id
        })
        // console.log(response)
        setMessages(response.data)
      }
      catch (error) {
        console.error("Error fetching chat:", error);
      }
    }
    if (currentUser && currentChat) {
      fetchChat();
    }
    // console.log(messages)
  }, [currentChat])


  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id, to: currentChat._id, message: msg
    })

   

  }

 

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Scroll to the bottom only if there are messages in the chat
    if (messages.length > 0) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  return (
    <>
      {
        currentChat && (
          <Container>
            <div className="chat-header">
              <div className="user-details">
                <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt='avatar' />
                </div>
                <div className="username">
                  <h3>
                    {currentChat.username}
                  </h3>
                </div>
              </div>
              <Logout />
            </div>
            <div className="chat-messages">
              {
                messages.map((message) => {
                  return <div >
                    <div className={`message ${message.fromSelf ? "sended" : "recived"}`}>
                      <div className="content">
                        <p>{message.messages}</p>
                        {/* {console.log(messages)} */}
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
          </Container>
        )
      }
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;