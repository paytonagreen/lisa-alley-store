import Link from 'next/link';

import FooterStyles from '../styles/FooterStyles';

const Footer = () => {
  return (
    <FooterStyles>
      <div className='social'>
        <Link href='https://instagram.com/lalley'>
          <a>
            <p>Instagram: @lalley</p>
          </a>
        </Link>
        <p> | </p>
        <Link href='mailto:lisadianealley@gmail.com'>
          <a>
            <p>Email: lisadianealley@gmail.com</p>
          </a>
        </Link>
      </div>
      <div className='created'>
        <a target='_blank' href='https://paytongreen.com'>
          Created By Payton Green &copy; 2020
        </a>
      </div>
    </FooterStyles>
  );
};

export default Footer;
