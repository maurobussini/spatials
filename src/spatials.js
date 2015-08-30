/**
 * Created by maurobussini on 18/07/2015.
 */
(function (root, factory) {

    //UMD - Universal Module Definition
    if (typeof define === 'function' && define.amd) {
        //AMD: register as an anonymous module without dependencies
        define(['geolib'], factory);
    } else if (typeof exports === 'object') {
        //Node: does not work with strict CommonJS, but only CommonJS-like
        //environments that support module.exports, like Node.
        module.exports = factory(require('geolib'));
    } else {
        //Browser: globals (root is window)
        root.spatials = factory(root.geolib);
    }
}(this, function (geolib) {

    //Check if "geolib" is available
    if (!geolib) throw new Error("spatials requires 'geolib' library");

    //*** UTILITIES

    //Check is provided object is an array
    function isArray(obj) {
        return '[object Array]' === {}.toString.call(obj);
    }

    //Check if object is null or undefined
    function isNullOrUndefined(obj) {
        return typeof obj === 'undefined' || obj == null;
    }

    //Check is object is number greater of equals zero
    function isNumberGreaterOrEqualsToZero(obj) {

        //If undefined or null, false
        if (isNullOrUndefined(obj)) {
            return true;
        }

        //If is not a number
        if (isNaN(obj)) {
            return false;
        }

        //True if match condition
        return obj >= 0;
    }

    //Check if provided element is a coordinate
    function isCoordinate(obj) {

        //If is null or undefined, exit
        if (isNullOrUndefined(obj)) {
            return false;
        }

        //If it does not have 'latitude' is invalid
        if (isNullOrUndefined(obj.latitude)) {
            return false;
        }

        //If it does not have 'longitude' is invalid
        if (isNullOrUndefined(obj.longitude)) {
            return false;
        }

        //If latitude is not a number
        if (isNaN(obj.latitude)) {
            return false;
        }

        //If longitude is not a number
        if (isNaN(obj.longitude)) {
            return false;
        }

        //If latitude is outside boundaries
        if (obj.latitude < -90 || obj.latitude > 90) {
            return false;
        }

        //If longitude is outside boundaries
        if (obj.longitude < -90 || obj.longitude > 90) {
            return false;
        }

        //Confirm
        return true;
    }

    //Check if provided object is a valid array of coordinates
    function isCoordinatesArray(obj) {

        //If is null or undefined, exit
        if (isNullOrUndefined(obj)) {
            return false;
        }

        //If non array, exit
        if (!isArray(obj)) {
            return false;
        }

        //Iterate all over elements
        for (var i = 0; i < obj.length; i++) {

            //if current element is not coordinate, fail
            if (!isCoordinate(obj[i])) {
                return false;
            }
        }

        //Confirm
        return true;
    }

    //Check if provided object is a valid polygon
    function isPolygon(obj) {

        //If it's not an array of coordinates, fail
        if (!isCoordinatesArray(obj)) {
            return false;
        }

        //To be a valid polygon requires at least 3 vertex
        return obj.length >= 3;
    }

    //*** CONVERTS

    //Converts provided latitude in decimal notation to sexagesimal notation
    function latitudeToSexagesimal(latDecimalValue) {

        //Arguments validation
        if (!latDecimalValue)
            throw new Error("Argument 'latDecimalValue' is invalid");

        //Check is it's a number
        if (isNaN(latDecimalValue))
            throw new Error("Provided latitude is not a valid number");

        //If number is greater that 0, cardinal point is "N", otherwise "S"
        var cardinal = latDecimalValue > 0 ? "N" : "S";

        //Use geolib to convert
        var converted = geolib.decimal2sexagesimal(latDecimalValue);

        //Return converted value and cardinal
        return converted + " " + cardinal;
    }

    //Converts provided latitude in decimal notation to sexagesimal notation
    function longitudeToSexagesimal(lonDecimalValue) {

        //Arguments validation
        if (!lonDecimalValue)
            throw new Error("Argument 'lonDecimalValue' is invalid");

        //Check is it's a number
        if (isNaN(lonDecimalValue))
            throw new Error("Provided longitude is not a valid number");

        //If number is greater that 0, cardinal point is "E", otherwise "W"
        var cardinal = lonDecimalValue > 0 ? "E" : "W";

        //Use geolib to convert
        var converted = geolib.decimal2sexagesimal(lonDecimalValue);

        //Return converted value and cardinal
        return converted + " " + cardinal;
    }

    //Converts provided latitude in sexagesimal notation to decimal notation
    function latitudeToDecimal(latSexagesimalValue) {

        //Arguments validation
        if (!latSexagesimalValue)
            throw new Error("Argument 'latSexagesimalValue' is invalid");

        //Check if string was passed as argument
        if (typeof latSexagesimalValue !== 'string')
            throw new Error("Provided latitude is not a valid string");

        //Use geolib to convert
        return geolib.sexagesimal2decimal(latSexagesimalValue);
    }

    //Converts provided longitude in sexagesimal notation to decimal notation
    function longitudeToDecimal(lonSexagesimalValue) {

        //Arguments validation
        if (!lonSexagesimalValue)
            throw new Error("Argument 'lonSexagesimalValue' is invalid");

        //Check if string was passed as argument
        if (typeof lonSexagesimalValue !== 'string')
            throw new Error("Provided longitude is not a valid string");

        //Use geolib to convert
        return geolib.sexagesimal2decimal(lonSexagesimalValue);
    }

    //Converts meters value to target unit
    function metersToSomething(meters, decimal, targetUnit) {

        //Arguments validation
        if (typeof meters === 'undefined' || meters === null)
            throw new Error("Argument 'meters' is invalid");
        if (!targetUnit)
            throw new Error("Argument 'targetUnit' is invalid");

        //Check if is a number
        if (isNaN(meters))
            throw new Error("Provided meters value should be number");

        //Check if value is greater equals o
        if (meters < 0)
            throw new Error("Provided meters value cannot be lower then 0");

        //If equals 0, just return 0
        if (meters === 0)
            return 0;

        //Use geolib to do convert
        return geolib.convertUnit(targetUnit, meters, decimal);
    }

    //Converts provided value in meters, to kilometers
    function metersToKilometers(meters, decimals) {

        //Use basic function
        return metersToSomething(meters, decimals, 'km');
    }

    //Converts provided value in meters, to miles
    function metersToMiles(meters, decimals) {

        //Use basic function
        return metersToSomething(meters, decimals, 'mi');
    }

    //Converts provided value in meters, to seamiles
    function metersToSeamiles(meters, decimals) {

        //Use basic function
        return metersToSomething(meters, decimals, 'sm');
    }

    //Converts provided value in meters, to feet
    function metersToFeet(meters, decimals) {

        //Use basic function
        return metersToSomething(meters, decimals, 'ft');
    }

    //Converts provided value in meters, to inches
    function metersToInches(meters, decimals) {

        //Use basic function
        return metersToSomething(meters, decimals, 'in');
    }

    //Converts provided value in meters, to yards
    function metersToYards(meters, decimals) {

        //Use basic function
        return metersToSomething(meters, decimals, 'yd');
    }

    //*** DISTANCE

    /**
     * Get distance between provided points
     * @param pointA Origin coordinates
     * @param pointB Destination coordinates
     * @param accuracy Accuracy (in meters) of calculation
     * @returns {*|integer} Returns distance in meters
     */
    function getSegmentDistance(pointA, pointB, accuracy) {

        //Arguments validation
        if (!pointA) throw new Error("Argument 'pointA' is invalid");
        if (!pointB) throw new Error("Argument 'pointB' is invalid");

        //Check if elements are valid coordinates
        if (!isCoordinate(pointA))
            throw new Error("Argument 'pointA' is not a valid coordinate");
        if (!isCoordinate(pointB))
            throw new Error("Argument 'pointB' is not a valid coordinate");

        //Use geolib
        return geolib.getDistance(pointA, pointB, accuracy);
    }

    /**
     * Get distance of route defined by array of coordinates
     * @param routeCoordinates Array of coordinates
     * @param accuracy Accuracy (in meters) of calculation
     * @returns {*|integer} Returns distance in meters
     */
    function getRouteDistance(routeCoordinates, accuracy) {

        //Arguments validation
        if (!routeCoordinates) throw new Error("Argument 'pointA' is invalid");

        //Check if route is a valid coordinate array
        if (!isCoordinatesArray(routeCoordinates))
            throw new Error("Argument 'routeCoordinates' is not a valid coordinates array");

        //Define total distance
        var distance = 0;

        //Iterate calculation of each segment
        for (var i = 0; i < routeCoordinates.length; i++) {

            //Proceed only if there a "next" element
            if ((i + 1) >= routeCoordinates.length) {
                break;
            }

            //Define origin and destination of segment
            var origin = routeCoordinates[i];
            var destination = routeCoordinates[i + 1];

            //Calculate segment distance and increment total distance
            distance += getSegmentDistance(origin, destination, accuracy);
        }

        //Returns distance
        return distance;
    }

    /**
     * Get compass direction between provided points
     * @param pointA Origin point
     * @param pointB Destination point
     * @param useBearing Boolean for activate bearing mode
     * @returns {*|Object} Returns direction
     */
    function getCompassDirection(pointA, pointB, useBearing) {

        //Arguments validation
        if (!pointA) throw new Error("Argument 'pointA' is invalid");
        if (!pointB) throw new Error("Argument 'pointB' is invalid");

        //Check if elements are valid coordinates
        if (!isCoordinate(pointA))
            throw new Error("Argument 'pointA' is not a valid coordinate");
        if (!isCoordinate(pointB))
            throw new Error("Argument 'pointB' is not a valid coordinate");

        //Define bearing mode
        var bearingMode = useBearing === true ? 'circle': null;

        //Use geolib
        return geolib.getCompassDirection(pointA, pointB, bearingMode);
    }

    //*** POSITION

    /**
     * Checks if provided point is inside specified polygon
     * @param point Reference coordinate
     * @param polygonArrayBounds Polygon boundaries
     * @returns {*|boolean} Returns true or false
     */
    function isInsidePolygon(point, polygonArrayBounds) {

        //Arguments validation
        if (!point) throw new Error("Argument 'point' is invalid");
        if (!polygonArrayBounds) throw new Error("Argument 'polygonArrayBounds' is invalid");

        //Check is point is a valid coordinate
        if (!isCoordinate(point))
            throw new Error("Argument 'point' is not a valid coordinate");

        //Check if it is a valid polygon
        if (!isPolygon(polygonArrayBounds))
            throw new Error("Argument 'polygonArrayBounds' is not a valid polygon");

        //Use geolib to calculate
        return geolib.isPointInside(point, polygonArrayBounds);
    }

    //*** FORECAST

    /**
     * Calculate duration (in seconds) of trip between two segments at given speed
     * @param pointA Point of origin
     * @param pointB Point of destination
     * @param speedMetersPerSecond Speed in meters/second
     * @param decimals Decimals of precision
     * @returns {number} Returns duration in seconds
     */
    function getSegmentTripDuration(pointA, pointB, speedMetersPerSecond, decimals) {

        //Arguments validation
        if (!pointA) throw new Error("Argument 'pointA' is invalid");
        if (!pointB) throw new Error("Argument 'pointB' is invalid");
        if (!speedMetersPerSecond) throw new Error("Argument 'speedMetersPerSecond' is invalid");

        //Check if elements are valid coordinates
        if (!isCoordinate(pointA))
            throw new Error("Argument 'pointA' is not a valid coordinate");
        if (!isCoordinate(pointB))
            throw new Error("Argument 'pointB' is not a valid coordinate");

        //If speed is not a number greater than zero
        if (!isNumberGreaterOrEqualsToZero(speedMetersPerSecond)) {
            throw new Error("Provided speed must be a number greater or equals zero");
        }

        //If speed is zero, duration is infinite
        if (speedMetersPerSecond == 0) {
            return Infinity;
        }

        //If decimals is undefined, set default
        decimals = decimals || 2;

        //Check is decimal is a valid number
        if (!isNumberGreaterOrEqualsToZero(decimals)) {
            throw new Error("Provided decimals must be a number greater or equals zero");
        }

        //Calculate distance between points (precise accuracy, in meters)
        var distanceMeters = getSegmentDistance(pointA, pointB, 0);

        //Simple formula:
        // => speed = space / time
        // => space = speed * time
        // => time = space / speed

        //Calculate duration of trip in seconds
        var value = distanceMeters / speedMetersPerSecond;
        return parseFloat(value.toFixed(decimals));
    }

    /**
     * Calculate duration (in seconds) crossing all coordinates and given speed
     * @param routeCoordinates Array of coordinates
     * @param speedMetersPerSecond Speed in meters/second
     * @param decimals Number of decimals for precision
     * @returns {Number} Returns duration of trip in seconds
     */
    function getRouteTripDuration(routeCoordinates, speedMetersPerSecond, decimals){

        //Arguments validation
        if (!routeCoordinates) throw new Error("Argument 'pointA' is invalid");
        if (!speedMetersPerSecond) throw new Error("Argument 'speedMetersPerSecond' is invalid");

        //Check if route is a valid coordinate array
        if (!isCoordinatesArray(routeCoordinates))
            throw new Error("Argument 'routeCoordinates' is not a valid coordinates array");

        //If speed is not a number greater than zero
        if (!isNumberGreaterOrEqualsToZero(speedMetersPerSecond)) {
            throw new Error("Provided speed must be a number greater or equals zero");
        }

        //If speed is zero, duration is infinite
        if (speedMetersPerSecond == 0) {
            return Infinity;
        }

        //If decimals is undefined, set default
        decimals = decimals || 2;

        //Check is decimal is a valid number
        if (!isNumberGreaterOrEqualsToZero(decimals)) {
            throw new Error("Provided decimals must be a number greater or equals zero");
        }

        //Calculate distance between points (precise accuracy, in meters)
        var distanceMeters = getRouteDistance(routeCoordinates, 0);

        //Calculate duration of trip in seconds
        var value = distanceMeters / speedMetersPerSecond;
        return parseFloat(value.toFixed(decimals));
    }

    /**
     * Calculate speed (in meters/second) of trip between two segments and given duration
     * @param pointA Point of origin
     * @param pointB Point of destination
     * @param durationSeconds Duration of trip in seconds
     * @param decimals Decimals of precision
     * @returns {number} Returns speed in meters/second
     */
    function getSegmentTripSpeed(pointA, pointB, durationSeconds, decimals) {

        //Arguments validation
        if (!pointA) throw new Error("Argument 'pointA' is invalid");
        if (!pointB) throw new Error("Argument 'pointB' is invalid");
        if (!durationSeconds) throw new Error("Argument 'durationSeconds' is invalid");

        //Check if elements are valid coordinates
        if (!isCoordinate(pointA))
            throw new Error("Argument 'pointA' is not a valid coordinate");
        if (!isCoordinate(pointB))
            throw new Error("Argument 'pointB' is not a valid coordinate");

        //If duration is not a number greater than zero
        if (!isNumberGreaterOrEqualsToZero(durationSeconds)) {
            throw new Error("Provided duration must be a number greater or equals zero");
        }

        //If duration is zero, speed is infinite
        if (durationSeconds == 0) {
            return Infinity;
        }

        //If decimals is undefined, set default
        decimals = decimals || 2;

        //Check is decimal is a valid number
        if (!isNumberGreaterOrEqualsToZero(decimals)) {
            throw new Error("Provided decimals must be a number greater or equals zero");
        }

        //Calculate distance between points (precise accuracy, in meters)
        var distanceMeters = getSegmentDistance(pointA, pointB, 0);

        //Simple formula:
        // => speed = space / time

        //Calculate speed of trip in meters/second
        var value = distanceMeters / durationSeconds;
        return parseFloat(value.toFixed(decimals));
    }

    /**
     * Calculate speed (in meters/second) crossing all coordinates and given duration
     * @param routeCoordinates Array of coordinates
     * @param durationSeconds Duration of trip in seconds
     * @param decimals Number of decimals for precision
     * @returns {Number} Returns speed in meters/second
     */
    function getRouteTripSpeed(routeCoordinates, durationSeconds, decimals){

        //Arguments validation
        if (!routeCoordinates) throw new Error("Argument 'pointA' is invalid");
        if (!durationSeconds) throw new Error("Argument 'durationSeconds' is invalid");

        //Check if route is a valid coordinate array
        if (!isCoordinatesArray(routeCoordinates))
            throw new Error("Argument 'routeCoordinates' is not a valid coordinates array");

        //If duration is not a number greater than zero
        if (!isNumberGreaterOrEqualsToZero(durationSeconds)) {
            throw new Error("Provided duration must be a number greater or equals zero");
        }

        //If duration is zero, speed is infinite
        if (durationSeconds == 0) {
            return Infinity;
        }

        //If decimals is undefined, set default
        decimals = decimals || 2;

        //Check is decimal is a valid number
        if (!isNumberGreaterOrEqualsToZero(decimals)) {
            throw new Error("Provided decimals must be a number greater or equals zero");
        }

        //Calculate distance between points (precise accuracy, in meters)
        var distanceMeters = getRouteDistance(routeCoordinates, 0);

        //Calculate speed of trip in meters/second
        var value = distanceMeters / durationSeconds;
        return parseFloat(value.toFixed(decimals));
    }

    //Exports functions
    return {

        //utilities
        isCoordinate: isCoordinate,
        isCoordinatesArray: isCoordinatesArray,
        isPolygon: isPolygon,

        //converts
        latitudeToSexagesimal: latitudeToSexagesimal,
        longitudeToSexagesimal: longitudeToSexagesimal,
        latitudeToDecimal: latitudeToDecimal,
        longitudeToDecimal: longitudeToDecimal,
        metersToKilometers: metersToKilometers,
        metersToMiles: metersToMiles,
        metersToSeamiles: metersToSeamiles,
        metersToFeet: metersToFeet,
        metersToInches: metersToInches,
        metersToYards: metersToYards,

        //distance
        getSegmentDistance: getSegmentDistance,
        getRouteDistance: getRouteDistance,
        getCompassDirection: getCompassDirection,

        //position
        isInsidePolygon: isInsidePolygon,

        //forecast
        getSegmentTripDuration: getSegmentTripDuration,
        getRouteTripDuration: getRouteTripDuration,
        getSegmentTripSpeed: getSegmentTripSpeed,
        getRouteTripSpeed: getRouteTripSpeed
    };
}));