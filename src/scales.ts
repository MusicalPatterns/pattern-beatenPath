import { BuildScalesFunction, buildStandardScales, Scale } from '../../../src'
import { BeatenPathSongSpec } from './types'

const buildBeatenPathScales: BuildScalesFunction =
    (songSpec: BeatenPathSongSpec): Scale[] => {
        const { flatDurationsScale } = buildStandardScales()

        return [
            flatDurationsScale,
            {
                scalar: songSpec.songDurationScalar,
                scalars: flatDurationsScale.scalars,
            },
            {
                scalar: songSpec.songPitchScalar,
                scalars: flatDurationsScale.scalars,
            },
        ]
    }

export {
    buildBeatenPathScales,
}
