// NEJS v1.0.0
// Licensed under GNU General Public License v3
// Made by @codemob-dev and @ReallyBadDeveloper


var asciiDecoder = new TextDecoder("ASCII");
document.getElementById("filetoload").addEventListener("change", ev=>{
    let filereader = new FileReader();
    filereader.onload = function (frEvent) {
        if (filereader.result.byteLength) {
            var signature = asciiDecoder.decode(filereader.result.slice(0, 4));

            if (signature.toString() == "NES\x1A") {
                file = ev.target.files[0];
                load(filereader.result, ev.target.files[0]);
            } else {
                wrongformat();
            }
        }
    }

    filereader.readAsArrayBuffer(ev.target.files[0]);
});

var loadedData = null;
function load(arraybuffer, file) {
    var uint8buffer = new Uint8Array(arraybuffer);
    var dataview = new DataView(arraybuffer);
    var PRGROM = dataview.getUint8(4);
    var CHRROM = dataview.getUint8(5);
    var usesCHRRAM = CHRROM == 0;
    var flags6 = dataview.getUint8(6);

    console.log(PRGROM, CHRROM, usesCHRRAM, flags6);
    console.log("Loaded!");
}
function wrongformat() {
    console.log("Wrong format!");
}