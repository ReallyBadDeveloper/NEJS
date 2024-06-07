// NEJS v1.0.0
// Licensed under GNU General Public License v3
// Made by @codemob-dev and @ReallyBadDeveloper

var file = null;
document.getElementById("filetoload").addEventListener("change", ev=>{
    let fr = new FileReader();
    fr.onload = function () {
        if (fr.result.byteLength) {
            var signature = fr.result.slice(0, 5);
            if (signature == "NES\x1A") {
                file = ev.target.files[0];
                load();
            } else {
                wrongformat();
            }
        }
    }

    fr.readAsArrayBuffer(ev.target.files[0]);
});

function load() {

}
function wrongformat() {

}