import { useState } from "react";

export const useEditWithId = ({ dbName }) => {
  const [data, setData] = useState("");
  function editWithId(details, id) {
    var request = indexedDB.open(dbName, 1);
    request.onsuccess = function (event) {
      var db = event.target.result;
      if (db.objectStoreNames.contains(dbName)) {
        var transaction = db.transaction([dbName], "readwrite");

        var objectStore = transaction.objectStore(dbName);
        var getRequest = objectStore.get(id);

        getRequest.onsuccess = function (event) {
          var record = event.target.result;
          record = details;

          var updateDone = objectStore.put(record);
          updateDone.onsuccess = (event) => {
            const getreq = objectStore.getAll();
            getreq.onsuccess = (event) => {
              setData(event.target.result);
            };
          };
        };

        getRequest.onerror = function (event) {
          console.error("Error retrieving details:", event.target.error);
        };
      }
    };

    request.onerror = function (event) {
      console.error("Error opening detailsbase:", event.target.error);
    };
  }

  return [data, editWithId];
};