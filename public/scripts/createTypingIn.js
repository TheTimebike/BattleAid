function createTyping(types, effeciency, id) {
    var thing = ""
    var bar = new Promise((resolve, reject) => {
        $.each(types, function(key, val) {
            if (effeciency === val["multiplier"]) {
                thing = thing.concat(`<a href="type.html?type=${val["id"]}" id="typeCardOne" class="highlight expand typeCard small ${key.toLowerCase()}"><h5 id="poketypeOne">${key}</h5></a>`);                
            }
            if (Object.keys(types).indexOf(key)===Object.keys(types).length - 1) resolve();
        });
    });

    bar.then(() => {
        if (thing==="") {
            thing = thing.concat(`<div id="typeCardOne" class="typeCard small ${"N/A".toLowerCase()}"><h5 id="poketypeOne">${"N/A"}</h5></div>`);
        }
        document.getElementById(id).innerHTML = thing;
    });
}

function createTypingIn(types, name) {
    var columnDiv = document.createElement("div");

    columnDiv.className = "righttypecolumn"
    columnDiv.innerHTML = `
        <div class="card">
            <h2 id="pokename">Incoming Effectiveness</h2>
            <p1> Immune To </p1>
            <hr>
            <div id="immuneDivIn">
                
            </div>
            <p1> Resistance To </p1>
            <hr>
            <div id="resistDivIn">
                
            </div>
            <p1> Normal To </p1>
            <hr>
            <div id="normalDivIn">
                
            </div>
            <p1> Weak To </p1>
            <hr>
            <div id="weakDivIn">
                
            </div>
        </div>`

    var doc_body = document.getElementById("insertCards");
    doc_body.appendChild(columnDiv);

    createTyping(types, 0, `immuneDivIn`);
    createTyping(types, 0.5, `resistDivIn`);
    createTyping(types, 1, `normalDivIn`);
    createTyping(types, 2, `weakDivIn`);

}