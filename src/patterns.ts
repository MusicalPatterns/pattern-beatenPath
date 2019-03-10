import { Material } from '@musical-patterns/compiler'
import { Id, materializeStandardScales, Metadata, Pattern, Patterns } from '@musical-patterns/pattern'
import { materializeEntities } from './material'
import { post } from './metadata'
import { BeatenPathSpec, data } from './spec'

const material: Material = {
    materializeEntities,
    materializeScales: materializeStandardScales,
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
    data,
    id: Id.BEATEN_PATH,
    material,
    metadata,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
