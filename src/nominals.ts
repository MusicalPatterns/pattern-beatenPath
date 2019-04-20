import { computeNominalInterface, DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE } from '@musical-patterns/utilities'

type Core = Number & { _NominalBrand: 'Core' }

const { as, notAs } = computeNominalInterface({
    number: {
        Core: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Core,
    },
})

export {
    as,
    notAs,
    Core,
}
