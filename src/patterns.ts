import { Material } from '@musical-patterns/compiler'
import { buildStandardScales, Id, Metadata, Pattern, Patterns } from '@musical-patterns/pattern'
import { buildEntities } from './material'
import { post } from './metadata'
import { BeatenPathSpec, specData } from './spec'

const material: Material = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildStandardScales,
}

const metadata: Metadata = {
    description: post,
    formattedName: 'Beaten Path',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-10-01T07:00:00.000Z',
    musicalIdeaIllustrated: 'metric modulation cycles',
    originalPublish: '2018-10-01T07:00:00.000Z',
    version: process.env.PATTERN_VERSION || 'unknown',
}

const pattern: Pattern<BeatenPathSpec> = {
    id: Id.BEATEN_PATH,
    material,
    metadata,
    specData,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
