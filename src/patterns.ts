import { PatternMaterial } from '@musical-patterns/compiler'
import { PatternMetadata } from '@musical-patterns/pattern'
import { buildPatterns, Pattern, PatternId, Patterns } from '@musical-patterns/registry'
import { buildEntities, buildScales } from './materials'
import { post } from './metadata'
import { initialSpec, specAttributes } from './specs'

const material: PatternMaterial = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const metadata: PatternMetadata = {
    description: post,
    formattedName: 'Beaten Path',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-10-01T07:00:00.000Z',
    musicalIdeaIllustrated: 'metric modulation cycles',
    originalPublish: '2018-10-01T07:00:00.000Z',
}

const pattern: Pattern = {
    initialSpec,
    material,
    metadata,
    patternId: PatternId.BEATEN_PATH,
    specAttributes,
}

const patterns: Patterns = buildPatterns({
    [ pattern.patternId ]: pattern,
})

export {
    pattern,
    patterns,
}
