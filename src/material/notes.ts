import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { sequence } from '@musical-patterns/utilities'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { Core } from '../nominal'
import { BeatenPathSpec } from '../spec'
import { buildFractionsAndScalars } from './custom'
import { buildSegments } from './segments'
import { BeatenPathEntity, BeatenPathEntityNotes } from './types'

const buildNotes: (spec: BeatenPathSpec) => BeatenPathEntityNotes =
    ({ core, repetitions, reverse, style }: BeatenPathSpec): BeatenPathEntityNotes => {
        const clampedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { fractions, scalars } = buildFractionsAndScalars(clampedCore)
        const segments: Segment[] = buildSegments({ scalars, fractions, repetitions, style })

        const firstEntityNotes: Note[] = sequence(
            segments.map((segment: Segment): Note[] => segment[ 0 ]),
        )
        const secondEntityNotes: Note[] = sequence(
            segments.map((segment: Segment): Note[] => segment[ 1 ]),
        )

        return {
            [ BeatenPathEntity.FIRST ]: reverse ? firstEntityNotes.reverse() : firstEntityNotes,
            [ BeatenPathEntity.SECOND ]: reverse ? secondEntityNotes.reverse() : secondEntityNotes,
        }
    }

export {
    buildNotes,
}
