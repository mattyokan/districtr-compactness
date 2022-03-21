const {extract_districts, generate_district_geoJSON_files, write_district_files} = require("./extraction");
const {analyze_contiguity} = require("./analysis");

let map = process.env.DISTRICTR_MAP_DIR
if(!map) {
    map = "plan"
}
const path = `${map}/`
results = extract_districts(path)
districtJSONs = generate_district_geoJSON_files(results.whole, results.districts)
write_district_files(districtJSONs, path)
console.log("Contiguity analysis using Polsby-Popper test:")
districtJSONs.forEach((districtJSON, district) => {
    const contiguity = analyze_contiguity(districtJSON);
    console.log(`District ${district}: ${contiguity}`)
})