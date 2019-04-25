import { Entity } from '@musical-patterns/material'
import { as, Cardinal, Duration, INCREMENT, insteadOf, notAs, Pitch, Scalar, use } from '@musical-patterns/utilities'
import { ApplySmoothVariables, HandleMatchOrNoMatchParameters } from './types'

const noteMatchesPreviousNote: (currentPitch: Scalar<Pitch>, notePitch: Scalar<Pitch>) => boolean =
    (currentPitch: Scalar<Pitch>, notePitch: Scalar<Pitch>): boolean =>
        currentPitch === notePitch

const smoothNoteTotalDurationNotReachedBeforeMatchingStreakBroke:
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>) => boolean =
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity[]>): boolean =>
        pitchMatchCount < insteadOf<Cardinal>(entityCount)

const handleMatchOrNoMatch: (parameters: {
    delayScalar: Scalar<Duration>,
    entityCount: Cardinal<Entity[]>,
    noteDuration: Scalar<Duration>,
    notePitch: Scalar<Pitch>,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar<Pitch>,
    smoothNoteTotalDurationScalar: Scalar<Duration>,
}) => ApplySmoothVariables =
    (
        {
            delayScalar: delayScalarArgument,
            entityCount,
            noteDuration,
            notePitch,
            pitchMatchCount: pitchMatchCountArgument,
            pitchToMatch: pitchToMatchArgument,
            smoothNoteTotalDurationScalar: smoothNoteTotalDurationScalarArgument,
        }: HandleMatchOrNoMatchParameters,
    ): ApplySmoothVariables => {
        let pitchMatchCount: Cardinal
        let smoothNoteTotalDurationScalar: Scalar<Duration>
        let delayScalar: Scalar<Duration> = delayScalarArgument
        let pitchToMatch: Scalar<Pitch> = pitchToMatchArgument

        if (noteMatchesPreviousNote(pitchToMatchArgument, notePitch)) {
            pitchMatchCount = use.Cardinal(pitchMatchCountArgument, INCREMENT)
            smoothNoteTotalDurationScalar = use.Translation(
                smoothNoteTotalDurationScalarArgument,
                as.Translation<Scalar<Duration>>(notAs.Scalar<Duration>(noteDuration)),
            )
        }
        else {
            if (smoothNoteTotalDurationNotReachedBeforeMatchingStreakBroke(pitchMatchCountArgument, entityCount)) {
                delayScalar = smoothNoteTotalDurationScalarArgument
            }
            pitchToMatch = notePitch
            pitchMatchCount = as.Cardinal(1)
            smoothNoteTotalDurationScalar = insteadOf<Scalar, Duration>(noteDuration)
        }

        return { pitchMatchCount, smoothNoteTotalDurationScalar, delayScalar, pitchToMatch }
    }

export {
    handleMatchOrNoMatch,
}
