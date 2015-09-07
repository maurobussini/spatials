spatials
======

A bunch of utilities for geocoding and spatial calculation

## Usage

#### Execute a *converts* of provided *latitude* and *longitude* into sexagesimal format 

```javascript
var decimalPosition = {
    latitude: 46.67733333,
    longitude: 11.12755833
};
var sexagesimalPosition = {
    latitude: spatials.latitudeToSexagesimal(decimalPosition.latitude);
    longitude: spatials.latitudeToSexagesimal(decimalPosition.longitude);
};
// sexagesimalPosition.latitude     => "46° 40' 38.40\" N"
// sexagesimalPosition.longitude    => "11° 7' 39.21\" E"
```

*[TO BE CONTINUED!]*