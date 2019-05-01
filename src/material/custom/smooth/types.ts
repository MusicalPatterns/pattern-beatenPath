import { Entity, Note } from '@musical-patterns/material'
import { StandardSpec } from '@musical-patterns/spec'
import { Cardinal, Duration, Pitch, Scalar, Translation, Value } from '@musical-patterns/utilities'

interface SmoothNotes {
    delayScalar: Scalar<Duration>,
    notes: Note[],
}

interface BeatenPathEntitiesNotes {
    delays: Duration[],
    entitiesNotes: Note[][],
}

interface PseudocompileDelayParameters {
    [ StandardSpec.MS_PHYSICALIZATION ]: Duration,
    [ StandardSpec.MS_PHYSICALIZATION_TRANSLATION ]: Translation<Duration>,
    delayScalar: Scalar<Duration>,
}

interface ApplySmoothVariables {
    delayScalar: Scalar<Duration>,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar<Pitch>,
    smoothNoteTotalValueScalar: Scalar<Value>,
}

interface HandleMatchOrNoMatchParameters extends ApplySmoothVariables {
    entityCount: Cardinal<Entity[]>,
    pitch: Scalar<Pitch>,
    value: Scalar<Value>,
}

export {
    SmoothNotes,
    BeatenPathEntitiesNotes,
    PseudocompileDelayParameters,
    ApplySmoothVariables,
    HandleMatchOrNoMatchParameters,
}
