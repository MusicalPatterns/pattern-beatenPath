import { Note, Segment } from '@musical-patterns/material'
import { Ordinal, to, Translation } from '@musical-patterns/utilities'
import { computeLoopCycledSegmentSegments } from '../../../../../src/indexForTest'

describe('loop cycled segment segments', () => {
    it('cycles each segment of the segments by an amount equal to the loop index multiplied by the translation per loop', () => {
        const A: Note = { gain: {} }
        const B: Note = { duration: {} }
        const C: Note = { sustain: {} }
        const D: Note = { pitch: {} }
        const E: Note = { position: {} }
        const F: Note = { gain: {}, duration: {} }
        const G: Note = { pitch: {}, sustain: {} }

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
        const loopSegmentCycleTranslation: Translation = to.Translation(2)
        const loopIndex: Ordinal = to.Ordinal(3)

        const actualLoopCycledSegmentSegments: Segment[] = computeLoopCycledSegmentSegments({
            loopIndex,
            loopSegmentCycleTranslation,
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
