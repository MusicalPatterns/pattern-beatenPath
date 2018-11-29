import { PatternId } from '@musical-patterns/registry'
import { Pattern, PatternMaterial, PatternMetadata } from '@musical-patterns/shared'
import { DEFAULT_DURATION_SCALAR } from '../../../patternMaterial'
import { BEATEN_PATH_INITIAL_CORE, BEATEN_PATH_INITIAL_REPETITIONS, BEATEN_PATH_PITCH_SCALAR } from './constants'
import { buildEntities, buildScales } from './materials'
import { BeatenPathPatternSpec } from './types'

const beatenPathPatternMaterial: PatternMaterial = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const beatenPathPatternMetadata: PatternMetadata = {
    // tslint:disable-next-line:max-line-length
    description: 'repeated metric modulation of polyrhythms by neighboring superparticulars, never deviating any further from original duration than necessary',
    formattedName: 'Beaten Path',
    musicalIdeaIllustrated: 'metric modulation cycles',
}

const patternSpec: BeatenPathPatternSpec = {
    core: BEATEN_PATH_INITIAL_CORE,
    patternDurationScalar: DEFAULT_DURATION_SCALAR,
    patternPitchScalar: BEATEN_PATH_PITCH_SCALAR,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
}

const pattern: Pattern = {
    material: beatenPathPatternMaterial,
    metadata: beatenPathPatternMetadata,
    patternId: PatternId.BEATEN_PATH,
    spec: patternSpec,
}

export {
    pattern,
    patternSpec,
}
