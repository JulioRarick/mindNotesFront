import { useState } from "react";
import { Container, Form, Background } from "./styles";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FiMail, FiLock } from "react-icons/fi";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  function handleSignIn() {
    signIn({ email, password });
  }
  return (
    <Container>
      <Form>
        <h1>mindNotes</h1>
        <p>Application to save and manage your useful links.</p>

        <h2>Sign In</h2>
        <Input
          placeholder="E-mail"
          type="text"
          autoComplete="username"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Login" onClick={handleSignIn} />
        <Link to="/register">Create Account</Link>
      </Form>
      <Background />
    </Container>
  );
}
