import {
    absoluteRatio,
    apply,
    DOWN_ONE,
    Fraction,
    from,
    isCloseTo,
    lastElement,
    reciprocal,
    Scalar,
    to,
    UP_ONE,
} from '@musical-patterns/utilities'
import { Core, from as beatenPathFrom } from '../../nominal'
import { DurationsAndFractions } from '../types'

const buildDurationsAndFractions: (core: Core) => DurationsAndFractions =
    (core: Core): DurationsAndFractions => {
        const durations: Scalar[] = [ to.Scalar(1) ]
        const fractions: Fraction[] = []

        const hasLooped: () => boolean =
            (): boolean =>
                durations.length > 1 && isCloseTo(from.Scalar(lastElement(durations)), 1)

        const rawCore: number = beatenPathFrom.Core(core)
        const upDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, UP_ONE)))
        const upFraction: Scalar =
            to.Scalar(apply.Scalar(rawCore, upDivisor))
        const downDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, DOWN_ONE)))
        const downFraction: Scalar =
            to.Scalar(apply.Scalar(rawCore, downDivisor))

        while (!hasLooped()) {
            const lastDuration: Scalar = lastElement(durations)

            const upDuration: Scalar = apply.Scalar(lastDuration, upFraction)
            const downDuration: Scalar = apply.Scalar(lastDuration, downFraction)

            if (absoluteRatio(from.Scalar(upDuration)) > absoluteRatio(from.Scalar(downDuration))) {
                durations.push(upDuration)
                fractions.push([
                    to.Numerator(rawCore),
                    to.Denominator(apply.Translation(rawCore, UP_ONE)),
                ])
            }
            else {
                durations.push(downDuration)
                fractions.push([
                    to.Numerator(rawCore),
                    to.Denominator(apply.Translation(rawCore, DOWN_ONE)),
                ])
            }
        }

        return {
            durations,
            fractions,
        }
    }

export {
    buildDurationsAndFractions,
}
