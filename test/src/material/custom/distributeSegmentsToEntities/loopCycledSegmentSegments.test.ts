import { Note, Segment } from '@musical-patterns/material'
import { as, Cycle, Ordinal } from '@musical-patterns/utilities'
import { computeLoopCycledSegmentSegments, LoopSegmentCycleShift } from '../../../../../src/indexForTest'

describe('loop cycled segment segments', (): void => {
    it('cycles each segment of the segments by an amount equal to the loop index multiplied by the translation per loop', (): void => {
        const A: Note = { intensity: {} }
        const B: Note = { value: {} }
        const C: Note = { envelope: {} }
        const D: Note = { pitch: {} }
        const E: Note = { position: {} }
        const F: Note = { intensity: {}, value: {} }
        const G: Note = { pitch: {}, envelope: {} }

        const segments: Segment[] = [
            [
                [ A ],
                [ B ],
                [ C ],
                [ D ],
                [ E ],
                [ F ],
                [ G ],
            ],
            [
                [ B ],
                [ A ],
                [ G ],
                [ C ],
                [ F ],
                [ E ],
                [ D ],
            ],
        ]
        const loopSegmentCycleShift: LoopSegmentCycleShift = as.Cardinal<Cycle<Note[]>>(2)
        const loopIndex: Ordinal<LoopSegmentCycleShift[]> = as.Ordinal<LoopSegmentCycleShift[]>(3)

        const actualLoopCycledSegmentSegments: Segment[] = computeLoopCycledSegmentSegments({
            loopIndex,
            loopSegmentCycleShift,
            segments,
        })

        expect(actualLoopCycledSegmentSegments)
            .toEqual([
                [
                    [ B ],
                    [ C ],
                    [ D ],
                    [ E ],
                    [ F ],
                    [ G ],
                    [ A ],
                ],
                [
                    [ A ],
                    [ G ],
                    [ C ],
                    [ F ],
                    [ E ],
                    [ D ],
                    [ B ],
                ],
            ])
    })
})
