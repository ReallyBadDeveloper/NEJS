// NEJS v1.0.0
// Licensed under GNU General Public License v3
// Made by @codemob-dev and @ReallyBadDeveloper

// -------------------UTILITY------------------
const getBitOfNum = (num, bit_index) => !!(num&(1<<bit_index));
// --------------------------------------------


// -------------------LOADING------------------
let asciiDecoder = new TextDecoder("ASCII");
document.getElementById("filetoload").addEventListener("change", ev=>{
    let filereader = new FileReader();
    filereader.onload = function (frEvent) {
        if (filereader.result.byteLength) {
            let signature = asciiDecoder.decode(filereader.result.slice(0, 4));

            if (signature.toString() == "NES\x1A") {
                file = ev.target.files[0];
                onloadsuccess(filereader.result, ev.target.files[0]);
            } else {
                onloadwrongformat();
            }
        }
    }

    filereader.readAsArrayBuffer(ev.target.files[0]);
});

const nametableModes = Object.freeze({
    HORIZONTAL_MIRROR: "HORIZONTAL_MIRROR",
    VERTICAL_MIRROR: "VERTICAL_MIRROR",
    FOUR_SCREEN: "FOUR_SCREEN"
});

let loadedData = null;
function onloadsuccess(arraybuffer, file) {
    let dataview = new DataView(arraybuffer);
    let PRGROM = dataview.getUint8(4);
    let CHRROM = dataview.getUint8(5);
    let usesCHRRAM = CHRROM == 0;
    let flags6 = dataview.getUint8(6);

    let verticalMirroring = getBitOfNum(flags6, 0);
    let batteryBackedPRGRAM = getBitOfNum(flags6, 1);
    let trainer = getBitOfNum(flags6, 2);

    let altNametable = getBitOfNum(flags6, 3);
    let nametableMode = altNametable 
                        ? nametableModes.FOUR_SCREEN 
                        : (verticalMirroring 
                            ? nametableModes.VERTICAL_MIRROR 
                            : nametableModes.HORIZONTAL_MIRROR);

    let mapperNum = flags6 >> 4;

    let flags7 = dataview.getUint8(7);

    mapperNum |= flags7 & 0b11110000;

    let PRGRAM = dataview.getUint8(8);

    PRGRAM = PRGRAM == 0 ? 1 : PRGRAM;

    loadedData = {
        PRGROM, // size of PRGROM in 16KB banks
        CHRROM, // size of CHRROM in 8KB banks
        usesCHRRAM, // the board uses CHRRAM instead of CHRROM
        batteryBackedPRGRAM, // the board uses battery backed PRGRAM
        nametableMode, // the mirror mode of the nametable, one of nametableModes
        mapperNum, // the mapper number: https://www.nesdev.org/wiki/List_of_mappers
        PRGRAM // size of PRGRAM in 8KB units
    }

    console.log("Loaded!");
    console.debug(JSON.stringify(loadedData, null, 4));
}

function onloadwrongformat() {
    console.warn("Wrong format!");
}
// --------------------------------------------