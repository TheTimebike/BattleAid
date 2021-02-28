function createTyping(types, effeciency, id) {
    var thing = ""
    var bar = new Promise((resolve, reject) => {
        $.each(types, function(key, val) {
            if (effeciency === val["multiplier"]) {
                thing = thing.concat(`
                <a href="type.html?type=${val["id"]}" id="typeCardOne" class="highlight expand typeCard small ${val["name"].toLowerCase()}">
                    <h5 id="poketypeOne" class="antiexpand">${val["name"]}</h5>
                </a>`
                );
            }
            if (Object.keys(types).indexOf(key)===Object.keys(types).length - 1) resolve();
        });
    });

    bar.then(() => {
        if (thing==="") {
            thing = thing.concat(`
            <div id="typeCardOne" class="typeCard small ${"N/A".toLowerCase()}">
                <h5 id="poketypeOne">${"N/A"}</h5>
            </div>`
            );
        }
        document.getElementById(id).innerHTML = thing;
    });
}

function createPokemonInfo(types, uuid) {
    var columnDiv = document.createElement("div");

    columnDiv.className = "rightpokemoncolumn"
    columnDiv.innerHTML = `
        <div class="card">
            <h2 id="pokename">Type Advantages</h2>
            <p1> Immune To </p1>
            <hr>
            <div id="immuneDiv">
                
            </div>
            <p1> Strong Resistance To </p1>
            <hr>
            <div id="sResistDiv">
                
            </div>
            <p1> Resistance To </p1>
            <hr>
            <div id="resistDiv">
                
            </div>
            <p1> Normal To </p1>
            <hr>
            <div id="normalDiv">
                
            </div>
            <p1> Weak To </p1>
            <hr>
            <div id="weakDiv">
                
            </div>
            <p1> Very Weak To </p1>
            <hr>
            <div id="sWeakDiv">
                
            </div>
            <h2> Knows Attacking Moves Of The Types </h2>
            <hr>
            <div id="movetypeknows">
                
            </div>
        </div>`

    var doc_body = document.getElementById("insertCards");
    doc_body.appendChild(columnDiv);

    createTyping(types, 0, "immuneDiv");
    createTyping(types, 0.25, "sResistDiv");
    createTyping(types, 0.5, "resistDiv");
    createTyping(types, 1, "normalDiv");
    createTyping(types, 2, "weakDiv");
    createTyping(types, 4, "sWeakDiv");

}