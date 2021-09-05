import {useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";
import * as SignalR from "@aspnet/signalr";
import {useDispatch} from "react-redux";
import {getRouletteResult, updateRouletteGame} from "../store/actions/Roulette/rouletteActions";
import {config} from "../config/config";

export const useRoulette = () => {

  const dispatch = useDispatch()

  const [connection, setConnection] = useState<any>(null)

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${config.socketUri}/wssroulette`, {
        withCredentials: false,
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          connection.on('NewBetAdded', (payload: any) => {
            dispatch(updateRouletteGame(payload))
          });

          connection.on('RouletteGameResult', (payload: any) => {
            dispatch(getRouletteResult(payload))
          });
        })
        .catch((e: any) => console.log('Connection failed: ', e));
    }
  }, [connection]);
}