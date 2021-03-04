import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  const {footer} = props;
/*  const facebook = <a class="social-button facebook" href="#"></a>;
  const instagram = <a class="social-button instagram" href="#"></a>;
  const twitter = <a class="social-button twitter" href="#"></a>;
  const youtube = <a class="social-button youtube" href="#"></a>;*/
  return (
    <footer>
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-6 nosotros">
                <h3 class="">{footer.nosotros}</h3>
                <p>{footer.nosotrosParrafo}</p>
            </div>
            <div class="col-xs-12 col-md-3">
                <h3 >{footer.enlaces}</h3>
                <ul className="enlaces-rapidos">
                  <li>
                    <Link href="#">{footer.enlace1}</Link>
                  </li>
                  <li>
                    <Link href="#">{footer.enlace2}</Link>
                  </li>
                </ul>
            </div>
            <div class="col-xs-12 col-md-3">
              <h3>{footer.social}</h3>
              <div class="rounded-social-buttons ml-auto">
                <a class="social-button facebook float-left" href="https://www.facebook.com/Zamiaproductos/" target="_blank"></a>
                <a class="social-button instagram float-left" href="https://www.instagram.com/zamia_naturaleza_latina/" target="_blank"></a>
              </div>
            </div>
          </div>
        </div>
      <div class="footer-copyright">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <p>{footer.copyright}</p>
            </div>
          </div>
        </div>
      </div>
  </footer>
  )
}
