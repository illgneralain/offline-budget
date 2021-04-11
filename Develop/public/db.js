let db; 

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = function(e) {
    const db = request.result;
    db.createObjectStore('pending', { autoIncrement: true });
    store.clear();
  };