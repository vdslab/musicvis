import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IonItem, useIonViewWillEnter } from "@ionic/react";
import { request } from "../../serviceWorker/index";
import Liner from "../drawing/liner";
import { useAuth0 } from "@auth0/auth0-react";

const Decibel = () => {
  const { musicId } = useParams();
  const [ave, setAve] = useState();
  const [data, setData] = useState();

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    request(
      `${process.env.REACT_APP_API_ENDPOINT}/1/musics/${musicId}/decibel/ave`,
      getAccessTokenSilently
    ).then((data) => {
      setAve(data);
    });
  }, []);

  useEffect(() => {
    request(
      `${process.env.REACT_APP_API_ENDPOINT}/1/musics/${musicId}/decibel`,
      getAccessTokenSilently
    ).then((data) => {
      setData(data);
    });
  }, []);

  if (data == undefined) {
    return (
      <IonItem>
        <div>loading...</div>
      </IonItem>
    );
  }
  return (
    <div>
      <IonItem lines="none"> 安定度... {ave}</IonItem>
      <Liner data={data} />
    </div>
  );
};

export default Decibel;
