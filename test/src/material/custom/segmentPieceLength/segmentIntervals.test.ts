import { Entity, Segment } from '@musical-patterns/material'
import { as, asRational, Rational } from '@musical-patterns/utilities'
import { computeSegmentIntervals } from '../../../../../src/indexForTest'

describe('segment intervals', (): void => {
    it('selects a number of intervals from the core intervals equal to the entity count minus one, starting at the segment index', (): void => {
        const segmentIntervals: Rational[] = computeSegmentIntervals({
            coreIntervals: as.Cycle([
                asRational(4, 5),
                asRational(4, 3),
                asRational(4, 5),
                asRational(4, 3),
            ]),
            entityCount: as.Cardinal<Entity[]>(3),
            segmentIndex: as.Ordinal<Segment[]>(0),
        })

        expect(segmentIntervals)
            .toEqual([
                asRational(4, 5),
                asRational(4, 3),
            ])

    })

    it('works for entity counts greater than 2', (): void => {
        const segmentIntervals: Rational[] = computeSegmentIntervals({
            coreIntervals: as.Cycle([
                asRational(4, 5),
                asRational(4, 3),
                asRational(4, 5),
                asRational(4, 3),
            ]),
            entityCount: as.Cardinal<Entity[]>(4),
            segmentIndex: as.Ordinal<Segment[]>(0),
        })

        expect(segmentIntervals)
            .toEqual([
                asRational(4, 5),
                asRational(4, 3),
                asRational(4, 5),
            ])

    })

    it('works for segment indices other than 0', (): void => {
        const segmentIntervals: Rational[] = computeSegmentIntervals({
            coreIntervals: as.Cycle([
                asRational(4, 5),
                asRational(4, 3),
                asRational(4, 5),
                asRational(4, 3),
            ]),
            entityCount: as.Cardinal<Entity[]>(3),
            segmentIndex: as.Ordinal<Segment[]>(1),
        })

        expect(segmentIntervals)
            .toEqual([
                asRational(4, 3),
                asRational(4, 5),
            ])
    })
})
