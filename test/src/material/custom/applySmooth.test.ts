import { Entity, Note } from '@musical-patterns/material'
import { as, Cardinal, Duration, Pitch, Value } from '@musical-patterns/utilities'
import { applySmooth, SmoothNotes } from '../../../../src/indexForTest'

describe('apply smooth', (): void => {
    it(
        `given some notes that were generated as smooth segments, completes the 2-step process of achieving the smooth style; \
it is much simpler during the 1st step to keep one note per segment, and then after distributing segments to entities do this step; \
this step being merging notes to span across segments, x segments where x is the entity count, so there is only a single note per \
value+pitch combination a voice sounds; so it does this by identifying matching (same pitch) notes in a row, since the 1st step \
left one note per segment`,
        (): void => {
            const notes: Note[] = [
                {
                    envelope: { scalar: as.Scalar<Value>(0.9) },
                    pitch: { scalar: as.Scalar<Pitch>(1) },
                    value: { scalar: as.Scalar<Value>(1) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(0.9) },
                    pitch: { scalar: as.Scalar<Pitch>(1) },
                    value: { scalar: as.Scalar<Value>(1.3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(0.9) },
                    pitch: { scalar: as.Scalar<Pitch>(1) },
                    value: { scalar: as.Scalar<Value>(1.1) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2.2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2.1 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4.2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4.1 / 3) },
                },
            ]
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)

            const actualSmoothNotes: SmoothNotes = applySmooth(notes, entityCount)

            expect(actualSmoothNotes)
                .toEqual({
                    delayScalar: as.Scalar<Duration>(0),
                    notes: [
                        {
                            envelope: { scalar: as.Scalar<Value>(3.06) },
                            pitch: { scalar: as.Scalar<Pitch>(1) },
                            value: { scalar: as.Scalar<Value>(3.4) },
                        },
                        {
                            envelope: { scalar: as.Scalar<Value>(1.8900000000000001) },
                            pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                            value: { scalar: as.Scalar<Value>(2.1) },
                        },
                        {
                            envelope: { scalar: as.Scalar<Value>(3.69) },
                            pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                            value: { scalar: as.Scalar<Value>(4.1) },
                        },
                    ],
                })
        },
    )

    it(
        `and if at the beginning there are not x matching segments in a row, converts that into delay and \
extends the final note by the equivalent amount`,
        (): void => {
            const notes: Note[] = [
                {
                    envelope: { scalar: as.Scalar<Value>(0.9) },
                    pitch: { scalar: as.Scalar<Pitch>(1) },
                    value: { scalar: as.Scalar<Value>(1.1) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2.2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2.1 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4.2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4.1 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(4 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(9 / 8) },
                    value: { scalar: as.Scalar<Value>(8 / 9) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(4 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(9 / 8) },
                    value: { scalar: as.Scalar<Value>(8.1 / 9) },
                },
            ]
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)

            const actualSmoothNotes: SmoothNotes = applySmooth(notes, entityCount)

            expect(actualSmoothNotes)
                .toEqual({
                    delayScalar: as.Scalar<Duration>(1.1),
                    notes: [
                        {
                            envelope: { scalar: as.Scalar<Value>(1.8900000000000001) },
                            pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                            value: { scalar: as.Scalar<Value>(2.1) },
                        },
                        {
                            envelope: { scalar: as.Scalar<Value>(3.69) },
                            pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                            value: { scalar: as.Scalar<Value>(4.1) },
                        },
                        {
                            envelope: { scalar: as.Scalar<Value>(2.6) },
                            pitch: { scalar: as.Scalar<Pitch>(9 / 8) },
                            value: { scalar: as.Scalar<Value>(2.888888888888889) },
                        },
                    ],
                })
        },
    )

    it(
        `also works when there is only one note with the same pitch left at the end`,
        (): void => {
            const notes: Note[] = [
                {
                    envelope: { scalar: as.Scalar<Value>(0.9) },
                    pitch: { scalar: as.Scalar<Pitch>(1) },
                    value: { scalar: as.Scalar<Value>(1.3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(0.9) },
                    pitch: { scalar: as.Scalar<Pitch>(1) },
                    value: { scalar: as.Scalar<Value>(1.1) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2.2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(3 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                    value: { scalar: as.Scalar<Value>(2.1 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4.2 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(6 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                    value: { scalar: as.Scalar<Value>(4.1 / 3) },
                },
                {
                    envelope: { scalar: as.Scalar<Value>(4 / 5) },
                    pitch: { scalar: as.Scalar<Pitch>(9 / 8) },
                    value: { scalar: as.Scalar<Value>(8 / 9) },
                },
            ]
            const entityCount: Cardinal<Entity[]> = as.Cardinal<Entity[]>(3)

            const actualSmoothNotes: SmoothNotes = applySmooth(notes, entityCount)

            expect(actualSmoothNotes)
                .toEqual({
                    delayScalar: as.Scalar<Duration>(2.4000000000000004),
                    notes: [
                        {
                            envelope: { scalar: as.Scalar<Value>(1.8900000000000001) },
                            pitch: { scalar: as.Scalar<Pitch>(3 / 2) },
                            value: { scalar: as.Scalar<Value>(2.1) },
                        },
                        {
                            envelope: { scalar: as.Scalar<Value>(3.69) },
                            pitch: { scalar: as.Scalar<Pitch>(3 / 4) },
                            value: { scalar: as.Scalar<Value>(4.1) },
                        },
                        {
                            envelope: { scalar: as.Scalar<Value>(2.9600000000000004) },
                            pitch: { scalar: as.Scalar<Pitch>(9 / 8) },
                            value: { scalar: as.Scalar<Value>(3.288888888888889) },
                        },
                    ],
                })
        },
    )
})
