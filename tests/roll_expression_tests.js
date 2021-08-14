// This file can be run using node.js to test
// the roll expression parser.
// It is a complex piece of code, so it
// benefits from being tested programmatically without
// having to mess around int the ui.


//var auxMeth = require( '../module/auxmeth.js' );

import process from 'process'
import { auxMeth } from '../module/auxmeth.js'

// Colored output variables.
var color_reset = "\x1b[0m"
var color_red = "\x1b[31m"
var color_green = "\x1b[32m"
var color_yellow = "\x1b[33m"

// Mock global game object.
global.game = {
    settings: {
        get: async function( scope, key ) {
            return null;
        }
    }
}

// Mock Roll
global.Roll = function( expression ){
    this.evaluate = function() {
        this.total = eval( expression );
    }
}

// Simple test assertion.
var stop_on_fail = false;
var successful_asserts = 0;
var failed_asserts = 0;
function assert( success, message = ''){

    if( success ){
        // Report success.
        console.log( `${message}${color_green}\t Success${color_reset}` );
        successful_asserts++;
    } else {
        // Report failure.
        console.log( `${message}${color_red}\t Failure${color_reset}` );
        failed_asserts++;
    }

}

// Assert that two values are equal.
function assert_equal( a, b, message = '') {
    // Create a message that mentions the values.
    var equality_message = `${message} ('${a}' == '${b}')`;

    // Delegate to plain assert.
    assert( a === b, equality_message );
}

function test_mocked_roll(){
    var roll = new Roll('1+2');
    roll.evaluate();
    assert_equal(3, roll.total );
}
test_mocked_roll();

async function test_basic_arithmetic(){
    var result = await auxMeth.autoParser("1 + 2", {}, {}, false, false, 1 );
    assert_equal( result, 3, "1 + 2 == 3" );
    result = await auxMeth.autoParser("1 + 2", {}, {}, true, false, 1 );
    assert_equal( result, 3, "1 + 2 == 3" );
    result = await auxMeth.autoParser("1 + 2", {}, {}, true, true, 1 );
    assert_equal( result, 3, "1 + 2 == 3" );
}
await test_basic_arithmetic();


async function test_get_attribute(){
    var result = await auxMeth.autoParser("#{name}", {}, {name:'Billy'}, false, false, 1 );
    assert_equal( 'Billy', result, "Get name" );

    result = await auxMeth.autoParser("#{damage} + 1", {}, {damage:{value: 3}}, false, false, 1 );
    assert_equal( 4, result, "Get damage and add a value" );
}
await test_get_attribute();

console.log( `Successful asserts: ${successful_asserts}` );
console.log( `Failed asserts: ${failed_asserts}` );

if( failed_asserts == 0 ){
    console.log( `${color_green}Total Success!${color_reset}` );
} else {
    console.log( `${color_red}Tests failed!${color_reset}` );
    process.exitCode = failed_asserts;
}
