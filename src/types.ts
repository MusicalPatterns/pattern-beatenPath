import { BaseSongSpec, NoteSpec, Scalar } from '../../../src'
import { Core, Ratio } from './nominal'

interface DurationsAndRatios {
    beatenPathDurations: Durations,
    beatenPathRatios: Ratio[],
}

type Durations = Scalar[]
type Block = [NoteSpec[], NoteSpec[]]
type Blocks = Block[]

interface BeatenPathSongSpec extends BaseSongSpec {
    core: Core,
}

export {
    Block,
    Blocks,
    Durations,
    DurationsAndRatios,
    BeatenPathSongSpec,
}
