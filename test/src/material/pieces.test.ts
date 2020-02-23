import { PitchValue } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    computeLength,
    ContourElement,
    ContourPiece,
    exampleElement,
    Ordinal,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import {
    computePolyrhythmicPiece,
    computeSmoothPiece,
    PieceLength,
    Repetition,
    Repetitions,
} from '../../../src/indexForTest'

describe('pieces', (): void => {
    const PITCH_VALUE_CONTOUR_DURATION_INDEX: Ordinal = as.Ordinal(1)
    const PITCH_VALUE_CONTOUR_PITCH_INDEX: Ordinal = as.Ordinal(0)

    const pieceLength: PieceLength = as.Cardinal<ContourPiece<PitchValue>>(3)
    const repetitions: Repetitions = as.Cardinal<Repetition[]>(2)
    const notesValue: Scalar = as.Scalar(1.25)
    let piece: ContourPiece<PitchValue>

    describe('polyrhythmic piece', (): void => {
        beforeEach((): void => {
            piece = computePolyrhythmicPiece({ pieceLength, notesValue, repetitions })
        })

        it('count of notes equal to the notes count, but times the repetitions', (): void => {
            expect(computeLength(piece))
                .toBe(as.Cardinal<ContourPiece<PitchValue>>(6))
        })

        it(`values are all equal to... the notes value`, (): void => {
            piece.forEach((contourElement: ContourElement<PitchValue>): void => {
                expect(use.Ordinal(contourElement, PITCH_VALUE_CONTOUR_DURATION_INDEX))
                    .toBe(1.25)
            })
        })

        it(
            `pitches are all the reciprocal of the values, such that every note in beaten path could be \
changed into any other simply by time stretching because they are all proportional`,
            (): void => {
                piece.forEach((contourElement: ContourElement<PitchValue>): void => {
                    expect(use.Ordinal(contourElement, PITCH_VALUE_CONTOUR_PITCH_INDEX))
                        .toBe(0.8)
                })
            },
        )
    })

    describe('smooth piece', (): void => {
        beforeEach((): void => {
            piece = computeSmoothPiece({ pieceLength, notesValue, repetitions })
        })

        it('count of notes is always one', (): void => {
            expect(computeLength(piece))
                .toBe(as.Cardinal<ContourPiece<PitchValue>>(1))
        })

        it(`values are all equal to the notes value, but times the notes count and the repetitions`, (): void => {
            piece.forEach((contourElement: ContourElement<PitchValue>): void => {
                expect(use.Ordinal(contourElement, PITCH_VALUE_CONTOUR_DURATION_INDEX))
                    .toBe(7.5)
            })
        })

        it(
            `pitches are all the reciprocal of the values, such that every note in beaten path could be \
changed into any other simply by time stretching because they are all proportional \
and in the case of smooth mode yes it is the original value, what it would have been before scaling by the notes count`,
            (): void => {
                piece.forEach((contourElement: ContourElement<PitchValue>): void => {
                    expect(use.Ordinal(contourElement, PITCH_VALUE_CONTOUR_PITCH_INDEX))
                        .toBe(0.8)
                })
            },
        )
    })

    it('whether you pick smooth or polyrhythmic, the end result has the same pitch', (): void => {
        const polyrhythmicPiece: ContourPiece<PitchValue> =
            computePolyrhythmicPiece({ pieceLength, notesValue, repetitions })
        const smoothPiece: ContourPiece<PitchValue> =
            computeSmoothPiece({ pieceLength, notesValue, repetitions })

        const polyrhythmicPitch: number = use.Ordinal(exampleElement(polyrhythmicPiece), PITCH_VALUE_CONTOUR_PITCH_INDEX)
        const smoothPitch: number = use.Ordinal(exampleElement(smoothPiece), PITCH_VALUE_CONTOUR_PITCH_INDEX)

        expect(polyrhythmicPitch)
            .toBe(smoothPitch)
    })
})
