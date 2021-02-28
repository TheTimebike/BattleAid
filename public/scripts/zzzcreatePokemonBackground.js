function constructEvolutionLineSimple(chain, arr) {
    if (chain.evolves_to.length > 0) {
        arr.simple.push(chain.species.name);
        arr[chain.species.name] = chain;
        constructEvolutionLineSimple(chain.evolves_to[0], arr);
    } else {
        arr.simple.push(chain.species.name);
        arr[chain.species.name] = chain;
    }
    return arr;
}

function getLastEvoFromChain(chain) {
    var arr = constructEvolutionLineSimple(chain, {"simple": []});
    return arr[arr.simple[arr.simple.length-1]];
}

function getFirstEvoFromChain(chain) {
    var arr = constructEvolutionLineSimple(chain, {"simple": []});
    return arr[arr.simple[0]];
}

function getNextEvoFromChain(chain, name) {
    var arr = constructEvolutionLineSimple(chain, {"simple": []});
    return arr[arr.simple[arr.simple.indexOf(name) + 1]];
}

function getCurrentEvoFromChain(chain, name) {
    var arr = constructEvolutionLineSimple(chain, {"simple": []});
    return arr[name];
}

function getSpecificEvoFromChain(chain, name) {
    var arr = constructEvolutionLineSimple(chain, {"simple": []});
    return arr[name];
}

function getPrevEvoFromChain(chain, name) {
    var arr = constructEvolutionLineSimple(chain, {"simple": []});
    return arr[arr.simple[arr.simple.indexOf(name) - 1]];
}

function createPokemonBackground(pokeData, data) {

    var final_evo_chain = getLastEvoFromChain(data.chain, pokeData.name);
    var next_evo_chain = getNextEvoFromChain(data.chain, pokeData.name);
    var current_evo_chain = getCurrentEvoFromChain(data.chain, pokeData.name);
    var next_next_evo_chain = getNextEvoFromChain(data.chain, current_evo_chain.species.name);
    var prev_evo_chain = getPrevEvoFromChain(data.chain, pokeData.name);
    var specific_evo_chain = getSpecificEvoFromChain(data.chain, "charmeleon");
    var first_evo_chain = getFirstEvoFromChain(data.chain, pokeData.name);
    
    console.log(current_evo_chain)

    var columnDiv = document.createElement("div");

    var species_name = niceName(current_evo_chain.species.name);
    var name = niceName(pokeData.name);

    if (next_evo_chain == null && prev_evo_chain == null) { // if there is no further evolution or prevolution
        var evo = `It doesnt evolve from any form, or into any other form.`
    } else if (next_evo_chain != null && prev_evo_chain == null) { // if there is another evolution but no prevolution
        var evo_level_req = next_evo_chain.evolution_details[0].min_level
        var evo = `It evolves into ${niceName(next_evo_chain.species.name)} at level ${evo_level_req}.`
    } else if (next_evo_chain == null && prev_evo_chain != null) { // if there is no evolution but a prevolution
        var prevo_level_req = current_evo_chain.evolution_details[0].min_level
        var evo = `It evolves from ${niceName(prev_evo_chain.species.name)} at level ${prevo_level_req}.`
    } else if (next_evo_chain != null && prev_evo_chain != null) { // if there is an evolution and a prevolution
        var evo_level_req = next_evo_chain.evolution_details[0].min_level
        var prevo_level_req = current_evo_chain.evolution_details[0].min_level
        var evo = `It evolves from ${niceName(prev_evo_chain.species.name)} at level ${prevo_level_req}, and into ${niceName(next_evo_chain.species.name)} at level ${evo_level_req}.`
    }

    if (next_next_evo_chain == null) {
        var next_evo_level_req = ""
    } else {
        var next_evo_level_req = next_next_evo_chain.evolution_details[0].min_level
        
    }


    var chain = `${niceName(pokeData.name)} is a part of the ${niceName(first_evo_chain.species.name)} species line.`

    var next_evo = `${niceName(data.chain.evolves_to[0].species.name)} evolves into ${niceName(data.chain.evolves_to[0].evolves_to[0].species.name)} at level ${next_evo_level_req}`

    var baby_status = `${name} is not a baby pokemon!`
    if (data.chain.is_baby) var baby_status = `${name} is a baby pokemon!`

    columnDiv.className = "column third"
    columnDiv.innerHTML = `
        <div class="movecard">
            <h2 id="pokename">Trivia</h2>
            ${baby_status}
            ${chain}
            ${evo}

            <br/>
        </div>`


    var doc_body = document.getElementById("pokemonStuff");
    doc_body.appendChild(columnDiv);
}