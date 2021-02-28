function assessDamages(url, damages) {
    $.getJSON(url, function(data) {
        $.each(data.damage_relations.no_damage_from, function(key, val) {
            damages[val.name] = damages[val.name] * 0
        });
        $.each(data.damage_relations.half_damage_from, function(key, val) {
            damages[val.name] = damages[val.name] * 0.5
        });  
        $.each(data.damage_relations.double_damage_from, function(key, val) {
            damages[val.name] = damages[val.name] * 2
        });   
    });

    console.log("assess");    
    console.log(damages);
    return damages;
}

function _calculateTypeAdvantages(types) {
    var damages = {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 1,
        "poison" : 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 1,
        "fairy": 1 
    } 

    var damages = assessDamages(types[0].type.url, damages);
    var damages = assessDamages(types[1].type.url, damages);

    console.log("calc");
    console.log(damages);

    return damages;
}

function checkIfType(data, type) {
    if (data.no_damage_from.some(e => e.name === type)) {
        return 0;
    } else if (data.half_damage_from.some(e => e.name === type)) {
        return 0.5;
    } else if (data.double_damage_from.some(e => e.name === type)) {
        return 2;
    } else {
        return 1;
    }
}

function heavyLifting(damages, data) {
    var currentType = "normal"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "fire"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "water"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "electric"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "grass"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "ice"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "fighting"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "poison"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "ground"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "flying"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "psychic"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "bug"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "rock"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "ghost"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "dragon"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "dark"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "steel"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    var currentType = "fairy"
    damages[currentType] = damages[currentType] * checkIfType(data.damage_relations, currentType);
    return damages;
}

function secondBatch(url, damages) {
    if (typeof url !== "undefined") {
        $.getJSON(url, function(data) {
            damages = heavyLifting(damages, data);
            formatTypes(damages, 0, "immuneDiv");
            formatTypes(damages, 0.25, "sResistDiv");
            formatTypes(damages, 0.5, "resistDiv");
            formatTypes(damages, 1, "normalDiv");
            formatTypes(damages, 2, "weakDiv");
            formatTypes(damages, 4, "sWeakDiv");
        });
    } else {
        formatTypes(damages, 0, "immuneDiv");
        formatTypes(damages, 0.25, "sResistDiv");
        formatTypes(damages, 0.5, "resistDiv");
        formatTypes(damages, 1, "normalDiv");
        formatTypes(damages, 2, "weakDiv");
        formatTypes(damages, 4, "sWeakDiv");
    }

}

function calculateTypeAdvantages(types) {
    var damages = {
        "normal": 1,
        "fire": 1,
        "water": 1,
        "electric": 1,
        "grass": 1,
        "ice": 1,
        "fighting": 1,
        "poison" : 1,
        "ground": 1,
        "flying": 1,
        "psychic": 1,
        "bug": 1,
        "rock": 1,
        "ghost": 1,
        "dragon": 1,
        "dark": 1,
        "steel": 1,
        "fairy": 1 
    }

    $.getJSON(types[0].type.url, function(data) {
        damages = heavyLifting(damages, data);
        secondBatch(types[1].type.url, damages);
    });
}

function formatTypes(test, eff, id) {
    var thing = ""
    var bar = new Promise((resolve, reject) => {
        $.each(test, function(key, val) {
            if(eff===val) {
                console.log(key + " " + test[key] + " " + val + " " + eff);
                key = key.charAt(0).toUpperCase() + key.slice(1);
                thing = thing.concat(`<div id="typeCardOne" class="typeCard small ${key.toLowerCase()}"><h5 id="poketypeOne">${key}</h5></div>`);
            }
            if (Object.keys(test).indexOf(key)===Object.keys(test).length-1 || Object.keys(test).indexOf(key) === -1) resolve();
        });
    });

    bar.then(() => {
        if (thing==="") {
            thing = thing.concat(`<div id="typeCardOne" class="typeCard small ${"N/A".toLowerCase()}"><h5 id="poketypeOne">${"N/A"}</h5></div>`);
        }
        document.getElementById(id).innerHTML = thing;
    });
}

function createPokemonInfo(name, id, types, url, stats) {
    var columnDiv = document.createElement("div");
    if (types.length < 2) {
        types.push({"type": {"url": "N/A"}});
    }
    types = calculateTypeAdvantages(types);
    columnDiv.className = "rightpokemoncolumn"
    columnDiv.innerHTML = `
        <div class="card">
            <h2 id="pokename">Type Advantages</h2>
            <hr>
            <p1> Immune To </p1>
            <div id="immuneDiv">
                
            </div>
            <p1> Strong Resistance To </p1>
            <div id="sResistDiv">
                
            </div>
            <p1> Resistance To </p1>
            <div id="resistDiv">
                
            </div>
            <p1> Normal To </p1>
            <div id="normalDiv">
                
            </div>
            <p1> Weak To </p1>
            <div id="weakDiv">
                
            </div>
            <p1> Very Weak To </p1>
            <div id="sWeakDiv">
                
            </div>
            
        </div>`

    var doc_body = document.getElementById("insertCards");
    doc_body.appendChild(columnDiv);

}