const fs = require("fs")
const sizeOf = require("image-size")

let dimensionClassCounts = {}
let aspectRatios = {}
let count = 0

let PATH = "images/art_crop"

const files = fs.readdirSync(PATH);

(async () => {
    for (const file of files) {
        count++
        const dimensions = await sizeOf(`${PATH}/${file}`)

        /*
        if (dimensions.width !== 146 || dimensions.height !== 204) {
            wrongSizeCount++
            console.log(file, dimensions.width, dimensions.height, wrongSizeCount, count)
        }
         */

        const dimensionClass = `${dimensions.width}x${dimensions.height}`
        if (!dimensionClassCounts[dimensionClass]) {
            dimensionClassCounts[dimensionClass] = 0
        }
        dimensionClassCounts[dimensionClass] += 1

        const aspectRatio = (dimensions.width / dimensions.height).toPrecision(3)
        if (!aspectRatios[aspectRatio]) {
            aspectRatios[aspectRatio] = []
        }
        if (!aspectRatios[aspectRatio].includes(dimensionClass)) {
            aspectRatios[aspectRatio].push(dimensionClass)
        }
    }

    // console.log(dimensionClassCounts)
    // console.log(aspectRatios)

    const totalImageCountsPerAspectRatio = Object.entries(aspectRatios).reduce(
        (totalImageCountsPerAspectRatio, [aspectRatio, dimensionClasses]) => {
            return {
                ...totalImageCountsPerAspectRatio,
                [aspectRatio]: dimensionClasses.reduce(
                    (totalImageCount, dimensionClass) => {
                        const imageCountForThisDimensionClass = dimensionClassCounts[dimensionClass]
                        // console.log('huh', imageCountForThisDimensionClass)

                        return totalImageCount + imageCountForThisDimensionClass
                    },
                    0,
                )
            }
        },
        {},
    )

    const withSortedKeys = {}
    Object.keys(totalImageCountsPerAspectRatio).sort().forEach(key => {
        withSortedKeys[key] = totalImageCountsPerAspectRatio[key]
    })

    console.log(withSortedKeys)
})()
