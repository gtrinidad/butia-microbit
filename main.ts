/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */
pins.setAudioPin(DigitalPin.P0)

//% color="#84c324" icon="\uf410"
//% groups="['Sensores', 'Motores', 'eventos']"
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
     * Debug serial
     */
    //% block="Imprimir valor del sensor de $sensor en el puerto $pin"
    //% group="Sensores"
    export function printSensorValue(sensor: Sensors, pin: Jconectors) {
        let value
        if (sensor === Sensors.Distance) {
            value = readDistanceSensor(pin)
        } else {
            value = readLightSensor(pin)
        }
        serial.writeValue("J"+pin%10, value)
    }

    /**
     * Este bloque lee un sensor de grises y devuelve su valor
     */
    //% block="Gris en %pin"
    //% group="Sensores"
    export function readGraySensor(pin: Jconectors): number {
        return 1023 - pins.analogReadPin(pin as number as AnalogPin)
    }

    /**
     * Este bloque lee un sensor de luz ambiente y devuelve su valor
     */
    //% block="Luz en %pin"
    //% group="Sensores"
    export function readLightSensor(pin: Jconectors): number {
        return 1023 - pins.analogReadPin(pin as number as AnalogPin)
    }

    /**
     * Este bloque lee un sensor de distancia y devuelve su valor
     */
    //% block="Distancia en %pin"
    //% group="Sensores"
    export function readDistanceSensor(pin: Jconectors): number {
        let adc_value =  pins.analogReadPin(pin as number as AnalogPin)
        return 9462 / (adc_value - 16)
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
     * Mueve todo el robot hacia una direccion durante un tiempo y se detiene
     */
    //% block="Mover Butiá hacia $dir por $time s"
    //% group="Motores"
    export function moveButiaBlocking(dir: BDirs, time:number) {
        if (dir === BDirs.Atras) { 
            moveMotor (MOptions.Izquierdo, RDirs.Horario)
            moveMotor (MOptions.Derecho, RDirs.AHorario)
        } else {
            moveMotor (MOptions.Derecho, RDirs.Horario)
            moveMotor (MOptions.Izquierdo, RDirs.AHorario)
        }
        basic.pause(time * 1000)
        stop()
    }

    /**
     * Gira todo el robot en una direccion
     */
    //% block="Girar Butiá hacia la $dir"
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
     * Gira todo el robot en una direccion durante un tiempo y se detiene
     */
    //% block="Girar Butiá hacia la $dir por $time s" 
    //% group="Motores"
    export function twistButiaBlocking(dir: GDirs, time:number) {
        if (dir === GDirs.Derecha) { 
            moveMotor (MOptions.Izquierdo, RDirs.Horario)
            moveMotor (MOptions.Derecho, RDirs.Horario)
        } else {
            moveMotor (MOptions.Derecho, RDirs.AHorario)
            moveMotor (MOptions.Izquierdo, RDirs.AHorario)
        }
        basic.pause(time * 1000)
        stop()
    }
    
    /**
     * Detiene al Robot
     */
    //% block="Detener Butiá"
    //% group="Motores"
    export function stop() {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)

        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
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

    const SENSOR_EVENT_ID = 3194

    export enum Sensors {
        //% block="Luz"
        Light = 1,
        //% block="Grises"
        Gray = 2,
        //% block="Boton"
        Button = 3,
        //% block="Distancia"
        Distance = 4,
    }

    export enum SensorEvent {
        //% block="Supero el umbral"
        LevelReached = 1,
        //% block="Dejo de superar el umbral"
        LevelLeft = 2
    }

    function getSensorID(sensor: Sensors, pin: Jconectors) {
        return sensor * 1000 + (pin as number) * 100
    }

    /**
     * Comienza monitoreo
     */
    //% block="Comenzar a monitorear sensor de $sensor en puerto $pin con umbral $threshold"
    //% threshold.min=1 threshold.max=1023
    //% group="Eventos"
    export function startMonitoring(sensor:Sensors, pin: Jconectors, threshold: number) {
        let wasAbove = false
        const sensorID = getSensorID (sensor, pin)
        control.inBackground(() => {
            let cooldown = 5
            while (true) {
                let value
                if (sensor === Sensors.Distance) {
                    value = readDistanceSensor(pin)
                } else {
                    value = readLightSensor(pin)
                }
                const isAbove = value >= threshold
                if (cooldown > 0) {
                    cooldown = cooldown - 1
                }
                else {
                    if (isAbove && !wasAbove) {
                        control.raiseEvent(SENSOR_EVENT_ID, sensorID + 1)
                        cooldown = 5
                    }
    
                    if (!isAbove && wasAbove) {
                        control.raiseEvent(SENSOR_EVENT_ID, sensorID)
                        cooldown = 5
                    }
                }

                wasAbove = isAbove
                basic.pause(20)
            }
        })
    }

    //% block="Cuando el sensor de $sensor en el puerto $pin supera el umbral"
    //% group="Eventos"
    export function onLevelReached(sensor: Sensors, pin: Jconectors, handler: () => void) {
        const sensorID = getSensorID (sensor, pin)
        control.onEvent(
            SENSOR_EVENT_ID,
            sensorID+1,
            handler
        )
    }

    //% block="Cuando el sensor de $sensor en el puerto $pin deja de superar el umbral"
    //% group="Eventos"
    export function onLevelUnreached(sensor: Sensors, pin: Jconectors, handler: () => void) {
        const sensorID = getSensorID (sensor, pin)
        control.onEvent(
            SENSOR_EVENT_ID,
            sensorID,
            handler
        )
    }

    /**
     * Comienza monitoreo de boton
     */
    //% block="Monitorear el boton en puerto $pin"
    //% group="Eventos"
    export function startMonitoringButton(pin: Jconectors) {
        let wasAbove = false
        const sensorID = getSensorID (Sensors.Button, pin)
        control.inBackground(() => {
            while (true) {
                const isAbove = readButton(pin)

                if (isAbove && !wasAbove) {
                    control.raiseEvent(SENSOR_EVENT_ID, sensorID + 1)
                }

                wasAbove = isAbove
                basic.pause(20)
            }
        })
    }

    //% block="Cuando el boton en el puerto $pin es presionado"
    //% group="Eventos"
    export function onButton(pin: Jconectors, handler: () => void) {
        const sensorID = getSensorID (Sensors.Button, pin)
        control.onEvent(
            SENSOR_EVENT_ID,
            sensorID+1,
            handler
        )
    }

}