# Districtr Compactness Test (and useful splitting utility)

Careful: despite being hosted on Github, this tool is [**not open-source**](https://github.com/mattyokan/districtr-compactness/blob/master/LICENSE.txt).

Provides a convenient way to analyze compactness using
the [Polsby–Popper test](https://en.wikipedia.org/wiki/Polsby–Popper_test).

Because Districtr does not provide a way to export individual districts' GeoJSON objects directly, this also functions
as a utility to split a plan into individual GeoJSON objects for each district.

## Usage

### 1. Prepare application environment

#### 1a. Install Git

If you do not have git, please download and install it according to instructions for your specific platform.

#### 1b. Clone repository

```
git clone https://github.com/mattyokan/districtr-compactness.git
```

#### 1c. Install needed tools

```
npm install d3-geo-compactness
```

### 2. Prepare your files

In order to analyze compactness, you will need to export two different files from your Districtr plan: the assignment
CSV (as individual units), and the plan's GeoJSON file.

Both of these can be accessed from your plan's dropdown menu.

#### 2a. Export GeoJSON

This may take a while to generate depending on your plan.

![Export as GeoJSON Screenshot](https://i.imgur.com/XQfe1dZ.png)

#### 2b. Export assignment as CSV (these units)

This is needed so the program can split up your exported GeoJSON into individual GeoJSON objects for each district (
which is not prepared by Districtr unless I missed the capability, which is a real possibility).

![Export as CSV (individual blocks) Screenshot](https://i.imgur.com/1x9Tofk.png)

### 3. Use the tool

You will need to create a "plan" folder within the main directory for this project and do the following:

1. Place the CSV file as "district_assignments.csv"
2. Place the GeoJSON file as "features.geojson"

Then, run the tool from the project directory:

```
npm run analyze
```

### 4. Interpret results

The individual district GeoJSON objects will be available in a created "output" directory of your plan folder for your
convenience if you wish to inspect the map further in mapping software of your choice.

The console output for contiguity analysis can be interpreted using a description of how the Polsby-Popper test works.


## Why Node?

Yes, this was an unconventional choice on my part. There was an available library for geocompactness for GeoJSON, and JSON is very easy to work with in JS, so I used it. Oh well.
