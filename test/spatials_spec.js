var assert = require("assert");
var spatials = require("../src/spatials.js");

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

var locationSexagesimalAlgund = {
    name: "Algund",
    latitude: "46° 40' 38.40\" N",
    longitude: "11° 7' 39.21\" E"
};

var locationSexagesimalSinich = {
    name: "Sinich",
    latitude: "46° 37' 14.35\" N",
    longitude: "11° 10' 59.80\" E"
};

var distanceAlgundSinich = 7609;        //meters
var speedTrip = 15;                     //meters/second
var durationAlgundSinich = 507;         //seconds
var distanceAlgundSinichBozen = 26615   //meters
var durationAlgundSinichBozen = 1774;   //seconds

var meranerlandBounds = [
    { latitude: 46.718353, longitude: 10.997503 },
    { latitude: 46.713693, longitude: 11.270857 },
    { latitude: 46.525275, longitude: 11.284938 },
    { latitude: 46.526612, longitude: 11.015953 },
];

describe("spatials", function(){

    describe("utilities", function(){

        it("shoud be a valid coordinate", function(){

            //Check value
            var result = spatials.isCoordinate(locationDecimalAlgund);

            //Ok if value is the one expected
            assert.ok(result == true);
        });


        it("shoud be a valid coordinates array", function(){

            //Check value
            var result = spatials.isCoordinatesArray(meranerlandBounds);

            //Ok if value is the one expected
            assert.ok(result == true);
        });


        it("shoud be a valid polygon", function(){

            //Check value
            var result = spatials.isPolygon(meranerlandBounds);

            //Ok if value is the one expected
            assert.ok(result == true);
        });
    });

    describe("converts", function(){

        it("should convert decimal latitude in sexagesimal", function(){

            //Converts decimal latitude in sexagesimal
            var sexagesimal = spatials.latitudeToSexagesimal(locationDecimalAlgund.latitude);

            //Ok if value is the one expected
            assert.ok(sexagesimal == locationSexagesimalAlgund.latitude);
        });


        it("should convert decimal longitude in sexagesimal", function(){

            //Converts decimal longitude in sexagesimal
            var sexagesimal = spatials.longitudeToSexagesimal(locationDecimalAlgund.longitude);

            //Ok if value is the one expected
            assert.ok(sexagesimal == locationSexagesimalAlgund.longitude);
        });


        it("should convert sexagesimal latitude in decimal", function(){

            //Converts sexagesimal latitude in decimal
            var decimal = spatials.latitudeToDecimal(locationSexagesimalAlgund.latitude);

            //Ok if value is the one expected
            assert.ok(decimal == locationDecimalAlgund.latitude);
        });


        it("should convert sexagesimal longitude in decimal", function(){

            //Converts sexagesimal longitude in decimal
            var decimal = spatials.longitudeToDecimal(locationSexagesimalAlgund.longitude);

            //Ok if value is the one expected
            assert.ok(decimal == locationDecimalAlgund.longitude);
        });


        it("should convert meters in kilometers", function(){

            //Execute conversion
            var value = spatials.metersToKilometers(distanceAlgundSinich, 2);

            //Ok if value is the one expected
            assert.ok(value == 7.61);
        });


        it("should convert meters in miles", function(){

            //Execute conversion
            var value = spatials.metersToMiles(distanceAlgundSinich, 2);

            //Ok if value is the one expected
            assert.ok(value == 4.73);
        });


        it("should convert meters in seamiles", function(){

            //Execute conversion
            var value = spatials.metersToSeamiles(distanceAlgundSinich, 2);

            //Ok if value is the one expected
            assert.ok(value == 4.11);
        });


        it("should convert meters in feet", function(){

            //Execute conversion
            var value = spatials.metersToFeet(distanceAlgundSinich, 0);

            //Ok if value is the one expected
            assert.ok(value == 24964);
        });


        it("should convert meters in inches", function(){

            //Execute conversion
            var value = spatials.metersToInches(distanceAlgundSinich, 0);

            //Ok if value is the one expected
            assert.ok(value == 299567);
        });


        it("should convert meters in yards", function(){

            //Execute conversion
            var value = spatials.metersToYards(distanceAlgundSinich, 0);

            //Ok if value is the one expected
            assert.ok(value == 8321);
        });
    });

    describe("distance", function(){

        it("should calculate segment distance", function(){

            //Execute conversion
            var value = spatials.getSegmentDistance(locationDecimalAlgund, locationDecimalSinich, 0);

            //Ok if value is the one expected
            assert.ok(value == distanceAlgundSinich);
        });


        it("should calculate route distance", function(){

            //Compose route
            var route = [
                locationDecimalAlgund,
                locationDecimalSinich,
                locationDecimalBozen
            ];

            //Execute calculation
            var value = spatials.getRouteDistance(route, 0);

            //Ok if value is the one expected
            assert.ok(value == distanceAlgundSinichBozen);
        });


        it("should calculate compass direction with Bearing", function(){

            //Do calculate
            var bearing = spatials.getCompassDirection(locationDecimalAlgund, locationDecimalSinich, true);

            //Ok if value is the one expected
            assert.ok(bearing.exact == "SE");
        });

        it("should calculate compass direction with Rhumb Line", function(){

            //Do calculate
            var rhumb = spatials.getCompassDirection(locationDecimalAlgund, locationDecimalSinich);

            //Ok if value is the one expected
            assert.ok(rhumb.exact == "SE");
        });
    });

    describe("position", function(){

        it("should be inside a polygon", function(){

            //Execute conversion
            var value = spatials.isInsidePolygon(locationDecimalAlgund, meranerlandBounds);

            //Ok if value is the one expected
            assert.ok(value == true);
        });
    });

    describe("forecast", function(){

        it("should calculate segment trip duration with given speed", function(){

            //Calculate duration (in seconds) for provided route at provided speed
            var duration = spatials.getSegmentTripDuration(locationDecimalAlgund, locationDecimalSinich, speedTrip);

            //Ok if value is the one expected
            var rounded = Math.round(duration);
            assert.ok(rounded == durationAlgundSinich);
        });

        it("should calculate route trip duration with given speed", function(){

            //Compose route
            var route = [
                locationDecimalAlgund,
                locationDecimalSinich,
                locationDecimalBozen
            ];

            //Calculate duration (in seconds) for provided route at provided speed
            var duration = spatials.getRouteTripDuration(route, speedTrip);

            //Ok if value is the one expected
            var rounded = Math.round(duration);
            assert.ok(rounded == durationAlgundSinichBozen);
        });


        it("should calculate segment trip speed with given duration", function(){

            //Calculate speed (in meters/second) for provided route at provided duration
            var speed = spatials.getSegmentTripSpeed(locationDecimalAlgund, locationDecimalSinich, durationAlgundSinich);

            //Ok if value is the one expected
            var rounded = Math.round(speed);
            assert.ok(rounded == speedTrip);
        });

        it("should calculate route trip speed with given duration", function(){

            //Compose route
            var route = [
                locationDecimalAlgund,
                locationDecimalSinich,
                locationDecimalBozen
            ];

            //Calculate speed (in meters/second) for provided route at provided duration
            var speed = spatials.getRouteTripSpeed(route, durationAlgundSinichBozen);

            //Ok if value is the one expected
            var rounded = Math.round(speed);
            assert.ok(rounded == speedTrip);
        });
    });
});


