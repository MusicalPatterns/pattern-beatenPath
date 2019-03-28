import {
    absoluteRatio,
    apply,
    Cycle,
    Denominator,
    DOWN_ONE,
    finalElement,
    Fraction,
    from,
    isCloseTo,
    reciprocal,
    Scalar,
    to,
    UP_ONE,
} from '@musical-patterns/utilities'
import { Core, from as beatenPathFrom } from '../../nominals'
import { CoreCycles } from '../types'
import { INITIAL_CORE_DURATION } from './constants'

const isUpwardsDurationCloserToOriginalDurationOfOne:
    (maybeNextUpwardsDuration: Scalar, maybeNextDownwardsDuration: Scalar) => boolean =
    (maybeNextUpwardsDuration: Scalar, maybeNextDownwardsDuration: Scalar): boolean =>
        absoluteRatio(from.Scalar(maybeNextUpwardsDuration)) > absoluteRatio(from.Scalar(maybeNextDownwardsDuration))

const computeCoreCycles: (core: Core) => CoreCycles =
    (core: Core): CoreCycles => {
        const coreDurations: Cycle<Scalar> = to.Cycle([ INITIAL_CORE_DURATION ])
        const coreIntervals: Cycle<Fraction> = to.Cycle([])

        const rawCore: number = beatenPathFrom.Core(core)

        const superparticular: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, UP_ONE)))
        const superparticularDuration: Scalar = to.Scalar(apply.Scalar(rawCore, superparticular))
        const superparticularDenominator: Denominator = to.Denominator(apply.Translation(rawCore, UP_ONE))
        const superparticularInterval: Fraction = [ to.Numerator(rawCore), superparticularDenominator ]

        const subparticularDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, DOWN_ONE)))
        const subparticularDuration: Scalar = to.Scalar(apply.Scalar(rawCore, subparticularDivisor))
        const subparticularDenominator: Denominator = to.Denominator(apply.Translation(rawCore, DOWN_ONE))
        const subparticularInterval: Fraction = [ to.Numerator(rawCore), subparticularDenominator ]

        let hasLooped: boolean = false
        while (!hasLooped) {
            const previousDuration: Scalar = finalElement(coreDurations)
            const maybeNextUpwardsDuration: Scalar = apply.Scalar(previousDuration, superparticularDuration)
            const maybeNextDownwardsDuration: Scalar = apply.Scalar(previousDuration, subparticularDuration)

            if (isUpwardsDurationCloserToOriginalDurationOfOne(maybeNextUpwardsDuration, maybeNextDownwardsDuration)) {
                if (isCloseTo(maybeNextUpwardsDuration, INITIAL_CORE_DURATION)) {
                    hasLooped = true
                }
                else {
                    coreDurations.push(maybeNextUpwardsDuration)
                }
                coreIntervals.push(superparticularInterval)
            }
            else {
                if (isCloseTo(maybeNextDownwardsDuration, INITIAL_CORE_DURATION)) {
                    hasLooped = true
                }
                else {
                    coreDurations.push(maybeNextDownwardsDuration)
                }
                coreIntervals.push(subparticularInterval)
            }
        }

        return {
            coreDurations,
            coreIntervals,
        }
    }

export {
    computeCoreCycles,
}
