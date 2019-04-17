import { Note } from '@musical-patterns/material'
import {
    apply,
    Cardinal,
    forEach,
    indexOfFinalElement,
    insteadOf,
    Ms,
    ofFrom,
    Ordinal,
    Scalar,
    to,
} from '@musical-patterns/utilities'
import { SUSTAIN_AMOUNT } from '../../constants'
import { handleMatchOrNoMatch } from './handleMatchOrNoMatch'
import { ApplySmoothVariables, SmoothNotes } from './types'

const smoothNoteTotalDurationReached: (pitchMatchCount: Cardinal, entityCount: Cardinal) => boolean =
    (pitchMatchCount: Cardinal, entityCount: Cardinal): boolean =>
        pitchMatchCount === entityCount

const notesEndReached: (index: Ordinal<Note>, notes: Note[]) => boolean =
    (index: Ordinal<Note>, notes: Note[]): boolean =>
        index === indexOfFinalElement(notes)

const computeSmoothNote: (note: Note, smoothNoteTotalDurationScalar: Scalar<Ms>) => Note =
    (note: Note, smoothNoteTotalDurationScalar: Scalar<Ms>): Note => ({
        ...note,
        duration: {
            ...note.duration,
            scalar: insteadOf<Scalar, Scalar>(smoothNoteTotalDurationScalar),
        },
        sustain: {
            ...note.sustain,
            scalar: apply.Scalar(insteadOf<Scalar, Scalar>(smoothNoteTotalDurationScalar), SUSTAIN_AMOUNT),
        },
    })

const applySmooth: (notes: Note[], entityCount: Cardinal) => SmoothNotes =
    (notes: Note[], entityCount: Cardinal): SmoothNotes => {
        const smoothNotes: Note[] = []

        let pitchToMatch: Scalar<Scalar>
        let pitchMatchCount: Cardinal = to.Cardinal(0)
        let smoothNoteTotalDurationScalar: Scalar<Ms> = to.Scalar<Ms>(0)
        let delayScalar: Scalar<Ms> = to.Scalar<Ms>(0)

        forEach(notes, (note: Note, index: Ordinal<Note>) => {
            // tslint:disable-next-line no-non-null-assertion
            const noteDuration: Scalar<Scalar> = note.duration!.scalar!
            // tslint:disable-next-line no-non-null-assertion
            const notePitch: Scalar<Scalar> = note.pitch!.scalar!

            const applySmoothVariables: ApplySmoothVariables = handleMatchOrNoMatch({
                delayScalar,
                entityCount,
                noteDuration,
                notePitch,
                pitchMatchCount,
                pitchToMatch,
                smoothNoteTotalDurationScalar,
            })
            pitchMatchCount = applySmoothVariables.pitchMatchCount
            smoothNoteTotalDurationScalar = applySmoothVariables.smoothNoteTotalDurationScalar
            delayScalar = applySmoothVariables.delayScalar
            pitchToMatch = applySmoothVariables.pitchToMatch

            if (notesEndReached(index, notes)) {
                smoothNoteTotalDurationScalar = apply.Translation(
                    smoothNoteTotalDurationScalar,
                    to.Translation(ofFrom(delayScalar)),
                )
            }

            if (smoothNoteTotalDurationReached(pitchMatchCount, entityCount) || notesEndReached(index, notes)) {
                const smoothNote: Note = computeSmoothNote(note, smoothNoteTotalDurationScalar)
                smoothNotes.push(smoothNote)
            }
        })

        return {
            delayScalar,
            notes: smoothNotes,
        }
    }

export {
    applySmooth,
}
