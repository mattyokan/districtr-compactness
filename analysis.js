const {geoPolsbyPopper} = require("d3-geo-compactness");

/**
 * Analyze the contiguity of a given district using the Polsby-Popper test.
 *
 * @param geoJSON The geoJSON of the district
 */
function analyze_contiguity(geoJSON) {
    return geoPolsbyPopper(geoJSON)
}

module.exports = {analyze_contiguity}