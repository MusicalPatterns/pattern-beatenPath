import { SongId } from '../../songId'
import { Song } from '../../types'
import { beatenPathSongMaterial } from './songMaterials'
import { beatenPathSongMetadata } from './songMetadata'
import { beatenPathSongSpec } from './songSpecs'

const beatenPathSong: Song = {
    material: beatenPathSongMaterial,
    metadata: beatenPathSongMetadata,
    songId: SongId.BEATEN_PATH,
    spec: beatenPathSongSpec,
}

export {
    beatenPathSong,
}
