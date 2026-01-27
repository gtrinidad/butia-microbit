/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */
pins.setAudioPin(DigitalPin.P0)

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
    export enum RDirs {
        //% block="Horario"
        Horario = 0,
        //% block="Anti-horario"
        AHorario = 1
    }
    export enum MOptions {
        //% block="Izquierdo"
        Izquierdo = 0,
        //% block="Derecho"
        Derecho = 1
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
    export function readButton(pin: Jconectors): boolean {
        return pins.digitalReadPin(pin as number as AnalogPin) == 0;
    }

    /**
     * Consultar el estado del botón
     */
    //% block="Prender motor $id en sentido $dir"
    export function moveMotor(id: MOptions, dir: RDirs) {
        let mDirs = (dir === RDirs.Horario) ? [1, 0] : [0, 1]
        let mPins = (id === MOptions.Izquierdo) ? [DigitalPin.P13,DigitalPin.P14] : [DigitalPin.P15,DigitalPin.P16]

        pins.digitalWritePin(mPins[0], mDirs[0])
        pins.digitalWritePin(mPins[1], mDirs[1])
    }

    


}