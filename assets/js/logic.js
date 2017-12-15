  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyD-gsXxjgr0_GwmnebMXKxhp5GY1CriZ0M",
    authDomain: "trains-39323.firebaseapp.com",
    databaseURL: "https://trains-39323.firebaseio.com",
    projectId: "trains-39323",
    storageBucket: "",
    messagingSenderId: "1095552529208"
  };

  firebase.initializeApp(config);
     

  var database= firebase.database();

  // SUBMIT BUTTON // 

  $("#addTrainBtn").on("click", function (){

  // Variables for user  Input on FORM //


    var newName = $("#trainName").val().trim();

    var newDestination = $("#destination").val().trim();

    var newFirstTime = $("#firstTime").val().trim();

    var newFrequency = $ ("#frequency").val().trim();
    console.log(database.ref());
    var newTrain = {
      name: newName,
      dest: newDestination,
      first: newFirstTime,
      freq: newFrequency
    }
    database.ref().push(newTrain);
    console.log(database.ref());
   // FORM,clears fields //

   $("#trainName").val("");
   $("#destination").val("");
   $("#firstTime").val("");
   $("#frequency").val(""),

   console.log("newTrain: " + newTrain);
   console.log("Name: " + newTrain.name);
   console.log("destination: " + newTrain.destination);
   console.log("first Time:" + newTrain.first);
   console.log("frequency: " + newTrain.freq);

   
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log ("Child Snapshot Value: " + childSnapshot.val());
     
     var newName = childSnapshot.val().name;
     var newDestination = childSnapshot.val().dest;
     var newFirstTime = childSnapshot.val().dest;
     var newfrequency = childSnapshot.val().freq;

     console.log('newFirstTime', newFirstTime)
     console.log("newName: "+ newName);
     console.log("newDestination: "+ newDestination);
     console.log("newfrequency: " + newfrequency);

     //*TIME Momemnt.JS //

     var currentTime = moment();
     console.log(moment(currentTime).format("hh:mm"));

     var firsTimeConverted = moment (newFirstTime, "hh:mm").substract(1,"days");
     timeDiff = moment().diff(moment(firsTimeConverted), "minutes");
     console.log("Difference in time: " +timeDiff);

     //TIME APART
     
     var remainder = timeDiff % newfrequency;
     console.log("Remainder: ", remainder);

     // MINS. AWAY  //

     var minsUntilTrain = newfrequency - remainder;
     console.log ("Time Til Train: " + minsUntilTrain);

     // NEXT TRAIN //

     var nextTrainTime = moment().add(minsUntilTrain, "minutes");
     console.log ("Next arrival: " + moment(nextTrainTime).format("hh:mm"));

     $("#trainTable > tbody").append("<tr><td>"+ newName +"</td><td>" + newDestination + "</td><td>" + newfrequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain);

     return false;
  });
  