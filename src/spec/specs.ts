import { Spec } from '@musical-patterns/pattern'
import { configurations } from './configurations'
import { initialSpecs } from './initials'
import { BeatenPathSpecs } from './types'

const spec: Spec<BeatenPathSpecs> = {
    configurations,
    initial: initialSpecs,
}

export {
    spec,
}
