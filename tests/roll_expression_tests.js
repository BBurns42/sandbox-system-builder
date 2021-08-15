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

    // Make a couple Math functions visible locally to eval
    // to emulate the real Roll's support for them.
    function ceil( num ){
        return Math.ceil( num );
    }
    function floor( num ){
        return Math.floor( num );
    }

    this.evaluate = function() {
        this.total = eval( expression );
    }
}


var stop_on_fail = false;
var successful_asserts = 0;
var failed_asserts = 0;

// Simple test assertion.
function assert( success, message = ''){

    if( success ){
        // Report success.
        console.log( `${message}${color_green}\t Success${color_reset}` );
        successful_asserts++;
    } else {
        // Report failure.
        console.log( `${message}${color_red}\t Failure${color_reset}` );
        failed_asserts++;

        // Exit if asked to.
        if( stop_on_fail ){
            process.exit( 1 );
        }
    }

}

// Asserts that two values are equal.
function assert_equal( a, b, message = '') {
    // Create a message that mentions the values.
    var equality_message = `${message} ('${a}' == '${b}')`;

    // Delegate to plain assert.
    // Use loose equality, the parser is loose with strings and numbers.
    assert( a == b, equality_message );
}

// Assert that evaluationg the given expression gives the provided result.
async function assert_result(
    // The expected result.
    expected,
    // The expression to evaluate.
    expression,
    // Actor attributes for evaluation.
    actor_attributes = {},
    // Item attributes for evaluation.
    item_attributes = {} )
{
    // Evaluate.
    var result = await auxMeth.autoParser( expression, actor_attributes, item_attributes, false, false, 1 );
    assert_equal( result, expected, expression );
}

// Test that the mock of Roll
// behaves with a basic level of sanity.
function test_mocked_roll(){
    var roll = new Roll('1+2');
    roll.evaluate();
    assert_equal(3, roll.total );
}
test_mocked_roll();

// Test that simple arithmetic works.
async function test_basic_arithmetic(){
    await assert_result( 3, "1 + 2" );
    await assert_result( 6, "2 * 3" );
}
await test_basic_arithmetic();

// Test fetching item attributes.
async function test_get_attribute(){
    await assert_result("Billy", "#{name}", {}, {name:'Billy'} );

    await assert_result( 4, "#{damage} + 1", {}, {damage:{value: 3}} );

    await assert_result( 6, "@{damage} + 1", {damage:{value:5}}, {damage:{value: 3}} );
}
await test_get_attribute();

async function test_number_functions(){
    await assert_result( 2, "ceil(1.5)" );

    await assert_result( 1, "floor(1.5)" );

    // Combine math and attribute.
    await assert_result( 2, "floor(@{damage})", {damage:{value:2.6}}, {} );
}
await test_number_functions();

// Test lookup expressions.
async function test_lookup(){
    await assert_result( 7, "%[1, 0:7, 5: 14, 7: 8]" );
    await assert_result( 14, "%[5, 0:7, 5: 14, 7: 8]" );
    await assert_result( 8, "%[100, 0:7, 5: 14, 7: 8]" );
    await assert_result( 19, "%[@{height}, 0:7, 5: #{width}, 7: 8]", {height:{value: 6}}, {width:{value:19}} );
}
await test_lookup();

console.log( `Successful asserts: ${successful_asserts}` );
console.log( `Failed asserts: ${failed_asserts}` );

if( failed_asserts == 0 ){
    console.log( `${color_green}Total Success!${color_reset}` );
} else {
    console.log( `${color_red}Tests failed!${color_reset}` );
    process.exitCode = failed_asserts;
}
