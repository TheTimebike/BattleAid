function createTyping(types, effeciency, id) {
    var thing = ""
    var bar = new Promise((resolve, reject) => {
        $.each(types, function(key, val) {
            if (effeciency === val) {
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

function createTypingOut(types, name) {
    var columnDiv = document.createElement("div");

    columnDiv.className = "lefttypecolumn"
    columnDiv.innerHTML = `
        <div class="card">
            <h2 id="pokename">Outgoing Effectiveness</h2>
            <p1> No Effect On </p1>
            <hr>
            <div id="immuneDivOut">
                
            </div>
            <p1> Strong Against </p1>
            <hr>
            <div id="resistDivOut">
                
            </div>
            <p1> Normal Against </p1>
            <hr>
            <div id="normalDivOut">
                
            </div>
            <p1> Weak Against </p1>
            <hr>
            <div id="weakDivOut">
                
            </div>
        </div>`

    var doc_body = document.getElementById("insertCards");
    doc_body.appendChild(columnDiv);

    createTyping(types, 0, `immuneDivOut`);
    createTyping(types, 2, `resistDivOut`);
    createTyping(types, 1, `normalDivOut`);
    createTyping(types, 0.5, `weakDivOut`);

}