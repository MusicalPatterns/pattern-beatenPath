import {
    absoluteRatio,
    apply,
    DOWN_ONE,
    from,
    isCloseTo,
    lastElement, Ratio,
    reciprocal,
    Scalar,
    to,
    UP_ONE,
} from '@musical-patterns/utilities'
import { Core, from as beatenPathFrom } from '../../nominal'
import { DurationsAndRatios } from '../../types'

const buildDurationsAndRatios: (core: Core) => DurationsAndRatios =
    (core: Core): DurationsAndRatios => {
        const durations: Scalar[] = [ to.Scalar(1) ]
        const ratios: Ratio[] = []

        const hasLooped: () => boolean =
            (): boolean =>
                durations.length > 1 && isCloseTo(from.Scalar(lastElement(durations)), 1)

        const rawCore: number = beatenPathFrom.Core(core)
        const upDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, UP_ONE)))
        const upRatio: Scalar =
            to.Scalar(apply.Scalar(rawCore, upDivisor))
        const downDivisor: Scalar = to.Scalar(reciprocal(apply.Translation(rawCore, DOWN_ONE)))
        const downRatio: Scalar =
            to.Scalar(apply.Scalar(rawCore, downDivisor))

        while (!hasLooped()) {
            const lastDuration: Scalar = lastElement(durations)

            const upDuration: Scalar = apply.Scalar(lastDuration, upRatio)
            const downDuration: Scalar = apply.Scalar(lastDuration, downRatio)

            if (absoluteRatio(from.Scalar(upDuration)) > absoluteRatio(from.Scalar(downDuration))) {
                durations.push(upDuration)
                ratios.push([
                    to.Numerator(rawCore),
                    to.Denominator(apply.Translation(rawCore, UP_ONE)),
                ])
            }
            else {
                durations.push(downDuration)
                ratios.push([
                    to.Numerator(rawCore),
                    to.Denominator(apply.Translation(rawCore, DOWN_ONE)),
                ])
            }
        }

        return {
            durations,
            ratios,
        }
    }

export {
    buildDurationsAndRatios,
}
