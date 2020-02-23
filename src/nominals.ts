import {
    Cardinal,
    computeNominalInterface,
    DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE,
    Maybe,
} from '@musical-patterns/utilities'

type Core = Number & { _NominalBrand: 'Core' }
type Repetition = Number & { _NominalBrand: 'Repetition' }

const { as: beatenPathAs } = computeNominalInterface({
    number: {
        Core: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Core,
        Repetition: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Repetition,
    },
})

type Repetitions = Maybe<Cardinal<Repetition[]>>

export {
    beatenPathAs,
    Core,
    Repetition,
    Repetitions,
}
