var assert = require('assert');
describe('PTime:', function() {
    let ptime;

    it('should initialize ptime', function() {
        ptime = require('../index');
        assert.equal(typeof ptime, "object");
    })

    it('should initialize valid types', function() {        
        assert.equal(["bigint", "number", "string"].toString(), ptime.validTypes.toString());
    });

    it('should initialize an empty timer object', function() {
        assert.equal({}.toString(), ptime.timers.toString());
    });

    it('should allow addition of custom type', function() {
        ptime.validTypes.push("customType");
        assert.equal(["bigint", "number", "string", "customType"].toString(), ptime.validTypes.toString());
        
    })

    it('should break on wrong type passed to timers', function() {
        const func = () => { console.log("some function");}
        try {
            ptime.setTime(func);
        } catch (e) {
            assert.equal(e.message, "The name of timer is not of one of these types bigint,number,string,customType");
        }
    });

    let time;
    it('should allow a time to be set for a name', function() {
        time = ptime.setTime("my timer");
        
        assert.notEqual(!!time, !!undefined);
        assert.equal(typeof time, "bigint");
    });

    it('should get the same time that was set', function() {
        const newTime = ptime.getTime("my timer");
        assert.equal(time, newTime);
    });

    it('should wait and get difference in time', async function() {
        this.slow(1000); // suppress time warnings
        let diff = await new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(ptime.diffTime("my timer"));
            }, 150);
        });
                        
        assert.equal(typeof diff, "bigint");
    });
    
    it('should wait and get detailed difference in time', async function() {
        this.slow(4000); // suppress time warnings
        let diff = await new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(ptime.elapsedTime("my timer"));
            }, 1500)
        });        
                
        assert.equal(typeof diff.nanosecondsDiff, "bigint");
        assert.equal(typeof diff.data.seconds, "number");
        assert.equal(typeof diff.data.milliseconds, "number");
        assert.equal(typeof diff.data.nanoseconds, "number");
        assert.equal(typeof diff.formatted, "string");        
    });

    
})