import { BuildScalesFunction, Scale } from '@musical-patterns/compiler'
import { to } from '@musical-patterns/utilities'
import { buildStandardScales } from '@musical-patterns/utilities-pattern'
import { BeatenPathPatternSpec } from '../types'

const buildScales: BuildScalesFunction =
    (patternSpec: BeatenPathPatternSpec): Scale[] => {
        const { nonScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = {
            offset: patternSpec.patternDurationOffset || to.Offset(0),
            scalar: patternSpec.patternDurationScalar || to.Scalar(1),
            scalars: nonScale.scalars,
        }
        const pitchesScale: Scale = {
            offset: patternSpec.patternPitchOffset || to.Offset(0),
            scalar: patternSpec.patternPitchScalar || to.Scalar(1),
            scalars: nonScale.scalars,
        }

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildScales,
}
