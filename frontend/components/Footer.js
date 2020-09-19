import React from "react";
import FooterStyles from './styles/FooterStyles';
import Link from 'next/link';

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
