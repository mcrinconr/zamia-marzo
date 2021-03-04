import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsInsight, updateInsight } from '../actions/insightActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INSIGHT_UPDATE_RESET } from '../constants/insightConstants';

export default function InsightEditScreen(props) {
  const insightId = props.match.params.id;
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const insightDetails = useSelector((state) => state.insightDetails);
  const { loading, error, insight } = insightDetails;

  const insightUpdate = useSelector((state) => state.insightUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = insightUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/insightlist');
    }
    if (!insight || insight._id !== insightId || successUpdate) {
      dispatch({ type: INSIGHT_UPDATE_RESET });
      dispatch(detailsInsight(insightId));
    } else {
      setTitle(insight.title);
      setText(insight.text);
      setImage(insight.image);
    }
  }, [insight, dispatch, insightId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update insight
    dispatch(
      updateInsight({
        _id: insightId,
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
        <h3>Edita tu foto con texto</h3>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>

          <label for="exampleFormControlTextarea1">Resalta un producto, blog o lo que quieras!</label>
            <div class="form-row">
              <div class="col">
                <input class="form-control form-control-lg"
                  id="title"
                  type="text"
                  placeholder="Describe de qué se trata"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
            </div>

              <label for="exampleFormControlTextarea1">Complementa un poco más la información</label>
                <div class="form-row">
                  <div class="col">
                    <input class="form-control form-control-lg"
                id="text"
                rows="3"
                type="text"
                placeholder="Puedes complementar la información aquí"
                value={text}
                onChange={(e) => setText(e.target.value)}
                ></input>
              </div>
              </div>

              <label for="exampleFormControlTextarea1">Escribe la ruta de la imagen</label>
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
                <div class="col-5 seleccionar-imagen">
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
