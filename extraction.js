const fs = require('fs');

function extract_districts(dir) {
    let raw = fs.readFileSync(`${dir}/features.geojson`, 'utf-8')
    let assignments = fs.readFileSync(`${dir}/district_assignments.csv`, 'utf-8')
    let districts = new Map();
    let parts = assignments.split('\n');
    parts.shift();

    parts
        .forEach((line) => {
            const parts = line.split(',')
            const geoId20 = parts[0]
            const district = parts[1]
            if (districts.has(district)) {
                districts.get(district).push(geoId20)
            } else {
                districts.set(district, [geoId20])
            }
        })

    const geoJSON = JSON.parse(raw)

    console.log(`Identified ${districts.size} districts based on input data.`)

    return {whole: geoJSON, districts: districts}
}

function generate_district_geoJSON_files(geoJSON, districts) {


    const resultDistricts = new Map()
    for (const district of districts.keys()) {
        const features = districts.get(district)
        const districtJSON = Object.assign({}, geoJSON)
        districtJSON.features = districtJSON.features
            .filter((f) => {
                    return features.includes(f.properties.GEOID20)
                }
            )
        resultDistricts.set(district, districtJSON)
    }
    return resultDistricts
}

function write_district_files(districts, dir) {
    if (!fs.existsSync(`${dir}/output`)){
        fs.mkdirSync(`${dir}/output`);
    }
    districts.forEach((districtJSON, district) => {
        console.log(`Writing GeoJSON for district ${district}`)
        fs.writeFileSync(`${dir}/output/district-${district}.geojson`, JSON.stringify(districtJSON))
    })
}

module.exports = {extract_districts, generate_district_geoJSON_files, write_district_files}