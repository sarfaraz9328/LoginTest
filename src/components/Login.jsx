import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Bird.png";

const translations = {
  en: {
    login: "Login",
    email: "Email",
    password: "Password",
    loginButton: "Login",
    emailError: "Please enter a valid email address.",
  },
  hi: {
    login: "लॉग इन करें",
    email: "ईमेल",
    password: "पासवर्ड",
    loginButton: "लॉग इन करें",
    emailError: "कृपया मान्य ईमेल पता दर्ज करें।",
  },
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  // background-color: #f5f5f5;
  position: relative;
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #c7c7c7;
  }

  &:focus {
    border-bottom: 2px solid #007bff;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
`;

const Button = styled.button`
  width: 50%;
  padding: 0.75rem;
  background-color: #fff;
  color: #0056b3;
  border: 1px solid #007bff;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
    color: #fff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  margin: 0;
  z-index: 1;
`;

const ForgotPassward = styled.p`
  color: grey;
  font-size: 12px;
  cursor: pointer;
`;
const LanguageSwitcherContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 3;
  border-radius: 4px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    width: 100%;
    text-align: left;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const Title = styled.h2`
  color: grey;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 1rem;
  displat: flex;
  margin-right: 20px;
`;

const Login = () => {
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setTimeout(() => {
        const data = {
          message:
            "https://images.dog.ceo/breeds/sheepdog-english/n02105641_6534.jpg",
          status: "success",
        };
        navigate("/home", {
          state: { imageUrl: data.message, status: data.status },
        });
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError(translations[language].emailError);
    } else {
      setEmailError("");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setDropdownVisible(false);
  };

  return (
    <Container>
      <LanguageSwitcherContainer>
        <DropdownButton onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faGlobe} />
        </DropdownButton>
        <DropdownContent show={dropdownVisible}>
          <button onClick={() => handleLanguageChange("en")}>EN</button>
          <button onClick={() => handleLanguageChange("hi")}>HI</button>
        </DropdownContent>
      </LanguageSwitcherContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Logo src={logo} alt="Logo" />
        <Title>{translations[language].login}</Title>
        <InputContainer>
          <Icon icon={faUser} />
          <Input
            type="email"
            placeholder={translations[language].email}
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Icon icon={faLock} />
          <Input
            type="password"
            placeholder={translations[language].password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <Button type="submit">{translations[language].loginButton}</Button>
        <ForgotPassward>Forgot your Passward?</ForgotPassward>
      </LoginForm>
    </Container>
  );
};

export default Login;
