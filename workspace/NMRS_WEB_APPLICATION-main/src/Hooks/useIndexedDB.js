export default function useIndexedDB() {
  const addData = ({ details, dbName }) => {
    const openDB = async () => {
      const request = indexedDB.open(dbName, 1);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(dbName)) {
          db.createObjectStore(dbName, {
            keyPath: "id",
            autoIncrement: true, // Use auto-incrementing keys
          });
        }
      };

      request.onsuccess = function (event) {
        const db = event.target.result;

        const transaction = db.transaction([dbName], "readwrite");
        const objectStore = transaction.objectStore(dbName);

        const data = details;
        const addRequest = objectStore.add(data); // No need to pass a key here

        addRequest.onsuccess = function (event) {
          console.log("Value added successfully");
        };

        addRequest.onerror = function (event) {
          console.error("Error adding value:", event.target.error);
        };

        transaction.oncomplete = function () {
          console.log("Transaction completed");
        };

        transaction.onerror = function (event) {
          console.error("Transaction error:", event.target.error);
        };
      };

      request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
      };
    };
    openDB();
  };

  return addData;
}
