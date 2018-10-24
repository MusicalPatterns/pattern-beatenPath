import { Song } from '../../../src/songTypes'
import { beatenPathSongMaterial } from './songMaterials'
import { beatenPathSongMetadata } from './songMetadata'
import { beatenPathSongSpec } from './songSpecs'

const beatenPathSong: Song = {
    material: beatenPathSongMaterial,
    metadata: beatenPathSongMetadata,
    spec: beatenPathSongSpec,
}

export {
    beatenPathSong,
}
