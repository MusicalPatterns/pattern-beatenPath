import { DEFAULT_RAW_TIME_TYPE_DURATION_SCALAR } from '../../../src'
import { SongId } from '../../songId'
import { Song, SongMaterial, SongMetadata } from '../../types'
import { BEATEN_PATH_CORE, BEATEN_PATH_PITCH_SCALAR } from './constants'
import { buildBeatenPathEntities, buildBeatenPathScales } from './materials'
import { BeatenPathSongSpec } from './types'

const beatenPathSongMaterial: SongMaterial = {
    buildEntitiesFunction: buildBeatenPathEntities,
    buildScalesFunction: buildBeatenPathScales,
}

const beatenPathSongMetadata: SongMetadata = {
    // tslint:disable-next-line:max-line-length
    description: 'repeated metric modulation of polyrhythms by neighboring superparticulars, never deviating any further from original duration than necessary',
    formattedName: 'Beaten Path',
}

const beatenPathSongSpec: BeatenPathSongSpec = {
    core: BEATEN_PATH_CORE,
    songDurationScalar: DEFAULT_RAW_TIME_TYPE_DURATION_SCALAR,
    songPitchScalar: BEATEN_PATH_PITCH_SCALAR,
}

const beatenPathSong: Song = {
    material: beatenPathSongMaterial,
    metadata: beatenPathSongMetadata,
    songId: SongId.BEATEN_PATH,
    spec: beatenPathSongSpec,
}

export {
    beatenPathSong,
}
