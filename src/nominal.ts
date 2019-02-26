// tslint:disable ban-types no-type-definitions-outside-types-modules no-any

import { buildNominalInterface, DUMMY_VALUE_FOR_BUILDING_NOMINAL_INTERFACE } from '@musical-patterns/utilities'

type Core = Number & { _CoreBrand: void }

const { to, from } = buildNominalInterface({
    number: {
        Core: DUMMY_VALUE_FOR_BUILDING_NOMINAL_INTERFACE as any as Core,
    },
})

export {
    to,
    from,
    Core,
}
