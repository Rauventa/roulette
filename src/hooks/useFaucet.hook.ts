import {useContext, useEffect, useState} from "react";
import {HubConnectionBuilder} from "@microsoft/signalr";
import * as SignalR from "@aspnet/signalr";
import {useDispatch} from "react-redux";
import {AuthContext} from "../context/AuthContext";
import {getFaucetHistory} from "../store/actions/Faucet/faucetActions";

export const useFaucet = () => {
  const [connection, setConnection] = useState<any>(null)

  const {token} = useContext(AuthContext)

  const dispatch = useDispatch()

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://gbtc-b.azurewebsites.net/wssfaucet", {
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
          connection.on('NewFaucetPayout', () => {
            dispatch(getFaucetHistory(token))
          });
        })
        .catch((e: any) => console.log('Connection failed: ', e));
    }
  }, [connection]);
}
