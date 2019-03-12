import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { sequence } from '@musical-patterns/utilities'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { Core } from '../nominal'
import { BeatenPathSpecs } from '../spec'
import { computeFractionsAndScalars } from './custom'
import { computeSegments } from './segments'
import { BeatenPathEntity, BeatenPathEntityNotes } from './types'

const computeNotes: (specs: BeatenPathSpecs) => BeatenPathEntityNotes =
    ({ core, repetitions, reverse, style }: BeatenPathSpecs): BeatenPathEntityNotes => {
        const clampedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { fractions, scalars } = computeFractionsAndScalars(clampedCore)
        const segments: Segment[] = computeSegments({ scalars, fractions, repetitions, style })

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
    computeNotes,
}
