import { NoteSpec } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { sequence } from '@musical-patterns/utilities'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { Core } from '../nominal'
import { BeatenPathSpec } from '../spec'
import { buildFractionsAndScalars } from './custom'
import { buildSegments } from './segments'
import { BeatenPathPart, BeatenPathParts } from './types'

const buildParts: (spec: BeatenPathSpec) => BeatenPathParts =
    ({ core, repetitions, reverse, style }: BeatenPathSpec): BeatenPathParts => {
        const clampedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { fractions, scalars } = buildFractionsAndScalars(clampedCore)
        const segments: Segment[] = buildSegments({ scalars, fractions, repetitions, style })

        const firstPart: NoteSpec[] = sequence(
            segments.map((segment: Segment): NoteSpec[] => segment[ 0 ]),
        )
        const secondPart: NoteSpec[] = sequence(
            segments.map((segment: Segment): NoteSpec[] => segment[ 1 ]),
        )

        return {
            [ BeatenPathPart.FIRST_PART ]: reverse ? firstPart.reverse() : firstPart,
            [ BeatenPathPart.SECOND_PART ]: reverse ? secondPart.reverse() : secondPart,
        }
    }

export {
    buildParts,
}
