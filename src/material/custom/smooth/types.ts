import { Note } from '@musical-patterns/material'
import { StandardSpec } from '@musical-patterns/spec'
import { Cardinal, Ms, Scalar, Translation } from '@musical-patterns/utilities'

interface SmoothNotes {
    delayScalar: Scalar,
    notes: Note[],
}

interface BeatenPathEntitiesNotes {
    delays: Ms[],
    entitiesNotes: Note[][],
}

interface PseudocompileDelayParameters {
    [ StandardSpec.BASE_DURATION ]: Scalar<Ms>,
    [ StandardSpec.BASE_DURATION_TRANSLATION ]: Translation<Ms>,
    delayScalar: Scalar,
}

interface ApplySmoothVariables {
    delayScalar: Scalar,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar,
    smoothNoteTotalDurationScalar: Scalar,
}

interface HandleMatchOrNoMatchParameters extends ApplySmoothVariables {
    entityCount: Cardinal,
    noteDuration: Scalar,
    notePitch: Scalar,
}

export {
    SmoothNotes,
    BeatenPathEntitiesNotes,
    PseudocompileDelayParameters,
    ApplySmoothVariables,
    HandleMatchOrNoMatchParameters,
}
