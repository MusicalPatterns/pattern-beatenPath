import { Id, Pattern, Patterns } from '@musical-patterns/pattern'
import { material } from './material'
import { metadata } from './metadata'
import { BeatenPathSpecs, spec } from './spec'

const pattern: Pattern<BeatenPathSpecs> = {
    id: Id.BEATEN_PATH,
    material,
    metadata,
    spec,
}

const patterns: Partial<Patterns> = {
    [ pattern.id ]: pattern,
}

export {
    pattern,
    patterns,
}
