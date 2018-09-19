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
var name;
var destination;
var firstTrain;
var frequency;

$("#add-train").click(function(event){
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    console.log(name, destination, firstTrain, frequency);
});