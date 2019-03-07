// tslint:disable ban-types

import { buildNominalInterface, DUMMY_VALUE_FOR_BUILDING_NOMINAL_INTERFACE } from '@musical-patterns/utilities'

type Core = Number & { _NominalBrand: 'Core' }

const { to, from } = buildNominalInterface({
    number: {
        Core: DUMMY_VALUE_FOR_BUILDING_NOMINAL_INTERFACE as Core,
    },
})

export {
    to,
    from,
    Core,
}
