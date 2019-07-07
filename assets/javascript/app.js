$(document).ready(function() {
    var now = moment()
    var twoHoursFromNow = moment().add(2, 'hours') // add 1
    console.log(twoHoursFromNow.format('YYYY-MM-DD hh:mm:ss'))
    console.log(moment().isBefore(twoHoursFromNow, 'hours')) // isAfter
    console.log(moment().diff(moment().add(2, 'hours'), 'hours'))
    console.log(moment().format('YYYY-MM-DD hh:mm:ss'))

    // Hide the form to add a train
    $('#newForm').hide();

    //Hide the schedule and show the form to add a new train
    $('#addTrain').click(function() {
        $('#tableHead1').hide();
        $('#table').hide();
        $('#addTrain').hide();
        $('#newForm').show();
    });

    // Cancel button from the new train form to bring you back to the schedule without adding a train
    $('#inputCancelBtn').click(function() {
        $('#inputname').val("")
        $('#inputDest').val("")
        $('#inputFreq').val("")
        $('#inputNext').val("")
        $('#inputMin').val("")
        $('#newForm').hide();
        $('#tableHead1').show();
        $('#table').show();
        $('#addTrain').show();
    });

    // Adding the database
    var config = {
        apiKey: "AIzaSyCQRs_Bz8QopR9zpXTNwIFEoMZ4SEyeVOg",
        authDomain: "trainschedule-14801.firebaseapp.com",
        databaseURL: "https://trainschedule-14801.firebaseio.com",
        storageBucket: "trainschedule-14801.appspot.com"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Button to add Trains
    $("#inputBtn").on("click", function(event) {
        event.preventDefault();

        // Grab the values of the form and make a var to make it easier to manipulate
        var trainName = $("#inputName").val().trim();
        var trainDest = $("#inputDest").val().trim();
        var trainFreq = $("#inputFreq").val().trim();
        var trainNext = $("#inputNext").val().trim();
        var trainMin = $("#inputMin").val().trim();

        // Creates local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            frequency: trainFreq,
            nextTrain: trainNext,
            minutesAway: trainMin
        };

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.nextTrain);
        console.log(newTrain.minutesAway);

        // Alert to signal successful addition of a train
        alert("Train successfully added");

        // Clears all of the text-boxes for future use
        $("#inputName").val("");
        $("inputDest").val("");
        $("#inputFreq").val("");
        $("inputNext").val("");
        $("inputMin").val("");
    });

    // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainFreq = childSnapshot.val().frequency;
        var trainNext = childSnapshot.val().nextTrain;
        // var trainNext = getNextTrainTime();
        var trainMin = childSnapshot.val().minutesAway

        // Train Info
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFreq);
        console.log(trainNext);
        console.log(trainMin);

        // Create the new row
        // Append the new row to the table
        var newName = $("#name").append($("<div class='name'></div>").text(trainName));
        var newDest = $("#dest").append($("<div class='dest'></div>").text(trainDest));
        var newFreq = $("#freq").append($("<div class='freq'></div>").text(trainFreq));
        var newNext = $("#next").append($("<div class='next'></div>").text(trainNext));
        var newMin = $("#min").append($("<div class='min'></div>").text(trainMin))

        $('#newForm').hide();
        $('#tableHead1').show();
        $('#table').show();
        $('#addTrain').show();
    });

    // function getNextTrainTime() {
    //     var firstTrain = moment().subtract(1, 'day');
    //     console.log("first Train", firstTrain);
    //     var nextTrain = (firstTrain._d - now);
    //     console.log(nextTrain);
    //     return value;
    // }
    // getNextTrainTime()
});