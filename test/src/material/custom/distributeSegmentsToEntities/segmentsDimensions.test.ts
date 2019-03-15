import { Note } from '@musical-patterns/compiler'
import { Segment } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { computeSegmentsDimensions, SegmentsDimensions } from '../../../../../src/indexForTest'

describe('segments dimensions', () => {
    it(`from the segments, correctly computes the cycle length (the length of the segments) and entity counts (the length of each segment) `, () => {
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
            .toBe(to.Cardinal(3))
        expect(entityCount)
            .toBe(to.Cardinal(2))
    })
})
