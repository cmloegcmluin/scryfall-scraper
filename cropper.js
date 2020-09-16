const gm = require("gm")
const fs = require("fs")

const PATH = "images/art_crop"

const files = fs.readdirSync(PATH);

for (const file of files) {
    gm(`images/art_crop/${file}`)
        .gravity('Center')
        .resize(512, 384, "!")
        .write(`images/art_crop_cropped/${file}`, () => {})
}

// n = 7
// min_h = 3
// mih_w = 4