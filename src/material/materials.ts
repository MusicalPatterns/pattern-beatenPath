import { Material, materializeStandardScales } from '@musical-patterns/material'
import { materializeEntities } from './entities'

const material: Material = {
    materializeEntities,
    materializeScales: materializeStandardScales,
}

export {
    material,
}
