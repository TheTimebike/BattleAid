
function formatTypes2(moves, id, meth, headers_, gen_) {

    if (gen_ == null) {
        var gen_ = 6
    }

    var count = 0
    var generation2 = gen_
    var obj = [{"data": headers_}]
    var bar = new Promise((resolve, reject) => {
        $.each(moves, function(key, val) {
            $.getJSON(val.move.url, function(data) {
                //console.log(generation2);
                if (generation > moves[key].version_group_details.length - 1) {
                    var generation = moves[key].version_group_details.length - 1
                }
                var name = niceName(data.name);
                //console.log(generation2);
                //console.log(moves[key].version_group_details.length - 1);
                var level = moves[key].version_group_details[moves[key].version_group_details.length - 1].level_learned_at
                if (moves[key].version_group_details[moves[key].version_group_details.length - 1].move_learn_method.name == meth) {
                    var cat = niceName(data.damage_class.name);
                    var power = data.power
                    if (data.power == null) var power = "--"
                    var acc = data.accuracy
                    if (data.accuracy == null) var acc = "--"
                    var pp = data.pp
                    var priority = data.priority;
                    obj.push({"data":`<tr><td>${level}</td><td>${name}</td><td>${cat}</td><td>${power}</td><td>${acc}%</td><td>${pp}</td><td>${priority}</td>`, "lvl": level});
                }
                count++;
                if (count===Object.keys(moves).length) resolve();
            });
        });
    });
    bar.then(() => {
        obj = obj.sort(function(a, b) { 
            return a.lvl-b.lvl;
            });
        var mappedObj = obj.map(e => e.data).join("")
        document.getElementById(id).innerHTML = mappedObj;
    });
}

function createLearnCards(moves) {
    constructLearnMoves(moves);
    constructTmMoves(moves);
    constructEggMoves(moves);
    constructTutorMoves(moves);
}

function constructLearnMoves(moves, gen) {
    if (gen == null) {
        var gen = 6
    }
    if (document.getElementById("deleteableLearn") != null) {
        var columnDiv = document.getElementById("deleteableLearn");
    } else {
        var columnDiv = document.createElement("div");
    }
    var moves = moves;
    columnDiv.className = "column third"
    columnDiv.id = "deleteableLearn"
    columnDiv.innerHTML = `
        <div class="movecard">
            <div class="genbox">
                <button id="gen7learn" class="generationnumber">VII</button>
                <button id="gen6learn" class="generationnumber">VI</button>
                <button id="gen5learn" class="generationnumber">V</button>
                <button id="gen4learn" class="generationnumber">IV</button>
                <button id="gen3learn" class="generationnumber">III</button>
                <button id="gen2learn" class="generationnumber">II</button>
                <button id="gen1learn" class="generationnumber">I</button>
            </div>
            <h2 id="pokename">Learned Moves</h2>
            <table id="learnmoves">
            </table>
        </div>`

    var doc_body = document.getElementById("insertMoves");
    doc_body.appendChild(columnDiv);

    document.getElementById("gen7learn").addEventListener("click", function() {
        constructLearnMoves(moves, 6);
    });
    document.getElementById("gen6learn").addEventListener("click", function() {
        constructLearnMoves(moves, 5);
    });
    document.getElementById("gen5learn").addEventListener("click", function() {
        constructLearnMoves(moves, 4);
    });
    document.getElementById("gen4learn").addEventListener("click", function() {
        constructLearnMoves(moves, 3);
    });
    document.getElementById("gen3learn").addEventListener("click", function() {
        constructLearnMoves(moves, 2);
    });
    document.getElementById("gen2learn").addEventListener("click", function() {
        constructLearnMoves(moves, 1);
    });
    document.getElementById("gen1learn").addEventListener("click", function() {
        constructLearnMoves(moves, 0);
    });

    var header_ = "<tr><th> Level </th><th> Move </th><th> Category </th><th> Power </th><th> Accuracy </th><th> PP </th><th> Priority </th></tr>"
    formatTypes2(moves, "learnmoves", "level-up", header_, gen);
}


function constructTmMoves(moves) {
    var columnDiv = document.createElement("div");
    columnDiv.className = "column third"
    columnDiv.innerHTML = `
        <div class="movecard">
            <div class="genbox">
                <button onclick="alert()" class="generationnumber">VII</button>
                <button onclick="alert()" class="generationnumber">VI</button>
                <button onclick="alert()" class="generationnumber">V</button>
                <button onclick="alert()" class="generationnumber">IV</button>
                <button onclick="alert()" class="generationnumber">III</button>
                <button onclick="alert()" class="generationnumber">II</button>
                <button onclick="alert()" class="generationnumber">I</button>
            </div>
            <h2 id="pokename">TM Moves</h2>
            <table id="tmmoves">
            </table>
        </div>`

    var doc_body = document.getElementById("insertMoves");
    doc_body.appendChild(columnDiv);

    var header_ = "<tr><th> TM No. </th><th> Move </th><th> Category </th><th> Power </th><th> Accuracy </th><th> PP </th><th> Priority </th></tr>"
    formatTypes2(moves, "tmmoves", "machine", header_);
}

function constructEggMoves(moves) {
    var columnDiv = document.createElement("div");
    columnDiv.className = "column third"
    columnDiv.innerHTML = `
        <div class="movecard">
            <div class="genbox">
                <button onclick="alert()" class="generationnumber">VII</button>
                <button onclick="alert()" class="generationnumber">VI</button>
                <button onclick="alert()" class="generationnumber">V</button>
                <button onclick="alert()" class="generationnumber">IV</button>
                <button onclick="alert()" class="generationnumber">III</button>
                <button onclick="alert()" class="generationnumber">II</button>
                <button onclick="alert()" class="generationnumber">I</button>
            </div>
            <h2 id="pokename">Egg Moves</h2>
            <table id="eggmoves">
            </table>
        </div>`

    var doc_body = document.getElementById("insertMoves");
    doc_body.appendChild(columnDiv);

    var header_ = "<tr><th> Level </th><th> Move </th><th> Category </th><th> Power </th><th> Accuracy </th><th> PP </th><th> Priority </th></tr>"
    formatTypes2(moves, "eggmoves", "egg", header_);
}

function constructTutorMoves(moves) {
    var columnDiv = document.createElement("div");
    columnDiv.className = "column third"
    columnDiv.innerHTML = `
        <div class="movecard">
            <div class="genbox">
                <button onclick="alert()" class="generationnumber">VII</button>
                <button onclick="alert()" class="generationnumber">VI</button>
                <button onclick="alert()" class="generationnumber">V</button>
                <button onclick="alert()" class="generationnumber">IV</button>
                <button onclick="alert()" class="generationnumber">III</button>
                <button onclick="alert()" class="generationnumber">II</button>
                <button onclick="alert()" class="generationnumber">I</button>
            </div>
            <h2 id="pokename">Tutor Moves</h2>
            <table id="tutormoves">
            </table>
        </div>`

    var doc_body = document.getElementById("insertMoves");
    doc_body.appendChild(columnDiv);

    var header_ = "<tr><th> Level </th><th> Move </th><th> Category </th><th> Power </th><th> Accuracy </th><th> PP </th><th> Priority </th></tr>"
    formatTypes2(moves, "tutormoves", "tutor", header_);
}
