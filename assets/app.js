// Initialize Firebase
var config = {
    apiKey: "AIzaSyCXhx1Bq2x6kYk2McMQu39ePeRfiZsi8B4",
    authDomain: "train-scheduler-1be87.firebaseapp.com",
    databaseURL: "https://train-scheduler-1be87.firebaseio.com",
    projectId: "train-scheduler-1be87",
    storageBucket: "train-scheduler-1be87.appspot.com",
    messagingSenderId: "1011247684183"
};
firebase.initializeApp(config);

var database = firebase.database()

$("#add-train").click(function(event){
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrainTime,
        frequency: trainFrequency
    }

    //uploads train info to database
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrainTime,
        frequency: trainFrequency
    });

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train added")

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    // // Prettify the employee start
    // var empStartPretty = moment(empStart).format("MM/DD/YYYY");
    // console.log('Start Date', empStartPretty)
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart), "months");
    // console.log(empMonths);

    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(trainFrequency)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});