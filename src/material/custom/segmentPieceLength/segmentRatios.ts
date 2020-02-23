import { finalElement, multiplyRationals, Rational, RATIONAL_IDENTITY } from '@musical-patterns/utilities'
import { ComputeSegmentRatiosParameters } from './types'

const computeSegmentRatios: (parameters: { segmentIntervals: Rational[] }) => Rational[] =
    ({ segmentIntervals }: ComputeSegmentRatiosParameters): Rational[] => {
        const segmentRatios: Rational[] = [ RATIONAL_IDENTITY ]

        segmentIntervals.forEach((segmentInterval: Rational): void => {
            const nextSegmentRatio: Rational = multiplyRationals(finalElement(segmentRatios), segmentInterval)
            segmentRatios.push(nextSegmentRatio)
        })

        return segmentRatios
    }

export {
    computeSegmentRatios,
}
