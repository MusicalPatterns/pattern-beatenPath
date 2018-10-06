import absoluteRatio from '../../../src/utilities/absoluteRatio'
import * as from from '../../../src/utilities/from'
import isCloseTo from '../../../src/utilities/isCloseTo'
import { Scalar, Time } from '../../../src/utilities/nominalTypes'
import scale from '../../../src/utilities/scale'
import * as to from '../../../src/utilities/to'
import { Core, Durations, DurationsAndRatios, Ratios } from './types'
import * as beatenPathFrom from './utilities/from'
import * as beatenPathTo from './utilities/to'

const buildBeatenPathDurationsAndRatios: (core: Core) => DurationsAndRatios =
    (core: Core): DurationsAndRatios => {
        const beatenPathDurations: Durations = [ to.Time(1) ]
        const beatenPathRatios: Ratios = []

        const hasLooped: () => boolean = (): boolean =>
            beatenPathDurations.length > 1 && isCloseTo(beatenPathDurations[beatenPathDurations.length - 1], to.Time(1))

        const rawCore: number = beatenPathFrom.Core(core)
        const upRatio: Scalar = to.Scalar(rawCore / (rawCore + 1))
        const downRatio: Scalar = to.Scalar(rawCore / (rawCore - 1))

        while (!hasLooped()) {
            const lastDuration: Time = beatenPathDurations[beatenPathDurations.length - 1]

            const upDuration: Time = scale(lastDuration, upRatio)
            const downDuration: Time = scale(lastDuration, downRatio)

            if (absoluteRatio(from.Time(upDuration)) > absoluteRatio(from.Time(downDuration))) {
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
    buildBeatenPathDurationsAndRatios,
}
