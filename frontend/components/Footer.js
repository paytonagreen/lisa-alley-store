import React from "react";
import styled from "styled-components";
import Link from 'next/link';

const FooterStyles = styled.footer`
  background: ${(props) => props.theme.teal};
  position: relative;
  bottom: 0;
  width: 100%;
  .social {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12vh;
    img {
      height: 4rem;
      color: white;
      margin: 0 1rem;
      @media(max-width: 700px) {
        height: 3rem;
      }
    }
  }
  .created {
    text-align: center;
    @media(max-width: 700) {
      font-size: .75rem;
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyles>
      <div className="social">
        <Link href="https://instagram.com/lalley">
          <a>
            <img src="../static/PNG/ig.png" alt="Instagram" />
          </a>
        </Link>
        <Link href="mailto: lisaalley@lisaalley.com">
          <a>
            <img src="../static/PNG/email.png" alt="Email" />
          </a>
        </Link>
        <Link href="https://facebook.com/lisa.alley">
          <a>
            <img src="../static/PNG/facebook3.png" alt="Email" />
          </a>
        </Link>
      </div>
      <div className="created">
        <a href="https://github.com/paytonagreen">
          Created By Payton Green &copy; 2020
        </a>
      </div>
    </FooterStyles>
  );
};

export default Footer;
