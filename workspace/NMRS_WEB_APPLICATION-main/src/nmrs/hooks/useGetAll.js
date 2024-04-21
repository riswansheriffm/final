import { useEffect, useState } from "react";

export const useGetAll = ({ dbName }) => {
  const [data, setData] = useState([]);
  // console.log(data, "vdbNamedbNamedbName");
  useEffect(() => {
    var request = indexedDB.open(dbName, 1);
    request.onsuccess = function (event) {
      var db = event.target.result;
      if (db.objectStoreNames.contains(dbName)) {
        var transaction = db.transaction([dbName], "readonly");

        var objectStore = transaction.objectStore(dbName);
        var getRequest = objectStore.getAll();

        getRequest.onsuccess = function (event) {
          setData(event.target.result);
        };

        getRequest.onerror = function (event) {
          console.error("Error retrieving data:", event.target.error);
        };
      } else {
        setData([]);
      }
    };

    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
    };
  }, [dbName]);
  return data;
};
