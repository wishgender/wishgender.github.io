//= laz | wishgender
//= Fri, Jun 12, 2026
//= 20:15:37 UTC-04:00
//= components\tabcontent\Toys\DexNumber.jsx

//= Dependencies =//
import { useEffect, useState } from "react";

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRandomMon() {
    return (Math.floor(Math.random() * 1025)+1)
}

function checkDate() {
    // now = Date(Date.now()).slice(4,10)
    const d = new Date();
    if (d.getMonth()+1==8 && d.getDate()==3)         return true;
    else if (d.getMonth()+1==1 && d.getDate()==2)    return true;
    else if (d.getMonth()+1==3 && d.getDate()==15)   return true;
    else if (d.getMonth()+1==3 && d.getDate()==20)   return true;
    else if (d.getMonth()+1==5 && d.getDate()==31)   return true;
    else if (d.getMonth()+1==9 && d.getDate()==14)   return true;
    else if (d.getMonth()+1==9 && d.getDate()==20)   return true;
    else if (d.getMonth()+1==10 && d.getDate()==27)  return true;
    else return false;
}

const DexNumber = () => {
    const [searchNum, setSearchNum] = useState(getRandomMon());

    const [pokemon, setPokemon] = useState(null);

    let [inputVal, setInputVal] = useState(searchNum);

    useEffect(() => {
            getPokemon(searchNum);
    }, [])

    function handleInput (e) {
        if (e.target.value == "") {
            setInputVal(e.target.value);
        }
        if (!Number(e.target.value)) {
            return;
        }
        else setInputVal(e.target.value);
    }

    const buildImgUrl = (num) => {
        if (checkDate()==true) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${searchNum}.png`;
        }
        else return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchNum}.png`;
    }

    const getPokemon = async (num) => {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${num}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Pokémon not found");
                }
                return response.json();
            })
            .then(data => {
                for (let name of data.names) {
                    if (name.language.name == "en") {
                        setSearchNum(num)
                        setPokemon(name.name);
                        return;
                    }
                }
            })
    }

    const handleClick = async () => {
        await getPokemon(document.getElementById("dexInput").value);
    }

    return (
        <div id="pokedexNumber">
            <h3 id="dexTitle"><label htmlFor="dexInput">Search Pokémon by National Dex Number</label></h3>
            <div className="inputBar">
                <input type="text" value={inputVal} onChange={handleInput} inputmode="numeric" id="dexInput" min={1} max={1025} placeholder="Dex Number"/>
                <button onClick={handleClick}>Go!</button>
            </div>
            <figure id="DexResult">
                <img src={buildImgUrl()} alt={pokemon} id="ResultPic" />
                <figcaption id="ResultText">{`Pokémon #${searchNum} is ${(pokemon !== null) ? (pokemon) : ("")}`}</figcaption>
            </figure>
        </div>
    );
}

export default DexNumber;