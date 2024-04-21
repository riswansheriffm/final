export const useDeleteWithId = ({ dbName }) => {
  function deleteWithKey(key) {
    var request = indexedDB.open(dbName, 1);
    request.onsuccess = function (event) {
      var db = event.target.result;
      if (db.objectStoreNames.contains(dbName)) {
        var transaction = db.transaction([dbName], "readwrite");

        var objectStore = transaction.objectStore(dbName);
        var getRequest = objectStore.delete(key);

        getRequest.onsuccess = function (event) {
          console.log(event.target.result);
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

  return deleteWithKey;
};
