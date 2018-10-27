import { BuildScalesFunction, buildStandardScales, Scale, SongSpec } from '../../../src'

const buildBeatenPathScales: BuildScalesFunction =
    (songSpec: SongSpec): Scale[] => {
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
