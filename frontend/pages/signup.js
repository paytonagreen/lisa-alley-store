import styled from "styled-components";
import SignInContainer from "../components/styles/SignInContainer";
import SignUp from "../components/Signup";
import SignIn from "../components/Signin";
import RequestReset from "../components/RequestReset";

const Signup = (props) => (
  <SignInContainer>
    <SignUp />
  </SignInContainer>
);

export default Signup;
