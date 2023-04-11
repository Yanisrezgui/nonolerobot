document.querySelector("#newGame").addEventListener("click", ()=>{
    document.getElementById("newGame").style.display = "none";
    document.querySelector(".text-warning").style.display = "none";
    document.getElementById("infos").style.display = "none";
    document.getElementById("about").style.display = "none";
})

document.querySelector("#about").addEventListener("click", ()=>{
    document.querySelector(".text-warning").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("newGame").style.display = "none";
    document.getElementById("infos").style.display = "block";
    document.getElementById("back").style.display = "block";
})

document.querySelector("#back").addEventListener('click', ()=>{
    document.getElementById("back").style.display = "none";
    document.getElementById("infos").style.display = "none";
    document.querySelector(".text-warning").style.display = "block";
    document.getElementById("newGame").style.display = "block";
    document.getElementById("about").style.display = "block";
})