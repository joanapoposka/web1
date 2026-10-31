function randomTyres() {
    var number = Math.floor(Math.random() * 2);

    if (number == 0) {
        return "Soft";
    } else {
        return "Hard";
    }
}
var drivers = [
    {
        name: "Max Verstappen",
        team: "Red Bull",
        speed: 95,
        skill: 98,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Charles Leclerc",
        team: "Ferrari",
        speed: 94,
        skill: 96,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Lewis Hamilton",
        team: "Ferrari",
        speed: 93,
        skill: 97,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Lando Norris",
        team: "McLaren",
        speed: 96,
        skill: 95,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Oscar Piastri",
        team: "McLaren",
        speed: 95,
        skill: 94,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "George Russell",
        team: "Mercedes",
        speed: 93,
        skill: 95,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Kimi Antonelli",
        team: "Mercedes",
        speed: 91,
        skill: 90,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Fernando Alonso",
        team: "Aston Martin",
        speed: 90,
        skill: 97,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Carlos Sainz",
        team: "Williams",
        speed: 92,
        skill: 94,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    },
    {
        name: "Alex Albon",
        team: "Williams",
        speed: 90,
        skill: 92,
        tyres: randomTyres(),
        time: 0,
        status: "Ready",
        pitStopDone: false,
        pitLap: 3 + Math.floor(Math.random() * 6),
        lapsCompleted: 0,
        retired: false
    }
];

function showDrivers() {
    var table = document.getElementById("raceTable");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (var i = 0; i < drivers.length; i++) {
        var row = table.insertRow();

        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = drivers[i].name;
        row.insertCell(2).innerHTML = drivers[i].team;
        row.insertCell(3).innerHTML = drivers[i].tyres;
        row.insertCell(4).innerHTML = drivers[i].time.toFixed(2);
        row.insertCell(5).innerHTML = drivers[i].status;
    }
}

window.addEventListener("load", function() {
    showDrivers();
});

function calculateLapTime(driver) {
    var random = Math.random() * 3;

    var lapTime = 100 - driver.speed * 0.2 - driver.skill * 0.1 + random;

    if (driver.tyres == "Soft") {
        lapTime -= 1;
    } else {
        lapTime += 0.5;
    }
    return lapTime;
}

function pitStop(driver) {
    if (driver.tyres == "Soft") {
        driver.tyres = "Hard";
    } else {
        driver.tyres = "Soft";
    }

    driver.time += 20;
    driver.pitStopDone = true;
    
    if (driver.status == "Racing") {
        driver.status = "Pit Stop";
    } else {
        driver.status += " / Pit Stop";
    }

    addEvent(driver.name + " enters the pits! New tyres: " + driver.tyres,"pit");
}

function addEvent(message, type) {
    var events = document.getElementById("raceEvents");

    if (events.innerHTML.includes("Waiting")) {
        events.innerHTML = "";
    }

    var paragraph = document.createElement("p");

    paragraph.innerHTML = "Lap " + currentLap + " - " + message;
    paragraph.className = type;

    events.prepend(paragraph);

    if (events.children.length > 5) {
        events.removeChild(events.lastElementChild);
    }
}

function checkSpin(driver) {
    var chance = Math.random();

    if (chance < 0.03) {
        driver.retired = true;
        driver.status = "DNF";
        addEvent(driver.name + " is OUT of the race!","dnf");
    } else if (chance < 0.13) {
        driver.time += 5;
        addEvent(driver.name + " spins! +5 seconds","spin");

        if (driver.status == "Racing") {
            driver.status = "Spin";
        } else {
            driver.status += " / Spin";
        }
    }
}

function checkSafetyCar() {
    if (currentLap < 3) {
        return false;
    }

    var chance = Math.random();

    if (chance < 0.15) {
        return true;
    }

    return false;
}

function finishRace() {
    var winner = null;

    for (var i = 0; i < drivers.length; i++) {
        if (drivers[i].retired == false) {
            winner = drivers[i];
            break;
        }
    }

    if (winner != null) {
        alert("🏆 WINNER: " + winner.name);
        document.getElementById("winnerMessage").innerHTML = "🏆 WINNER: " + winner.name;
    } else {
        alert("Race finished - No winner!");
        document.getElementById("winnerMessage").innerHTML = "🏁 RACE FINISHED - NO WINNER!";
    }

    button.disabled = true;
}

var currentLap = 0;
var totalLaps = 10;
var previousLeader = null;

var button = document.getElementById("nextLap");

button.addEventListener("click", function() {
    if (currentLap < totalLaps) {
        currentLap++;

        if (currentLap == 1) {
            addEvent("RACE STARTED! 🏁", "start");
        }

        var safetyCar = checkSafetyCar();

        if (safetyCar == true) {
            addEvent("SAFETY CAR DEPLOYED!","safety");
        }

        for (var i = 0; i < drivers.length; i++) {

            if (drivers[i].retired == false) {

                var lapTime = calculateLapTime(drivers[i]);

                if (safetyCar == true) {
                    lapTime += 10;
                    drivers[i].status = "Safety Car";
                } 
                else {
                    drivers[i].status = "Racing";
                }

                drivers[i].time += lapTime;

                checkSpin(drivers[i]);

                if (drivers[i].retired == false) {
                    drivers[i].lapsCompleted++;
                }

                if (drivers[i].retired == false &&
                    currentLap == drivers[i].pitLap &&
                    drivers[i].pitStopDone == false) {

                    pitStop(drivers[i]);
                }
            }
        }

        
        drivers.sort(function(a, b) {

            if (a.retired && !b.retired) {
                return 1;
            }

            if (!a.retired && b.retired) {
                return -1;
            }

            if (a.retired && b.retired) {
                if (a.lapsCompleted != b.lapsCompleted) {
                    return b.lapsCompleted - a.lapsCompleted;
                }

                return a.time - b.time;
            }

            return a.time - b.time;
        });

        if (drivers[0].retired == false) {
            var currentLeader = drivers[0].name;

            if (previousLeader != null && previousLeader != currentLeader) {
                addEvent(currentLeader + " TAKES THE LEAD! 🏁","leader");
            }

            previousLeader = currentLeader;
        }

        showDrivers();

        document.getElementById("lapInfo").innerHTML = "Lap: " + currentLap + " / " + totalLaps;

        if (currentLap == totalLaps) {
            finishRace();
        }
    }
});
