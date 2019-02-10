'use strict';

/**
 * This is a performance timing library written to use hrtime and allow multiple timers and named access.
 */
class PTime {
    /**
     * The constructor that sets up the timers and an array of valid types allowed to be used as names
     * 
     * A user could modify the validTypes to allow their own custom types to be used as a name
     */
    constructor () {
        this.timers = {};
        this.validTypes = ["bigint", "number", "string"];
    }
    
    /**
     * This function validates the timer name to make sure it is a safe type
     * @param {bigint|number|string|custom} name // the name of the timer to validate
     * 
     * @returns {boolean} // if it returns a true boolean then it is valid, otherwise it will throw an error.
     */
    validate(name) {
        const type = typeof name;
        if(this.validTypes.includes(type)) {
            return true;
        } else {
            throw new Error("The name of timer is not of one of these types " + this.validTypes.toString());
        }
    }
    
    /**
     * Sets a timer for use by this name
     * @param {bigint|number|string|custom} name the name of the timer to set
     * 
     * @returns {bigint} the time set for this name in nanoseconds
     */
    setTime(name) {        
        if(this.validate(name)) {
            this.timers[name] = process.hrtime.bigint();
            return this.timers[name];
        }        
    }

    /**
     * gets the time that was set for this name
     * @param {bigint|number|string|custom} name the name of the timer to set
     * 
     * @returns {bigint} the time set for this name in nanoseconds
     */
    getTime(name) {
        if(this.validate(name)) {
            return this.timers[name];
        }
        
    }

    /**
     * Gets the difference between time set and time now
     * @param {bigint|number|string|custom} name the name of the timer to set
     * 
     * @returns {bigint} the difference in time set and time now in nanoseconds
     */
    diffTime(name) {
        if(this.validate(name)) {            
            return process.hrtime.bigint() - this.getTime(name);        
        }
        
    }

    /**
     * Gets the difference in time set to time now returning verbose data.
     * @param {bigint|number|string|custom} name the name of the timer to set
     * 
     * @returns {object} an object containing the details of this time difference
     */
    elapsedTime(name) {
        if(this.validate(name)) {
            // get time
            const diff = this.diffTime(name);
            
            // math
            let nano = Number(diff);
            const seconds = Math.floor(nano / 1e9);
            nano = nano % 1e9;
            const milliseconds = Math.floor(nano / 1e6);
            nano = nano % 1e6;
            
            // send results
            return {
                "nanosecondsDiff": diff,
                "data": {
                    "seconds": seconds,
                    "milliseconds": milliseconds,
                    "nanoseconds": nano
                },
                "formatted": `+ ${seconds}s ${milliseconds}ms ${nano}ns`            
            };
        }
    }
}

/**
 * Export the new class for use in other libraries, code, etc...
 */
module.exports = new PTime();