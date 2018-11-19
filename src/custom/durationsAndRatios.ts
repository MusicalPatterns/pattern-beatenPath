import { from, Scalar, to } from '@musical-patterns/utilities'
import { absoluteRatio, applyScale, isCloseTo } from '../../../../src'
import { Core, from as beatenPathFrom, Ratio, to as beatenPathTo } from '../nominal'
import { Durations, DurationsAndRatios } from '../types'

const buildDurationsAndRatios: (core: Core) => DurationsAndRatios =
    (core: Core): DurationsAndRatios => {
        const beatenPathDurations: Durations = [ to.Scalar(1) ]
        const beatenPathRatios: Ratio[] = []

        const hasLooped: () => boolean =
            (): boolean =>
                beatenPathDurations.length > 1 &&
                isCloseTo(beatenPathDurations[ beatenPathDurations.length - 1 ], to.Scalar(1))

        const rawCore: number = beatenPathFrom.Core(core)
        const upRatio: Scalar = to.Scalar(rawCore / (rawCore + 1))
        const downRatio: Scalar = to.Scalar(rawCore / (rawCore - 1))

        while (!hasLooped()) {
            const lastDuration: Scalar = beatenPathDurations[ beatenPathDurations.length - 1 ]

            const upDuration: Scalar = applyScale(lastDuration, upRatio)
            const downDuration: Scalar = applyScale(lastDuration, downRatio)

            if (absoluteRatio(from.Scalar(upDuration)) > absoluteRatio(from.Scalar(downDuration))) {
                beatenPathDurations.push(upDuration)
                beatenPathRatios.push([ beatenPathTo.Numerator(rawCore), beatenPathTo.Denominator(rawCore + 1) ])
            }
            else {
                beatenPathDurations.push(downDuration)
                beatenPathRatios.push([ beatenPathTo.Numerator(rawCore), beatenPathTo.Denominator(rawCore - 1) ])
            }
        }

        return {
            beatenPathDurations,
            beatenPathRatios,
        }
    }

export {
    buildDurationsAndRatios,
}
