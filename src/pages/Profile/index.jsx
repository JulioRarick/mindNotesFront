import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Container, Form, Avatar } from "./styles";

import { useNavigate } from "react-router-dom";

import avatarPlaceholder from "../../assets/avatarPlaceholder.png";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    };
    const userUpdated = Object.assign(user, updated);

    await updateProfile({ user: userUpdated, avatarFile });
  }
  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }
  function handleBack() {
    navigate(-1);
  }
  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft />
        </button>
      </header>
      <Form>
        <Avatar>
          <img src={avatar} alt="User Image" />
          <label htmlFor="avatar">
            <FiCamera />
            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="Password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />
        <Input
          placeholder="New password"
          type="Password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />
        <Button title="Save" onClick={handleUpdate} />
      </Form>
    </Container>
  );
}
