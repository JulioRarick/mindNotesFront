import { useState } from "react";
import { Container, Form, Background } from "./styles";

import { api } from "../../services/api";

import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Fill out all the fields.");
    }
    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("User successfully registered.");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Unable to register user.");
        }
      });
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>mindNotes</h1>
        <p>Application to save and manage your useful links.</p>

        <h2>Create Account</h2>
        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Register" onClick={handleSignUp}></Button>
        <Link to="/">Return to Login</Link>
      </Form>
    </Container>
  );
}
