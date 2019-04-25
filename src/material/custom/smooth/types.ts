import { Entity, Note } from '@musical-patterns/material'
import { StandardSpec } from '@musical-patterns/spec'
import { Cardinal, Duration, Pitch, Scalar, Translation } from '@musical-patterns/utilities'

interface SmoothNotes {
    delayScalar: Scalar<Duration>,
    notes: Note[],
}

interface BeatenPathEntitiesNotes {
    delays: Duration[],
    entitiesNotes: Note[][],
}

interface PseudocompileDelayParameters {
    [ StandardSpec.BASIS_DURATION ]: Duration,
    [ StandardSpec.BASIS_DURATION_TRANSLATION ]: Translation<Duration>,
    delayScalar: Scalar<Duration>,
}

interface ApplySmoothVariables {
    delayScalar: Scalar<Duration>,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar<Pitch>,
    smoothNoteTotalDurationScalar: Scalar<Duration>,
}

interface HandleMatchOrNoMatchParameters extends ApplySmoothVariables {
    entityCount: Cardinal<Entity[]>,
    noteDuration: Scalar<Duration>,
    notePitch: Scalar<Pitch>,
}

export {
    SmoothNotes,
    BeatenPathEntitiesNotes,
    PseudocompileDelayParameters,
    ApplySmoothVariables,
    HandleMatchOrNoMatchParameters,
}
