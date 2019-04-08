import { Spec } from '@musical-patterns/spec'
import { configurations } from './configurations'
import { initialSpecs } from './initials'
import { presets } from './presets'
import { BeatenPathSpecs } from './types'

const spec: Spec<BeatenPathSpecs> = {
    configurations,
    initialSpecs,
    presets,
}

export {
    spec,
}
