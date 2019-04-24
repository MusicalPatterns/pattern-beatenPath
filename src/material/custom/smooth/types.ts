import { Entity, Note } from '@musical-patterns/material'
import { StandardSpec } from '@musical-patterns/spec'
import { Cardinal, Ms, Scalar, Translation } from '@musical-patterns/utilities'

interface SmoothNotes {
    delayScalar: Scalar<Ms>,
    notes: Note[],
}

interface BeatenPathEntitiesNotes {
    delays: Array<Translation<Ms>>,
    entitiesNotes: Note[][],
}

interface PseudocompileDelayParameters {
    [ StandardSpec.BASE_DURATION ]: Scalar<Ms>,
    [ StandardSpec.BASE_DURATION_TRANSLATION ]: Translation<Ms>,
    delayScalar: Scalar<Ms>,
}

interface ApplySmoothVariables {
    delayScalar: Scalar<Ms>,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar<Scalar>,
    smoothNoteTotalDurationScalar: Scalar<Ms>,
}

interface HandleMatchOrNoMatchParameters extends ApplySmoothVariables {
    entityCount: Cardinal<Entity[]>,
    noteDuration: Scalar<Scalar>,
    notePitch: Scalar<Scalar>,
}

export {
    SmoothNotes,
    BeatenPathEntitiesNotes,
    PseudocompileDelayParameters,
    ApplySmoothVariables,
    HandleMatchOrNoMatchParameters,
}
