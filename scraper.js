const https = require("https")
const fs = require("fs")

const artworkJson = require("./unique-artwork-20200905212031.json")

const IMAGE = "art_crop"
const PAUSE_PER_SCRYFALL_POLITENESS = 150

artworkJson.forEach((card, index) => {
    if (card.image_uris) {
        setTimeout(() => {
            const filename = card.id
            const file = fs.createWriteStream(`images/${IMAGE}/${filename}.jpg`)
            https.get(card.image_uris[IMAGE], response => response.pipe(file))
        }, index * PAUSE_PER_SCRYFALL_POLITENESS)
    }
})
