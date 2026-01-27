/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

export enum MyAnalogPin {
    //% block="J1"
    J1 = AnalogPin.P1,
    //% block="J2"
    J2 = AnalogPin.P2,
    //% block="J3"
    J3 = AnalogPin.P3,
    //% block="J4"
    J4 = AnalogPin.P4,
    //% block="J5"
    J5 = AnalogPin.P5,
}

//% color="#84c324" icon="\uf410"
namespace Butia {
    /**
     * Este bloque lee un sensor de grises y devuelve su valor
     */
    
    //% block="Sensor en %pin"
    export function readSensor(pin: MyAnalogPin): number {
        return pins.analogReadPin(pin as AnalogPin)
    }

    // note that Caml casing yields lower case
    // block text with spaces

    //% block
    export function camlCaseTwo() {

    }
}