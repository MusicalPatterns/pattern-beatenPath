import { Entity, Note, Segment } from '@musical-patterns/material'
import { as } from '@musical-patterns/utilities'
import { computeSegmentsDimensions, SegmentsDimensions } from '../../../../../src/indexForTest'

describe('segments dimensions', (): void => {
    it(`from the segments, computes the cycle length (how many segments) and entity count (the length of each segment) `, (): void => {
        const exampleNote: Note = { intensity: {} }

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
            .toBe(as.Cardinal<Segment[]>(3))
        expect(entityCount)
            .toBe(as.Cardinal<Entity[]>(2))
    })
})
