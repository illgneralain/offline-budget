let db; 

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = function(e) {
    const db = e.target.result;
    db.createObjectStore('pending', { autoIncrement: true });
    store.clear();
  };

  request.onsuccess = function(e) {
    db = e.target.result;
   
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function(e) {
    console.log(`There was an error ${e.target.errorCode}`);
  };

  function saveRecord(record) {
    const transaction = db.transaction(['pending'], "readwrite");
    const store = transaction.objectStore('pending');
    store.add(record);
  }

  function checkDatabase() {
    const transaction = db.transaction(['pending'], "readwrite");
    const store = transaction.objectStore('pending');
    const getAll = store.getAll();

    all.onsuccess = function() {
        if (all.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                  },
            })
        
    } then (Response => Response.json()) 
    .then(() => {
        const transaction = db.transaction(['pending'], "readwrite");
        const store = transaction.objectStore('pending');
        store.clear();
    });
  }
};

window.addEventListener('online', checkDatabase);