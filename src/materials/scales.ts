import { BuildScalesFunction, buildStandardScales, Scale, scaleFromScalarsAndScalar } from '../../../../src'
import { BeatenPathPatternSpec } from '../types'

const buildBeatenPathScales: BuildScalesFunction =
    (patternSpec: BeatenPathPatternSpec): Scale[] => {
        const { flatDurationsScale } = buildStandardScales()

        const gainScale: Scale = flatDurationsScale
        const durationsScale: Scale = scaleFromScalarsAndScalar(
            flatDurationsScale.scalars,
            patternSpec.patternDurationScalar,
        )
        const pitchesScale: Scale = scaleFromScalarsAndScalar(
            flatDurationsScale.scalars,
            patternSpec.patternPitchScalar,
        )

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildBeatenPathScales,
}
