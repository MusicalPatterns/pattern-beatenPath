import { PitchDuration } from '@musical-patterns/pattern'
import {
    apply,
    Cardinal,
    ContourElement,
    ContourPiece,
    EXAMPLE_ELEMENT_INDEX,
    Ordinal,
    Scalar,
    to,
    totalElements,
} from '@musical-patterns/utilities'
import { computePolyrhythmicPiece, computeSmoothPiece } from '../../../src/indexForTest'

describe('pieces', () => {
    const PITCH_DURATION_CONTOUR_DURATION_INDEX: Ordinal = to.Ordinal(1)
    const PITCH_DURATION_CONTOUR_PITCH_INDEX: Ordinal = to.Ordinal(0)

    const notesCount: Cardinal = to.Cardinal(3)
    const repetitions: Cardinal = to.Cardinal(2)
    const notesDuration: Scalar = to.Scalar(1.25)
    let piece: ContourPiece<PitchDuration>

    describe('polyrhythmic piece', () => {
        beforeEach(() => {
            piece = computePolyrhythmicPiece({ notesCount, notesDuration, repetitions })
        })

        it('count of notes equal to the notes count, but times the repetitions', () => {
            expect(totalElements(piece))
                .toBe(to.Cardinal(6))
        })

        it(`durations are all equal to... the notes duration`, () => {
            piece.forEach((contourElement: ContourElement<PitchDuration>) => {
                expect(apply.Ordinal(contourElement, PITCH_DURATION_CONTOUR_DURATION_INDEX))
                    .toBe(1.25)
            })
        })

        it(
            `pitches are all the reciprocal of the durations, such that every note in beaten path could be \
changed into any other simply by time stretching because they are all proportional`,
            () => {
                piece.forEach((contourElement: ContourElement<PitchDuration>) => {
                    expect(apply.Ordinal(contourElement, PITCH_DURATION_CONTOUR_PITCH_INDEX))
                        .toBe(0.8)
                })
            },
        )
    })

    describe('smooth piece', () => {
        beforeEach(() => {
            piece = computeSmoothPiece({ notesCount, notesDuration, repetitions })
        })

        it('count of notes is always one', () => {
            expect(totalElements(piece))
                .toBe(to.Cardinal(1))
        })

        it(`durations are all equal to the notes duration, but times the notes count and the repetitions`, () => {
            piece.forEach((contourElement: ContourElement<PitchDuration>) => {
                expect(apply.Ordinal(contourElement, PITCH_DURATION_CONTOUR_DURATION_INDEX))
                    .toBe(7.5)
            })
        })

        it(
            `pitches are all the reciprocal of the durations, such that every note in beaten path could be \
changed into any other simply by time stretching because they are all proportional \
and in the case of smooth mode yes it is the original duration, what it would have been before scaling by the notes count`,
            () => {
                piece.forEach((contourElement: ContourElement<PitchDuration>) => {
                    expect(apply.Ordinal(contourElement, PITCH_DURATION_CONTOUR_PITCH_INDEX))
                        .toBe(0.8)
                })
            },
        )
    })

    it('whether you pick smooth or polyrhythmic, the end result has the same pitch', () => {
        const polyrhythmicPiece: ContourPiece<PitchDuration> =
            computePolyrhythmicPiece({ notesCount, notesDuration, repetitions })
        const smoothPiece: ContourPiece<PitchDuration> =
            computeSmoothPiece({ notesCount, notesDuration, repetitions })

        expect(apply.Ordinal(apply.Ordinal(polyrhythmicPiece, EXAMPLE_ELEMENT_INDEX), PITCH_DURATION_CONTOUR_PITCH_INDEX))
            .toBe(apply.Ordinal(apply.Ordinal(smoothPiece, EXAMPLE_ELEMENT_INDEX), PITCH_DURATION_CONTOUR_PITCH_INDEX))
    })
})
