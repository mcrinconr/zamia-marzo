import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsFooter, updateFooter } from '../actions/footerActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { FOOTER_UPDATE_RESET } from '../constants/footerConstants';

export default function FooterEditScreen(props) {
  const footerId = props.match.params.id;
  const [nosotros, setNosotros] = useState('');
  const [nosotrosParrafo, setNosotrosParrafo] = useState('');
  const [nosotrosLinea1, setNosotrosLinea1] = useState('');
  const [nosotrosLinea2, setNosotrosLinea2] = useState('');
  const [nosotrosLinea3, setNosotrosLinea3] = useState('');
  const [enlaces, setEnlaces] = useState('');
  const [enlace1, setEnlace1] = useState('');
  const [enlace2, setEnlace2] = useState('');
  const [social, setSocial] = useState('');
  const [social1, setSocial1] = useState('');
  const [social2, setSocial2] = useState('');
  const [social3, setSocial3] = useState('');
  const [social4, setSocial4] = useState('');
  const [social5, setSocial5] = useState('');
  const [correo, setCorreo] = useState('');
  const [copyright, setCopyright] = useState('');

  const footerDetails = useSelector((state) => state.footerDetails);
  const { loading, error, footer } = footerDetails;

  const footerUpdate = useSelector((state) => state.footerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = footerUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/footerlist');
    }
    if (!footer || footer._id !== footerId || successUpdate) {
      dispatch({ type: FOOTER_UPDATE_RESET });
      dispatch(detailsFooter(footerId));
    } else {
      setNosotros(footer.nosotros);
      setNosotrosParrafo(footer.nosotrosParrafo);
      setNosotrosLinea1(footer.nosotrosLinea1);
      setNosotrosLinea2(footer.nosotrosLinea2);
      setNosotrosLinea3(footer.nosotrosLinea3);
      setEnlaces(footer.enlaces);
      setEnlace1(footer.enlace1);
      setEnlace2(footer.enlace2);
      setSocial(footer.social);
      setSocial1(footer.social1);
      setSocial2(footer.social2);
      setSocial3(footer.social3);
      setSocial4(footer.social4);
      setSocial5(footer.social5);
      setCorreo(footer.correo);
      setCopyright(footer.copyright);
    }
  }, [footer, dispatch, footerId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update footer
    dispatch(
      updateFooter({
        _id: footerId,
        nosotros,
        nosotrosParrafo,
        nosotrosLinea1,
        nosotrosLinea2,
        nosotrosLinea3,
        enlaces,
        enlace1,
        enlace2,
        social,
        social1,
        social2,
        social3,
        social4,
        social5,
        correo,
        copyright,
      })
    );
  };

  return (
    <div>
      <form className="editar-textos" onSubmit={submitHandler}>
          <h3>Edita el pie de página</h3>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div class="form-group">
              <label htmlFor= "nosotrosParrafo">Escribe sobre tu empresa</label>
              <textarea class="form-control form-control-lg"
              id="nosotrosParrafo"
              rows="3"
              type="text"
              placeholder="Enter nosotros párrafo"
              value={nosotrosParrafo}
              onChange={(e) => setNosotrosParrafo(e.target.value)}></textarea>
            </div>

              <label htmlFor= "enlaces">Añade más información. Ej: horarios, dirección...</label>
            <div class="form-row">
              <div class="col-5">
                <input class="form-control form-control-lg" placeholder="Horarios, dirección..."
                  id="enlaces"
                  type="text"
                  value={enlaces}
                  onChange={(e) => setEnlaces(e.target.value)}/>
              </div>
              <div class="col-7">
                <input class="form-control form-control-lg"
                id="enlace1"
                type="text"
                placeholder="Escribe tu información"
                value={enlace1}
                onChange={(e) => setEnlace1(e.target.value)}/>
              </div>
              <div class="col-7 ml-auto">
                <input class="form-control form-control-lg"
                id="enlace2"
                type="text"
                placeholder="Escribe tu información"
                value={enlace2}
                onChange={(e) => setEnlace2(e.target.value)}/>
              </div>
            </div>

            <div class="form-group row">
              <label htmlFor= "social1" class="col-sm-2 col-form-label">Facebook</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-lg" placeholder="Ingresa el link del facebook de tu empresa"
                  id="social1"
                  value={social1}
                  onChange={(e) => setSocial1(e.target.value)}/>
              </div>
            </div>
            <div class="form-group row">
              <label htmlFor= "social2" class="col-sm-2 col-form-label">Instagram</label>
              <div class="col-sm-10">
                <input
                id="social2"
                type="text"
                value={social2}
                onChange={(e) => setSocial2(e.target.value)}
                class="form-control form-control-lg" placeholder="Ingresa el link del instagram de tu empresa" />
              </div>
            </div>
            <div class="form-group row">
              <label htmlFor= "social3" class="col-sm-2 col-form-label">Twitter</label>
              <div class="col-sm-10">
                <input
                id="social3"
                type="text"
                value={social3}
                onChange={(e) => setSocial3(e.target.value)}
                class="form-control form-control-lg" placeholder="Ingresa el link del twitter de tu empresa" />
              </div>
            </div>
            <div class="form-group row">
              <label htmlFor= "social4" class="col-sm-2 col-form-label">YouTube</label>
              <div class="col-sm-10">
                <input
                id="social4"
                type="text"
                value={social4}
                onChange={(e) => setSocial4(e.target.value)}
                class="form-control form-control-lg" placeholder="Ingresa el link del canal de YouTube de tu empresa" />
              </div>
            </div>
            <div class="form-group row">
              <label htmlFor= "social5" class="col-sm-2 col-form-label">Correo</label>
              <div class="col-sm-10">
              <input
              id="social5"
              type="email"
              value={social5}
              onChange={(e) => setSocial5(e.target.value)}
              class="form-control form-control-lg"
              placeholder="Ingresa el correo de tu empresa" />
              </div>
            </div>

            <div class="form-group">
              <label htmlFor="copyright">Copyright</label>
              <input type="text" class="form-control form-control-lg"
              id="copyright"
              placeholder="Ingresa copyright"
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)} />
            </div>

            <button class="btn btn-warning btn-lg" type="submit">Actualizar</button>
          </>
        )}
      </form>
    </div>
  );
}
