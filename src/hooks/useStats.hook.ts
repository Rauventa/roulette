import {useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";
import * as SignalR from "@aspnet/signalr";
import {useDispatch} from "react-redux";
import { updateStats } from "../store/actions/Stats/statsActions";

export const useStats = () => {
  const [connection, setConnection] = useState<any>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://gbtc-b.azurewebsites.net/wssstats", {
        withCredentials: false,
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets
      })
      // .configureLogging({
      //   log: function (logLevel, message) {
      //     // console.log(new Date().toISOString() + ": " + message);
      //   }
      // })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          connection.on('StatisticsUpdated', (newStatistics: any) => {
            dispatch(updateStats(newStatistics))
          });
        })
        .catch((e: any) => console.log('Connection failed: ', e));
    }
  }, [connection]);
}
