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

var database = firebase.database();

$("#add-train").click(function(event){
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    //Time validation
    if (!moment(firstTrainTime, "HH:mm").isValid()){
        alert("Please enter time in military time.");
        $("#first-train-input").focus();
    }
    //Number validation
    else if(!parseInt(trainFrequency)){
        alert("Please enter a number.");
        $("#frequency-input").focus();
    }
    else{
        //uploads train info to database
        database.ref().push({
            name: trainName,
            destination: trainDestination,
            firstTrain: firstTrainTime,
            frequency: trainFrequency
        });

        $("#train-added-modal").modal();

        // Clears all of the text-boxes
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    };
});


// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;

    //calculate next arrival
    // Assumptions
    var tFrequency = trainFrequency;

    // Time is firstTrainTime
    var firstTime = firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    var tMinutesTilTrain = tFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTilTrain, "minutes");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(tFrequency + " minutes"),
        $("<td>").text(moment(nextTrain).calendar()),
        $("<td>").text(tMinutesTilTrain + " minutes")
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});
