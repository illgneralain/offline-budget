let db; 

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = function(e) {
    const db = e.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
    store.clear();
  };

  request.onsuccess = function(e) {
    db = e.target.result;
    // tx = db.transaction(storeName, "readwrite");
    // store = tx.objectStore(storeName);
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(e) {
    console.log(`There was an error ${e.target.errorCode}`);
  };