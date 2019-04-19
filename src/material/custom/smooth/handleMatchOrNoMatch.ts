import { Entity } from '@musical-patterns/material'
import { apply, Cardinal, from, insteadOf, Ms, ONE_MORE, Scalar, to } from '@musical-patterns/utilities'
import { ApplySmoothVariables, HandleMatchOrNoMatchParameters } from './types'

const noteMatchesPreviousNote: (currentPitch: Scalar<Scalar>, notePitch: Scalar<Scalar>) => boolean =
    (currentPitch: Scalar<Scalar>, notePitch: Scalar<Scalar>): boolean =>
        currentPitch === notePitch

const smoothNoteTotalDurationNotReachedBeforeMatchingStreakBroke:
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity>) => boolean =
    (pitchMatchCount: Cardinal, entityCount: Cardinal<Entity>): boolean =>
        pitchMatchCount < entityCount

const handleMatchOrNoMatch: (parameters: {
    delayScalar: Scalar<Ms>,
    entityCount: Cardinal<Entity>,
    noteDuration: Scalar<Scalar>,
    notePitch: Scalar<Scalar>,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar<Scalar>,
    smoothNoteTotalDurationScalar: Scalar<Ms>,
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
        let smoothNoteTotalDurationScalar: Scalar<Ms>
        let delayScalar: Scalar<Ms> = delayScalarArgument
        let pitchToMatch: Scalar<Scalar> = pitchToMatchArgument

        if (noteMatchesPreviousNote(pitchToMatchArgument, notePitch)) {
            pitchMatchCount = apply.Translation(pitchMatchCountArgument, ONE_MORE)
            smoothNoteTotalDurationScalar = apply.Translation(
                smoothNoteTotalDurationScalarArgument,
                to.Translation<Scalar<Ms>>(from.Scalar<Scalar>(noteDuration)),
            )
        }
        else {
            if (smoothNoteTotalDurationNotReachedBeforeMatchingStreakBroke(pitchMatchCountArgument, entityCount)) {
                delayScalar = smoothNoteTotalDurationScalarArgument
            }
            pitchToMatch = notePitch
            pitchMatchCount = to.Cardinal(1)
            smoothNoteTotalDurationScalar = insteadOf<Scalar, Ms>(noteDuration)
        }

        return { pitchMatchCount, smoothNoteTotalDurationScalar, delayScalar, pitchToMatch }
    }

export {
    handleMatchOrNoMatch,
}
