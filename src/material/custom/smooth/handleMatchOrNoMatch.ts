import { Entity } from '@musical-patterns/material'
import { as, Cardinal, Duration, INCREMENT, insteadOf, Pitch, Scalar, use, Value } from '@musical-patterns/utilities'
import { ApplySmoothVariables, HandleMatchOrNoMatchParameters } from './types'

const noteMatchesPreviousNote: (currentPitch: Scalar<Pitch>, pitch: Scalar<Pitch>) => boolean =
    (currentPitch: Scalar<Pitch>, pitch: Scalar<Pitch>): boolean =>
        currentPitch === pitch

const smoothNoteTotalValueNotReachedBeforeMatchingStreakBroke:
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>) => boolean =
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>): boolean =>
        pitchMatchCount < insteadOf<Cardinal>(entityCount)

const handleMatchOrNoMatch: (parameters: {
    delayScalar: Scalar<Duration>,
    entityCount: Cardinal<Entity[]>,
    pitch: Scalar<Pitch>,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar<Pitch>,
    smoothNoteTotalValueScalar: Scalar<Value>,
    value: Scalar<Value>,
}) => ApplySmoothVariables =
    (
        {
            delayScalar: delayScalarArgument,
            entityCount,
            value,
            pitch,
            pitchMatchCount: pitchMatchCountArgument,
            pitchToMatch: pitchToMatchArgument,
            smoothNoteTotalValueScalar: smoothNoteTotalDurationScalarArgument,
        }: HandleMatchOrNoMatchParameters,
    ): ApplySmoothVariables => {
        let pitchMatchCount: Cardinal
        let smoothNoteTotalValueScalar: Scalar<Value>
        let delayScalar: Scalar<Duration> = delayScalarArgument
        let pitchToMatch: Scalar<Pitch> = pitchToMatchArgument

        if (noteMatchesPreviousNote(pitchToMatchArgument, pitch)) {
            pitchMatchCount = use.Cardinal(pitchMatchCountArgument, INCREMENT)
            smoothNoteTotalValueScalar = use.Translation(
                smoothNoteTotalDurationScalarArgument,
                as.Translation<Scalar<Value>>(as.number(value)),
            )
        }
        else {
            if (smoothNoteTotalValueNotReachedBeforeMatchingStreakBroke(pitchMatchCountArgument, entityCount)) {
                delayScalar = insteadOf<Scalar, Duration>(smoothNoteTotalDurationScalarArgument)
            }
            pitchToMatch = pitch
            pitchMatchCount = as.Cardinal(1)
            smoothNoteTotalValueScalar = insteadOf<Scalar, Value>(value)
        }

        return { pitchMatchCount, smoothNoteTotalValueScalar, delayScalar, pitchToMatch }
    }

export {
    handleMatchOrNoMatch,
}
