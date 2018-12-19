import { PatternMaterial } from '@musical-patterns/compiler'
import { DEFAULT_DURATION_SCALAR, Pattern, PatternId, PatternMetadata } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { BEATEN_PATH_INITIAL_CORE, BEATEN_PATH_INITIAL_REPETITIONS, BEATEN_PATH_PITCH_SCALAR } from './constants'
import { buildEntities, buildScales } from './materials'
import { BeatenPathPatternSpec } from './types'

const material: PatternMaterial = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const metadata: PatternMetadata = {
    // tslint:disable-next-line:max-line-length
    description: 'repeated metric modulation of polyrhythms by neighboring superparticulars, never deviating any further from original duration than necessary',
    formattedName: 'Beaten Path',
    musicalIdeaIllustrated: 'metric modulation cycles',
}

const spec: BeatenPathPatternSpec = {
    core: BEATEN_PATH_INITIAL_CORE,
    patternDurationOffset: to.Offset(0),
    patternDurationScalar: DEFAULT_DURATION_SCALAR,
    patternPitchOffset: to.Offset(0),
    patternPitchScalar: BEATEN_PATH_PITCH_SCALAR,
    repetitions: BEATEN_PATH_INITIAL_REPETITIONS,
}

const pattern: Pattern = {
    material,
    metadata,
    patternId: PatternId.BEATEN_PATH,
    spec,
}

export {
    pattern,
    spec,
}
