import { SongMaterial } from '../../../src/songTypes'
import { buildBeatenPathEntities } from './entities'
import { buildBeatenPathScales } from './scales'

const beatenPathSongMaterial: SongMaterial = {
    buildEntitiesFunction: buildBeatenPathEntities,
    buildScalesFunction: buildBeatenPathScales,
}

export {
    beatenPathSongMaterial,
}
