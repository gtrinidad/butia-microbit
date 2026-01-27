/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */
pins.setAudioPin(DigitalPin.P0)

//% color="#84c324" icon="\uf410"
//% groups="['Sensores', 'Motores']"
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
    export enum BDirs {
        //% block="Adelante"
        Adelante = 0,
        //% block="Atras"
        Atras = 1
    }
    export enum GDirs {
        //% block="Derecha"
        Derecha = 0,
        //% block="Izquierda"
        Izquierda = 1
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
    //% group="Sensores"
    export function readSensor(pin: Jconectors): number {
        return Math.map(pins.analogReadPin(pin as number as AnalogPin), 0, 1023, 0, 100)
    }

    /**
     * Consultar el estado del botón
     */
    //% block="Boton en $pin esta apretado"
    //% group="Sensores"
    export function readButton(pin: Jconectors): boolean {
        return pins.digitalReadPin(pin as number as AnalogPin) == 0;
    }

    /**
     * Mueve todo el robot hacia una direccion
     */
    //% block="Mover Butiá hacia $dir"
    //% group="Motores"
    export function moveButia(dir: BDirs) {
        if (dir === BDirs.Atras) { 
            moveMotor (MOptions.Izquierdo, RDirs.Horario)
            moveMotor (MOptions.Derecho, RDirs.AHorario)
        } else {
            moveMotor (MOptions.Derecho, RDirs.Horario)
            moveMotor (MOptions.Izquierdo, RDirs.AHorario)
        }
    }

    /**
     * Gira todo el robot en una direccion
     */
    //% block="Mover Butiá hacia $dir"
    //% group="Motores"
    export function twistButia(dir: GDirs) {
        if (dir === GDirs.Derecha) { 
            moveMotor (MOptions.Izquierdo, RDirs.Horario)
            moveMotor (MOptions.Derecho, RDirs.Horario)
        } else {
            moveMotor (MOptions.Derecho, RDirs.AHorario)
            moveMotor (MOptions.Izquierdo, RDirs.AHorario)
        }
    }

    /**
     * Mueve un unico motor en una direccion
     */
    //% block="Prender motor $id en sentido $dir"
    //% group="Motores"
    export function moveMotor(id: MOptions, dir: RDirs) {
        let mDirs = (dir === RDirs.Horario) ? [1, 0] : [0, 1]
        let mPins = (id === MOptions.Izquierdo) ? [DigitalPin.P13,DigitalPin.P14] : [DigitalPin.P15,DigitalPin.P16]

        pins.digitalWritePin(mPins[0], mDirs[0])
        pins.digitalWritePin(mPins[1], mDirs[1])
    }



}