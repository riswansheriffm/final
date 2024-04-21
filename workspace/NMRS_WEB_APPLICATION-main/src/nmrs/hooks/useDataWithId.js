import { useEffect, useState } from "react";

export const useDataWithId = ({ dbName, id }) => {
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchData = () => {
      var request = indexedDB.open(dbName, 1);
      request.onsuccess = function (event) {
        var db = event.target.result;
        if (db.objectStoreNames.contains(dbName)) {
          var transaction = db.transaction([dbName], "readonly");
          var objectStore = transaction.objectStore(dbName);
          var getRequest = objectStore.get(id);

          getRequest.onsuccess = function (event) {
            setDetails(event.target.result);
            return () => {
              request.result.close();
            };
          };

          getRequest.onerror = function (event) {
            console.error("Error retrieving details:", event.target.error);
          };
        } else {
          setDetails([]);
        }
      };

      request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
      };
    };

    fetchData();
  }, [dbName, id]);

  return details;
};
