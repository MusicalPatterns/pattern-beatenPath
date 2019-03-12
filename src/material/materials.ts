import { Material } from '@musical-patterns/compiler'
import { materializeStandardScales } from '@musical-patterns/pattern'
import { materializeEntities } from './entities'

const material: Material = {
    materializeEntities,
    materializeScales: materializeStandardScales,
}

export {
    material,
}
