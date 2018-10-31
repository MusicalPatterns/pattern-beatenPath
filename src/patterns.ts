import { DEFAULT_RAW_TIME_TYPE_DURATION_SCALAR } from '../../../src'
import { PatternId } from '../../patternId'
import { Pattern, PatternMaterial, PatternMetadata } from '../../types'
import { BEATEN_PATH_CORE, BEATEN_PATH_PITCH_SCALAR } from './constants'
import { buildBeatenPathEntities, buildBeatenPathScales } from './materials'
import { BeatenPathPatternSpec } from './types'

const beatenPathPatternMaterial: PatternMaterial = {
    buildEntitiesFunction: buildBeatenPathEntities,
    buildScalesFunction: buildBeatenPathScales,
}

const beatenPathPatternMetadata: PatternMetadata = {
    // tslint:disable-next-line:max-line-length
    description: 'repeated metric modulation of polyrhythms by neighboring superparticulars, never deviating any further from original duration than necessary',
    formattedName: 'Beaten Path',
}

const beatenPathPatternSpec: BeatenPathPatternSpec = {
    core: BEATEN_PATH_CORE,
    patternDurationScalar: DEFAULT_RAW_TIME_TYPE_DURATION_SCALAR,
    patternPitchScalar: BEATEN_PATH_PITCH_SCALAR,
}

const beatenPathPattern: Pattern = {
    material: beatenPathPatternMaterial,
    metadata: beatenPathPatternMetadata,
    patternId: PatternId.BEATEN_PATH,
    spec: beatenPathPatternSpec,
}

export {
    beatenPathPattern,
}
