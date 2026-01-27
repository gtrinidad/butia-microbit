/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#84c324" icon="\uf410"
namespace Butia {
    export enum Jconectors {
        //% block="J1"
        J1 = AnalogPin.P1,
        //% block="J2"
        J2 = AnalogPin.P2,
        //% block="J3"
        J3 = AnalogPin.P3,
        //% block="J4"
        J4 = AnalogPin.P4,
        //% block="J5"
        J5 = AnalogPin.P10,
    }

    /**
     * Este bloque lee un sensor de grises y devuelve su valor
     */
    //% block="Sensor en %pin"
    export function readSensor(pin: Jconectors): number {
        return Math.map(pins.analogReadPin(pin as number as AnalogPin), 0, 1023, 0, 100)
    }

    /**
     * Consultar el estado del botón
     */
    //% block="Boton en $pin esta apretado"
    export function readButton(pin: boolean): boolean {
        return pins.digitalReadPin(pin as number as AnalogPin) == 1;
    }

}