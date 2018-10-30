import { DictionaryOf, Part, Segment, sequence } from '../../../../src'
import { MINIMUM_FUNCTIONAL_CORE } from '../constants'
import { buildBeatenPathDurationsAndRatios } from '../custom'
import { Core } from '../nominal'
import { buildBeatenPathSegments } from './segments'

const buildBeatenPathParts: (core: Core) => DictionaryOf<Part> =
    (core: Core): DictionaryOf<Part> => {
        const clampeedCore: Core = core < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : core

        const { beatenPathRatios, beatenPathDurations } = buildBeatenPathDurationsAndRatios(clampeedCore)
        const beatenPathSegments: Segment[] = buildBeatenPathSegments(beatenPathDurations, beatenPathRatios)

        const beatenPathOnePart: Part = sequence(
            beatenPathSegments.map((segment: Segment): Part => segment[ 0 ]),
        )
        const beatenPathTwoPart: Part = sequence(
            beatenPathSegments.map((segment: Segment): Part => segment[ 1 ]),
        )

        return { beatenPathOnePart, beatenPathTwoPart }
    }

export {
    buildBeatenPathParts,
}
