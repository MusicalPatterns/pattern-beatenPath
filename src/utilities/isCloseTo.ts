const DECIMAL: number = 10
const ONE: number = 1
const TWO: number = 2

const isCloseTo: (numberOne: number, numberTwo: number) => boolean =
    (numberOne: number, numberTwo: number): boolean => {
        const precision: number = 2

        const pow: number = Math.pow(DECIMAL, precision + ONE)
        const delta: number = Math.abs(numberOne - numberTwo)
        const maxDelta: number = Math.pow(DECIMAL, -precision) / TWO

        return Math.round(delta * pow) / pow <= maxDelta
    }

export {
    isCloseTo,
}
