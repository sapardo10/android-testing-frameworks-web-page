var techniques = [];
var newCreated = false;

getTechniquesFromDb = async () => {
    if(_.isEmpty(techniques)){
     return fetch("http://localhost:3001/techniques/get")
        .then(data => data.json())
        .then(res => techniques=res)
        .catch(err => console.log("Error trying to fecth techniques from API"));
    }
};