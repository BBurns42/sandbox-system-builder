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

// Simple test assertion.
var stop_on_fail = false;
var successful_asserts = 0;
var failed_asserts = 0;
function assert( success, message ){

    if( success ){
        // Report success.
        console.log( `${message}${color_green}\tSuccess${color_reset}` );
        successful_asserts++;
    } else {
        // Report failure.
        console.log( `${message}${color_red}\Failure${color_reset}` );
        failed_asserts++;
    }

}

function test_basic_arithmetic(){
    assert( true, "Test truth" );
}
test_basic_arithmetic();

console.log( `Successful asserts: ${successful_asserts}` );
console.log( `Failed asserts: ${failed_asserts}` );

if( failed_asserts == 0 ){
    console.log( `${color_green}Total Success!${color_reset}` );
} else {
    console.log( `${color_red}Tests failed!${color_reset}` );
    process.exitCode = failed_asserts;
}
