import { memo } from "react";
import images from "../../image/ukr.jpg";
import s from "./Footer.module.css";

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerWrap}>
        <span className={s.text}>2022</span>
        <span className={s.footerText}>All Rights Reserved</span>
        <span className={s.footerText}> Developed with</span>
        <img className={s.footer_logo} src={images} alt="ukraine" />
        <span className={s.span}>by </span>
        <a
          href="https://www.linkedin.com/in/igor-bulyzhenkov-abb94a231/"
          alt="Igor"
          target="_blank"
          rel="noreferrer"
          className={s.link}
        >
          Igor Bulyzhenkov
        </a>
      </div>
    </footer>
  );
}

export default memo(Footer);
