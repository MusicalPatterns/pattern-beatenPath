import { BuildScalesFunction } from '../../../src/compile/types'
import { flatDurationsScale } from '../../../src/scales'
import { SongSpec } from '../../../src/songs'
import { Scales } from '../../../src/types'

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
