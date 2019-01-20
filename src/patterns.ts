import { Material } from '@musical-patterns/compiler'
import { Metadata } from '@musical-patterns/pattern'
import { buildPatterns, Id, PatternFor, Patterns } from '@musical-patterns/registry'
import { buildEntities, buildScales } from './materials'
import { post } from './metadata'
import { specData } from './specs'
import { BeatenPathSpec } from './types'

const material: Material = {
    buildEntitiesFunction: buildEntities,
    buildScalesFunction: buildScales,
}

const metadata: Metadata = {
    description: post,
    formattedName: 'Beaten Path',
    mostRecentPublish: process.env.PUBLISH_DATE || '2018-10-01T07:00:00.000Z',
    musicalIdeaIllustrated: 'metric modulation cycles',
    originalPublish: '2018-10-01T07:00:00.000Z',
}

const pattern: PatternFor<BeatenPathSpec> = {
    id: Id.BEATEN_PATH,
    material,
    metadata,
    specData,
}

const patterns: Patterns = buildPatterns({
    [ pattern.id ]: pattern,
})

export {
    pattern,
    patterns,
}
