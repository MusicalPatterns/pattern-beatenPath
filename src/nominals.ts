import { computeNominalInterface, DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE } from '@musical-patterns/utilities'

type Core = Number & { _NominalBrand: 'Core' }

const { to, from } = computeNominalInterface({
    number: {
        Core: DUMMY_VALUE_FOR_COMPUTING_NOMINAL_INTERFACE as Core,
    },
})

export {
    to,
    from,
    Core,
}
