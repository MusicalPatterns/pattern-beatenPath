import { Entity, Segment } from '@musical-patterns/material'
import { as, asRational, Rational } from '@musical-patterns/utilities'
import { computeSegmentIntervals } from '../../../../../src/indexForTest'

describe('segment intervals', () => {
    it('selects a number of intervals from the core intervals equal to the entity count minus one, starting at the segment index', () => {
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

    it('works for entity counts greater than 2', () => {
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

    it('works for segment indices other than 0', () => {
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
