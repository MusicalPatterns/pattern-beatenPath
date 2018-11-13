import { buildStandardScales, Scale, scaleFromScalarsAndScalar } from '../../../../src'
import { BuildScalesFunction } from '../../../types'
import { BeatenPathPatternSpec } from '../types'

const buildScales: BuildScalesFunction =
    (patternSpec: BeatenPathPatternSpec): Scale[] => {
        const { nonScale } = buildStandardScales()

        const gainScale: Scale = nonScale
        const durationsScale: Scale = scaleFromScalarsAndScalar(
            nonScale.scalars,
            patternSpec.patternDurationScalar,
        )
        const pitchesScale: Scale = scaleFromScalarsAndScalar(
            nonScale.scalars,
            patternSpec.patternPitchScalar,
        )

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildScales,
}
