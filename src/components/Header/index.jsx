import { RiShutDownLine } from "react-icons/ri";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

import avatarPlaceholder from "../../assets/avatarPlaceholder.png";

import { Container, Profile, Logout } from "./styles";

export function Header() {
  const { signOut, user } = useAuth();

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;
  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt={user.name} />
        <div>
          <span>Welcome,</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      <Logout onClick={signOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
