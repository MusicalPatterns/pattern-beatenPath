import { computeNominalInterface, DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE } from '@musical-patterns/utilities'

type Core = Number & { _NominalBrand: 'Core' }
type Repetition = Number & { _NominalBrand: 'Repetition' }

const { as, notAs, of } = computeNominalInterface({
    number: {
        Core: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Core,
        Repetition: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Repetition,
    },
})

export {
    as,
    notAs,
    of,
    Core,
    Repetition,
}
