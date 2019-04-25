import { Entity, Note } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    Duration,
    forEach,
    indexOfFinalElement,
    insteadOf,
    ofNotAs,
    Ordinal,
    Pitch,
    Scalar,
    use,
} from '@musical-patterns/utilities'
import { SUSTAIN_AMOUNT } from '../../constants'
import { handleMatchOrNoMatch } from './handleMatchOrNoMatch'
import { ApplySmoothVariables, SmoothNotes } from './types'

const smoothNoteTotalDurationReached: (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>) => boolean =
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>): boolean =>
        pitchMatchCount === insteadOf<Cardinal>(entityCount)

const notesEndReached: (index: Ordinal<Note[]>, notes: Note[]) => boolean =
    (index: Ordinal<Note[]>, notes: Note[]): boolean =>
        index === indexOfFinalElement(notes)

const computeSmoothNote: (note: Note, smoothNoteTotalDurationScalar: Scalar<Duration>) => Note =
    (note: Note, smoothNoteTotalDurationScalar: Scalar<Duration>): Note => ({
        ...note,
        duration: {
            ...note.duration,
            scalar: insteadOf<Scalar, Duration>(smoothNoteTotalDurationScalar),
        },
        sustain: {
            ...note.sustain,
            scalar: use.Scalar(smoothNoteTotalDurationScalar, SUSTAIN_AMOUNT),
        },
    })

const applySmooth: (notes: Note[], entityCount: Cardinal<Entity[]>) => SmoothNotes =
    (notes: Note[], entityCount: Cardinal<Entity[]>): SmoothNotes => {
        const smoothNotes: Note[] = []

        let pitchToMatch: Scalar<Pitch>
        let pitchMatchCount: Cardinal = as.Cardinal(0)
        let smoothNoteTotalDurationScalar: Scalar<Duration> = as.Scalar<Duration>(0)
        let delayScalar: Scalar<Duration> = as.Scalar<Duration>(0)

        forEach(notes, (note: Note, index: Ordinal<Note[]>) => {
            // tslint:disable-next-line no-non-null-assertion
            const noteDuration: Scalar<Duration> = note.duration!.scalar!
            // tslint:disable-next-line no-non-null-assertion
            const notePitch: Scalar<Pitch> = note.pitch!.scalar!

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
                smoothNoteTotalDurationScalar = use.Translation(
                    smoothNoteTotalDurationScalar,
                    as.Translation(ofNotAs(delayScalar)),
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
