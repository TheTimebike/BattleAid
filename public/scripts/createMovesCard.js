function lookoutMoves(moves) {
    var count2 = 0

    var movesToLookFor = ["taunt", "encore", "trick room", "imprison", "defog", "rapid spin", "sleep powder", "hypnosis", "spore", "pursuit", "trick", "skill swap", "rage powder",
    "follow me", "ally switch", "instruct", "tailwind", "volt switch", "u-turn", "flip turn", "parting shot", "entrainment", "simple beam", "switcheroo", "yawn", "fake out", "destiny bond"]
    movesToLookFor.sort()
    var notableMoveString = ""
    var bar2 = new Promise((resolve2, reject) => {
        $.each(movesToLookFor, function(key, val) {
            count2++
            var moveObject = null
            var moveObject = Object.values(moves).find(obj => obj.name.toLowerCase() === val)
            if (moveObject != null) {
                notableMoveString = notableMoveString.concat(`<div id="typeCardOne" class="typeCard highlight expand small ${moveObject["type"].toLowerCase()}"><h5 id="poketypeOne">${niceName(moveObject["name"])}</h5></div>`);
            }
            if (movesToLookFor.length == count2) resolve2();
        })
    });

    bar2.then(() => {
        var noteworthy = document.querySelector("#noteablemoves");
        noteworthy.innerHTML = notableMoveString
    });
}

function priorityMoves(moves) {
    var count2 = 0

    var priorityMoveString = ""
    var bar2 = new Promise((resolve, reject) => {
        $.each(moves, function(key, val) {
            count2++
            if(val.priority > 0) {
                priorityMoveString = priorityMoveString.concat(`<div id="typeCardOne" class="typeCard highlight expand small ${val["type"].toLowerCase()}"><h5 id="poketypeOne">${niceName(val["name"])}</h5></div>`);
            }
            if (Object.keys(moves).length == count2) resolve();
        })
    });

    bar2.then(() => {
        var prioritymoves = document.querySelector("#prioritymoves");
        prioritymoves.innerHTML = priorityMoveString
    });
}

function moveTypesKnown(moves) {
    var moveTypesKnown = []
    var moveString = ""
    var count2 = 0
    var bar2 = new Promise((resolve2, reject) => {
        $.each(moves, function(key, val) {
            count2++
            if (!moveTypesKnown.includes(val.type) && val.damage_class != "status") {
                moveTypesKnown.push(val.type);
                moveString = moveString.concat(`<div id="typeCardOne" class="typeCard highlight expand small ${val["type"].toLowerCase()}"><h5 id="poketypeOne">${niceName(val["type"])}</h5></div>`);
            }
            if (Object.keys(moves).length == count2) resolve2();
        })
    });

    bar2.then(() => {
        var noteworthy = document.querySelector("#movetypeknows");
        noteworthy.innerHTML = moveString
    }); 
}

function createMoveInfo(moves) {
    var columnDiv = document.createElement("div");

    columnDiv.className = "column wide"
    columnDiv.innerHTML = `
        <div class="card">
            <h2 id="pokename">Noteable Moves</h2>
            <hr>
            <div id="noteablemoves">
            
            </div>
            <h2 id="pokename">Priority Moves</h2>
            <hr>
            <div id="prioritymoves">
            
            </div>
        </div>`

    var doc_body = document.getElementById("insertMoves");
    doc_body.appendChild(columnDiv);

    lookoutMoves(moves);
    priorityMoves(moves);
    moveTypesKnown(moves)
}