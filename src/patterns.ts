import { PatternMaterial } from '@musical-patterns/compiler'
import { DEFAULT_DURATION_SCALAR, PatternMetadata } from '@musical-patterns/pattern'
import { buildPatterns, Pattern, PatternId, Patterns } from '@musical-patterns/registry'
import { to } from '@musical-patterns/utilities'
import { BEATEN_PATH_INITIAL_CORE, BEATEN_PATH_INITIAL_REPETITIONS, BEATEN_PATH_PITCH_SCALAR } from './constants'
import { buildEntities, buildScales } from './materials'
import { post } from './metadata'
import { BeatenPathPatternSpec } from './types'

const material: PatternMaterial = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const metadata: PatternMetadata = {
    description: post,
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

const patterns: Patterns = buildPatterns({
    [ pattern.patternId ]: pattern,
})

export {
    pattern,
    patterns,
    spec,
}
