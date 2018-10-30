import { BuildScalesFunction, buildStandardScales, Scale, scaleFromScalarsAndScalar } from '../../../../src'
import { BeatenPathSongSpec } from '../types'

const buildBeatenPathScales: BuildScalesFunction =
    (songSpec: BeatenPathSongSpec): Scale[] => {
        const { flatDurationsScale } = buildStandardScales()

        const gainScale: Scale = flatDurationsScale
        const durationsScale: Scale = scaleFromScalarsAndScalar(flatDurationsScale.scalars, songSpec.songDurationScalar)
        const pitchesScale: Scale = scaleFromScalarsAndScalar(flatDurationsScale.scalars, songSpec.songPitchScalar)

        return [
            gainScale,
            durationsScale,
            pitchesScale,
        ]
    }

export {
    buildBeatenPathScales,
}
