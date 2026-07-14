const inputEl =
document.getElementById("input");

const infoTextEl =
document.getElementById("info-text");

const meaningContainerEl =
document.getElementById("meaning-container");

const titleEl =
document.getElementById("title");

const meaningEl =
document.getElementById("meaning");

const audioEl =
document.getElementById("audio");



async function fetchAPI(word){


try{


infoTextEl.style.display="block";

meaningContainerEl.style.display="none";


infoTextEl.innerText =
`Searching "${word}"...`;



const url =
`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;



const result =
await fetch(url).then(res=>res.json());




if(result.title){


meaningContainerEl.style.display="block";

infoTextEl.style.display="none";


titleEl.innerText=word;


meaningEl.innerText="No meaning found";


audioEl.style.display="none";


}

else{


meaningContainerEl.style.display="block";


infoTextEl.style.display="none";


audioEl.style.display="block";



titleEl.innerText =
result[0].word;



meaningEl.innerText =
result[0]
.meanings[0]
.definitions[0]
.definition;




audioEl.src =
result[0]
.phonetics[0]
.audio;



}



}

catch(error){


infoTextEl.innerText =
"Something went wrong 😢";

}


}




inputEl.addEventListener(
"keyup",
(e)=>{


if(
e.target.value &&
e.key==="Enter"
){

fetchAPI(
e.target.value
);


}


});