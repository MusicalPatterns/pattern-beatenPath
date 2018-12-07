import { NoteSpec } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { DictionaryOf, sequence } from '@musical-patterns/utilities'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { buildDurationsAndRatios } from '../custom'
import { Core } from '../nominal'
import { BeatenPathPatternSpec } from '../types'
import { buildSegments } from './segments'

const buildParts: (patternSpec: BeatenPathPatternSpec) => DictionaryOf<NoteSpec[]> =
    ({ core, repetitions }: BeatenPathPatternSpec): DictionaryOf<NoteSpec[]> => {
        const clampedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { beatenPathRatios, beatenPathDurations } = buildDurationsAndRatios(clampedCore)
        const beatenPathSegments: Segment[] = buildSegments({ beatenPathDurations, beatenPathRatios, repetitions })

        const beatenPathOnePart: NoteSpec[] = sequence(
            beatenPathSegments.map((segment: Segment): NoteSpec[] => segment[ 0 ]),
        )
        const beatenPathTwoPart: NoteSpec[] = sequence(
            beatenPathSegments.map((segment: Segment): NoteSpec[] => segment[ 1 ]),
        )

        return { beatenPathOnePart, beatenPathTwoPart }
    }

export {
    buildParts,
}
