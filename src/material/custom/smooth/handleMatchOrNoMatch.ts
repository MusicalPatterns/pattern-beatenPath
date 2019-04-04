import { apply, Cardinal, from, INCREMENT, Scalar, to } from '@musical-patterns/utilities'
import { ApplySmoothVariables, HandleMatchOrNoMatchParameters } from './types'

const noteMatchesPreviousNote: (currentPitch: Scalar, notePitch: Scalar) => boolean =
    (currentPitch: Scalar, notePitch: Scalar): boolean =>
        currentPitch === notePitch

const smoothNoteTotalDurationNotReachedBeforeMatchingStreakBroke:
    (pitchMatchCount: Cardinal, entityCount: Cardinal) => boolean =
    (pitchMatchCount: Cardinal, entityCount: Cardinal): boolean =>
        pitchMatchCount < entityCount

const handleMatchOrNoMatch: (parameters: {
    delayScalar: Scalar,
    entityCount: Cardinal,
    noteDuration: Scalar,
    notePitch: Scalar,
    pitchMatchCount: Cardinal,
    pitchToMatch: Scalar,
    smoothNoteTotalDurationScalar: Scalar,
}) => ApplySmoothVariables =
    ({
         delayScalar: delayScalarArgument,
         entityCount,
         noteDuration,
         notePitch,
         pitchMatchCount: pitchMatchCountArgument,
         pitchToMatch: pitchToMatchArgument,
         smoothNoteTotalDurationScalar: smoothNoteTotalDurationScalarArgument,
     }: HandleMatchOrNoMatchParameters): ApplySmoothVariables => {
        let pitchMatchCount: Cardinal
        let smoothNoteTotalDurationScalar: Scalar
        let delayScalar: Scalar = delayScalarArgument
        let pitchToMatch: Scalar = pitchToMatchArgument

        if (noteMatchesPreviousNote(pitchToMatchArgument, notePitch)) {
            pitchMatchCount = apply.Translation(pitchMatchCountArgument, INCREMENT)
            smoothNoteTotalDurationScalar = apply.Translation(
                smoothNoteTotalDurationScalarArgument,
                to.Translation(from.Scalar<number, Scalar>(noteDuration)),
            )
        }
        else {
            if (smoothNoteTotalDurationNotReachedBeforeMatchingStreakBroke(pitchMatchCountArgument, entityCount)) {
                delayScalar = smoothNoteTotalDurationScalarArgument
            }
            pitchToMatch = notePitch
            pitchMatchCount = to.Cardinal(1)
            smoothNoteTotalDurationScalar = noteDuration
        }

        return { pitchMatchCount, smoothNoteTotalDurationScalar, delayScalar, pitchToMatch }
    }

export {
    handleMatchOrNoMatch,
}
