spatials
======

A bunch of utilities for geocoding and spatial calculation

## Usage

#### Given the following structures:

```javascript
var locationDecimalAlgund = {
    name: "Algund",
    latitude: 46.67733333,
    longitude: 11.12755833
};

var locationDecimalSinich = {
    name: "Sinich",
    latitude: 46.620652,
    longitude: 11.183278
};

var locationDecimalBozen = {
    name: "Bozen",
    latitude: 46.476480,
    longitude: 11.316497
};
```

#### Execute a *converts* of provided *latitude* and *longitude* into sexagesimal format and viceversa 

```javascript
var sexagesimalAlgund = {
    latitude: spatials.latitudeToSexagesimal(locationDecimalAlgund.latitude),
    longitude: spatials.latitudeToSexagesimal(locationDecimalAlgund.longitude)
};
// sexagesimalAlgund.latitude     => "46° 40' 38.40\" N"
// sexagesimalAlgund.longitude    => "11° 7' 39.21\" E"

var decimalAlgundAgain = {
    latitude: spatials.latitudeToDecimal(sexagesimalAlgund.latitude),
    longitude: spatials.latitudeToDecimal(sexagesimalAlgund.longitude)
};

// decimalAlgundAgain.latitude     => 46.67733333
// decimalAlgundAgain.longitude    => 11.12755833

```

#### Execute converts from *meters* to *miles*, *seamiles*, *yards*, *feet* and *inches*

```javascript
var sourceMeters = 2500;
var numberOfDecimals = 6;

var targets = {
    miles: spatials.metersToMiles(sourceMeters, numberOfDecimals),
    seamiles: spatials.metersToSeamiles(sourceMeters, numberOfDecimals),
    yards: spatials.metersToYards(sourceMeters, numberOfDecimals),
    feet: spatials.metersToFeet(sourceMeters, numberOfDecimals),
    inches: spatials.metersToInches(sourceMeters, numberOfDecimals)
}; 

// decimalAlgundAgain.latitude     => 46.67733333
// decimalAlgundAgain.latitude     => 46.67733333 FINIRE

```

*[TO BE CONTINUED!]*