import { finalElement, Fraction, FRACTIONAL_IDENTITY, multiplyFractions } from '@musical-patterns/utilities'
import { ComputeSegmentRatiosParameters } from './types'

const computeSegmentRatios: (parameters: { segmentIntervals: Fraction[] }) => Fraction[] =
    ({ segmentIntervals }: ComputeSegmentRatiosParameters): Fraction[] => {
        const segmentRatios: Fraction[] = [ FRACTIONAL_IDENTITY ]

        segmentIntervals.forEach((segmentInterval: Fraction) => {
            const nextSegmentRatio: Fraction = multiplyFractions(finalElement(segmentRatios), segmentInterval)
            segmentRatios.push(nextSegmentRatio)
        })

        return segmentRatios
    }

export {
    computeSegmentRatios,
}
