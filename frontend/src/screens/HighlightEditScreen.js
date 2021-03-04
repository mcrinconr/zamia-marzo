import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsHighlight, updateHighlight } from '../actions/highlightActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { HIGHLIGHT_UPDATE_RESET } from '../constants/highlightConstants';

export default function HighlightEditScreen(props) {
  const highlightId = props.match.params.id;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const highlightDetails = useSelector((state) => state.highlightDetails);
  const { loading, error, highlight } = highlightDetails;

  const highlightUpdate = useSelector((state) => state.highlightUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = highlightUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/highlightlist');
    }
    if (!highlight || highlight._id !== highlightId || successUpdate) {
      dispatch({ type: HIGHLIGHT_UPDATE_RESET });
      dispatch(detailsHighlight(highlightId));
    } else {
      setTitle(highlight.title);
      setText(highlight.text);
      setImage(highlight.image);
    }
  }, [highlight, dispatch, highlightId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update highlight
    dispatch(
      updateHighlight({
        _id: highlightId,
        title,
        text,
        image,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="editar-textos" onSubmit={submitHandler}>
        <h3>Edita la portada</h3>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>

          <label for="exampleFormControlTextarea1">Escribe una frase que quieras resaltar</label>
            <div class="form-row">
              <div class="col">
                <input class="form-control form-control-lg"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            </div>

              <label for="exampleFormControlTextarea1">Complementa tu frase</label>
                <div class="form-row">
                  <div class="col">
                    <input class="form-control form-control-lg"
                id="text"
                rows="3"
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                ></input>
              </div>
              </div>

              <label for="exampleFormControlTextarea1">Escribe la ruta de la imagen principal</label>
                <div class="form-row">
                  <div class="col-5">
                    <input class="form-control form-control-lg"
                id="image"
                type="text"
                placeholder="Escribe la ruta de tu imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            </div>

            <label for="exampleFormControlTextarea1">O selecciónala desde tu computador</label>
              <div class="form-row">
                <div class="col-5">
                  <input 
                type="file"
                id="imageFile"
                label="Selecciona tu imagen"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            </div>

            <button class="btn btn-warning btn-lg" type="submit">Actualizar</button>
          </>
        )}
      </form>
    </div>
  );
}
