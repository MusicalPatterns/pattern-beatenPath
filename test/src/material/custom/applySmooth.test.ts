import { Note } from '@musical-patterns/material'
import { Cardinal, to } from '@musical-patterns/utilities'
import { applySmooth, SmoothNotes } from '../../../../src/indexForTest'

describe('apply smooth', () => {
    it(
        `given some notes that were generated as smooth segments, completes the 2-step process of achieving the smooth style; \
it is much simpler during the 1st step to keep one note per segment, and then after distributing segments to entities do this step; \
this step being merging notes to span across segments, x segments where x is the entity count, so there is only a single note per \
duration+pitch combination a voice sounds; so it does this by identifying matching (same pitch) notes in a row, since the 1st step \
left one note per segment`,
        () => {
            const notes: Note[] = [
                {
                    duration: { scalar: to.Scalar(1) },
                    pitch: { scalar: to.Scalar(1) },
                    sustain: { scalar: to.Scalar(0.9) },
                },
                {
                    duration: { scalar: to.Scalar(1.3) },
                    pitch: { scalar: to.Scalar(1) },
                    sustain: { scalar: to.Scalar(0.9) },
                },
                {
                    duration: { scalar: to.Scalar(1.1) },
                    pitch: { scalar: to.Scalar(1) },
                    sustain: { scalar: to.Scalar(0.9) },
                },
                {
                    duration: { scalar: to.Scalar(2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(2.2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(2.1 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4.2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4.1 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
            ]
            const entityCount: Cardinal = to.Cardinal(3)

            const actualSmoothNotes: SmoothNotes = applySmooth(notes, entityCount)

            expect(actualSmoothNotes)
                .toEqual({
                    delayScalar: to.Scalar(0),
                    notes: [
                        {
                            duration: { scalar: to.Scalar(3.4) },
                            pitch: { scalar: to.Scalar(1) },
                            sustain: { scalar: to.Scalar(3.06) },
                        },
                        {
                            duration: { scalar: to.Scalar(2.1) },
                            pitch: { scalar: to.Scalar(3 / 2) },
                            sustain: { scalar: to.Scalar(1.8900000000000001) },
                        },
                        {
                            duration: { scalar: to.Scalar(4.1) },
                            pitch: { scalar: to.Scalar(3 / 4) },
                            sustain: { scalar: to.Scalar(3.69) },
                        },
                    ],
                })
        },
    )

    it(
        `and if at the beginning there are not x matching segments in a row, converts that into delay and \
extends the final note by the equivalent amount`,
        () => {
            const notes: Note[] = [
                {
                    duration: { scalar: to.Scalar(1.1) },
                    pitch: { scalar: to.Scalar(1) },
                    sustain: { scalar: to.Scalar(0.9) },
                },
                {
                    duration: { scalar: to.Scalar(2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(2.2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(2.1 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4.2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4.1 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(8 / 9) },
                    pitch: { scalar: to.Scalar(9 / 8) },
                    sustain: { scalar: to.Scalar(4 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(8.1 / 9) },
                    pitch: { scalar: to.Scalar(9 / 8) },
                    sustain: { scalar: to.Scalar(4 / 5) },
                },
            ]
            const entityCount: Cardinal = to.Cardinal(3)

            const actualSmoothNotes: SmoothNotes = applySmooth(notes, entityCount)

            expect(actualSmoothNotes)
                .toEqual({
                    delayScalar: to.Scalar(1.1),
                    notes: [
                        {
                            duration: { scalar: to.Scalar(2.1) },
                            pitch: { scalar: to.Scalar(3 / 2) },
                            sustain: { scalar: to.Scalar(1.8900000000000001) },
                        },
                        {
                            duration: { scalar: to.Scalar(4.1) },
                            pitch: { scalar: to.Scalar(3 / 4) },
                            sustain: { scalar: to.Scalar(3.69) },
                        },
                        {
                            duration: { scalar: to.Scalar(2.888888888888889) },
                            pitch: { scalar: to.Scalar(9 / 8) },
                            sustain: { scalar: to.Scalar(2.6) },
                        },
                    ],
                })
        },
    )

    it(
        `also works when there is only one note with the same pitch left at the end`,
        () => {
            const notes: Note[] = [
                {
                    duration: { scalar: to.Scalar(1.3) },
                    pitch: { scalar: to.Scalar(1) },
                    sustain: { scalar: to.Scalar(0.9) },
                },
                {
                    duration: { scalar: to.Scalar(1.1) },
                    pitch: { scalar: to.Scalar(1) },
                    sustain: { scalar: to.Scalar(0.9) },
                },
                {
                    duration: { scalar: to.Scalar(2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(2.2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(2.1 / 3) },
                    pitch: { scalar: to.Scalar(3 / 2) },
                    sustain: { scalar: to.Scalar(3 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4.2 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(4.1 / 3) },
                    pitch: { scalar: to.Scalar(3 / 4) },
                    sustain: { scalar: to.Scalar(6 / 5) },
                },
                {
                    duration: { scalar: to.Scalar(8 / 9) },
                    pitch: { scalar: to.Scalar(9 / 8) },
                    sustain: { scalar: to.Scalar(4 / 5) },
                },
            ]
            const entityCount: Cardinal = to.Cardinal(3)

            const actualSmoothNotes: SmoothNotes = applySmooth(notes, entityCount)

            expect(actualSmoothNotes)
                .toEqual({
                    delayScalar: to.Scalar(2.4000000000000004),
                    notes: [
                        {
                            duration: { scalar: to.Scalar(2.1) },
                            pitch: { scalar: to.Scalar(3 / 2) },
                            sustain: { scalar: to.Scalar(1.8900000000000001) },
                        },
                        {
                            duration: { scalar: to.Scalar(4.1) },
                            pitch: { scalar: to.Scalar(3 / 4) },
                            sustain: { scalar: to.Scalar(3.69) },
                        },
                        {
                            duration: { scalar: to.Scalar(3.288888888888889) },
                            pitch: { scalar: to.Scalar(9 / 8) },
                            sustain: { scalar: to.Scalar(2.9600000000000004) },
                        },
                    ],
                })
        },
    )
})
