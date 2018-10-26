import { BuildScalesFunction, flatDurationsScale, Scales, SongSpec } from '../../../src'

const buildBeatenPathScales: BuildScalesFunction = (songSpec: SongSpec): Scales =>
    [
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

export {
    buildBeatenPathScales,
}
