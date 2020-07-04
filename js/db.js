const dbPromised = idb.open("football-news", 1, function(upgradeDb) {
const articlesObjectStore = upgradeDb.createObjectStore("teamsObjectStore", {
  keyPath: "id"
});
articlesObjectStore.createIndex("post_title", "post_title", { unique: false });
}); 

function saveForLater(team) {
  dbPromised
  .then(function(db) {
    var tx = db.transaction("teamsObjectStore", "readwrite");
    var store = tx.objectStore("teamsObjectStore");
    console.log(team);
    store.add(team);
    return tx.complete;
  })
  .then(function() {
    console.log("Artikel berhasil di simpan.");
  });
}

function deleteData(id) {  
  return new Promise((resolve, reject)=>{
    dbPromised.then(db =>{
      const transaction = db.transaction("teamsObjectStore", `readwrite`);
      transaction.objectStore("teamsObjectStore").delete(id);
      return transaction;
    }).then(transaction =>{
      if(transaction.complete){
        resolve(true)
      }else{
        reject(new Error(transaction.onerror))
      }
    });
  });
}

function getAll(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      var tx = db.transaction("teamsObjectStore", "readonly");
      var store = tx.objectStore("teamsObjectStore");
      return store.getAll(id);
    })
    .then(function(teamsObjectStore) {
      resolve(teamsObjectStore);
    });
  });
}

const checkId = id =>{
  return new Promise((resolve, reject)=>{
    dbPromised.then(db =>{
      const transaction = db.transaction("teamsObjectStore", `readonly`);
      return transaction.objectStore("teamsObjectStore").get(id);
    }).then(data =>{
      if(data!==undefined){
        resolve(true)
      }else{
        resolve(false)
      }
    });
  });
}
