// NEJS v1.0.0
// Licensed under GNU General Public License v3
// Made by @codemob-dev and @ReallyBadDeveloper

var file = null;
document.getElementById("filetoload").addEventListener("change", ev=>{
    let filereader = new FileReader();
    filereader.onload = function (frEvent) {
        if (filereader.result.byteLength) {
            var signature = filereader.result.slice(0, 5);
            if (signature == "NES\x1A") {
                file = ev.target.files[0];
                load();
            } else {
                wrongformat();
            }
        }
    }

    filereader.readAsArrayBuffer(ev.target.files[0]);
});

function load() {
    console.log("Loaded!");
}
function wrongformat() {
    console.log("Wrong format!");
}