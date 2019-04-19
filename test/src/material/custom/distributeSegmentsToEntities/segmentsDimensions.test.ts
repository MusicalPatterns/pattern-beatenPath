import { Entity, Note, Segment } from '@musical-patterns/material'
import { to } from '@musical-patterns/utilities'
import { computeSegmentsDimensions, SegmentsDimensions } from '../../../../../src/indexForTest'

describe('segments dimensions', () => {
    it(`from the segments, computes the cycle length (how many segments) and entity count (the length of each segment) `, () => {
        const exampleNote: Note = { gain: {} }

        const segments: Segment[] = [
            [
                [ exampleNote ],
                [ exampleNote ],
            ],
            [
                [ exampleNote ],
                [ exampleNote ],
            ],
            [
                [ exampleNote ],
                [ exampleNote ],
            ],
        ]

        const { cycleLength, entityCount }: SegmentsDimensions = computeSegmentsDimensions(segments)

        expect(cycleLength)
            .toBe(to.Cardinal<Segment>(3))
        expect(entityCount)
            .toBe(to.Cardinal<Entity>(2))
    })
})
