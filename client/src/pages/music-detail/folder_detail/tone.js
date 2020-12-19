import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonButton,
  IonInput,
  IonCard,
  IonList,
  IonLabel,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonItemDivider,
  IonIcon,
} from "@ionic/react";
import { add, chevronForwardOutline } from "ionicons/icons";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";

const FrequencyChart = ({ data }) => {
  if (data == null) {
    return null;
  }

  /*const Data = data.map((input) => {
      input.data.filter((x) => x % 5 == 0);
    });*/
  data.map((input) => {
    input.data.filter((x) => x % 5 == 0);
  });
  //console.log(data);
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveLine
        data={data.map((input) => {
          return {
            id: input.id,
            data: input.data.filter(({ x }) => x % 5 == 0),
          };
        })}
        /*data={[
            {
              //id: "x",
              data: data.filter(({ x }) => x % 5 === 0),
              //data: data.filter(({ x }) => x),
            },
          ]}*/
        //data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        curve="step"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: data.length
            ? data[0].data.filter(({ x }) => x % 500 === 0).map(({ x }) => x)
            : [],
          legend: "",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "category10" }}
        enablePoints={false}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: -50,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

const Tone = () => {
  const { folderID } = useParams();
  const [folderName, setFolderName] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    window
      .fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/1/musics/folders/${folderID}`,
      )
      .then((response) => response.json())
      .then((folderName) => {
        setFolderName(folderName);
      });
  }, []);

  useEffect(() => {
    window
      .fetch(
        ` ${process.env.REACT_APP_API_ENDPOINT}/1/musics/folder_comp_tone/${folderID}`,
      )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/folder/${folderID}`} />
          </IonButtons>
          <IonTitle>
            Tone (folder{folderID}: {folderName})
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>{<FrequencyChart data={data} />}</IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tone;
