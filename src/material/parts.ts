import { NoteSpec } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { DictionaryOf, sequence } from '@musical-patterns/utilities'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { buildDurationsAndRatios } from '../custom'
import { Core } from '../nominal'
import { BeatenPathSpec } from '../types'
import { buildSegments } from './segments'

const buildParts: (spec: BeatenPathSpec) => DictionaryOf<NoteSpec[]> =
    ({ core, repetitions, reverse }: BeatenPathSpec): DictionaryOf<NoteSpec[]> => {
        const clampedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { ratios, durations } = buildDurationsAndRatios(clampedCore)
        const segments: Segment[] = buildSegments({ durations, ratios, repetitions })

        const firstPart: NoteSpec[] = sequence(
            segments.map((segment: Segment): NoteSpec[] => segment[ 0 ]),
        )
        const secondPart: NoteSpec[] = sequence(
            segments.map((segment: Segment): NoteSpec[] => segment[ 1 ]),
        )

        return {
            firstPart: reverse ? firstPart.reverse() : firstPart,
            secondPart: reverse ? secondPart.reverse() : secondPart,
        }
    }

export {
    buildParts,
}
