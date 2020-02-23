import { Entity, Note } from '@musical-patterns/material'
import {
    as,
    Cardinal,
    Duration,
    forEach,
    indexOfFinalElement,
    insteadOf,
    Ordinal,
    Pitch,
    Scalar,
    use,
    Value,
} from '@musical-patterns/utilities'
import { ENVELOPE_AMOUNT } from '../../constants'
import { handleMatchOrNoMatch } from './handleMatchOrNoMatch'
import { ApplySmoothVariables, SmoothNotes } from './types'

const smoothNoteTotalValueReached: (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>) => boolean =
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>): boolean =>
        pitchMatchCount === insteadOf<Cardinal>(entityCount)

const notesEndReached: (index: Ordinal<Note[]>, notes: Note[]) => boolean =
    (index: Ordinal<Note[]>, notes: Note[]): boolean =>
        index === indexOfFinalElement(notes)

const computeSmoothNote: (note: Note, smoothNoteTotalValueScalar: Scalar<Value>) => Note =
    (note: Note, smoothNoteTotalValueScalar: Scalar<Value>): Note => ({
        ...note,
        envelope: {
            ...note.envelope,
            scalar: use.Scalar(smoothNoteTotalValueScalar, ENVELOPE_AMOUNT),
        },
        value: {
            ...note.value,
            scalar: smoothNoteTotalValueScalar,
        },
    })

const applySmooth: (notes: Note[], entityCount: Cardinal<Entity[]>) => SmoothNotes =
    (notes: Note[], entityCount: Cardinal<Entity[]>): SmoothNotes => {
        const smoothNotes: Note[] = []

        let pitchToMatch: Scalar<Pitch>
        let pitchMatchCount: Cardinal = as.Cardinal(0)
        let smoothNoteTotalValueScalar: Scalar<Value> = as.Scalar<Value>(0)
        let delayScalar: Scalar<Duration> = as.Scalar<Duration>(0)

        forEach(notes, (note: Note, index: Ordinal<Note[]>): void => {
            // tslint:disable-next-line no-non-null-assertion
            const value: Scalar<Value> = note.value!.scalar!
            // tslint:disable-next-line no-non-null-assertion
            const pitch: Scalar<Pitch> = note.pitch!.scalar!

            const applySmoothVariables: ApplySmoothVariables = handleMatchOrNoMatch({
                delayScalar,
                entityCount,
                pitch,
                pitchMatchCount,
                pitchToMatch,
                smoothNoteTotalValueScalar,
                value,
            })
            pitchMatchCount = applySmoothVariables.pitchMatchCount
            smoothNoteTotalValueScalar = applySmoothVariables.smoothNoteTotalValueScalar
            delayScalar = applySmoothVariables.delayScalar
            pitchToMatch = applySmoothVariables.pitchToMatch

            if (notesEndReached(index, notes)) {
                smoothNoteTotalValueScalar = use.Translation(
                    smoothNoteTotalValueScalar,
                    as.Translation<Scalar<Value>>(as.number(delayScalar)),
                )
            }

            if (smoothNoteTotalValueReached(pitchMatchCount, entityCount) || notesEndReached(index, notes)) {
                const smoothNote: Note = computeSmoothNote(note, smoothNoteTotalValueScalar)
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
