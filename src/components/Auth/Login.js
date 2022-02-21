import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import './Auth.css'

export default function Login() {
    const {authenticate} = useAuth();
    const navigate = useNavigate();
  
    async function handleAuth(){
        await authenticate(); //await keyword functions like then()
        return navigate("/todos");
    }

  return (
      <div className="login p-5">
          <Container>
              <Card className="m-2 text-center">
                  <Card.Header>
                      <h2>Welcome to the Busy Bee To-Do App!</h2>
                  </Card.Header>
                  <Card.Body>
                      <button onClick={() => handleAuth()} className="btn">Login</button>
                  </Card.Body>
              </Card>
          </Container>
      </div>
  );
}
