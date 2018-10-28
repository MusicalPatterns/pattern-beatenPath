import { NoteSpec, Scalar } from '../../../src'
import { SongSpec } from '../../types'
import { Core, Ratio } from './nominal'

interface DurationsAndRatios {
    beatenPathDurations: Durations,
    beatenPathRatios: Ratio[],
}

type Durations = Scalar[]
type Block = [NoteSpec[], NoteSpec[]]
type Blocks = Block[]

interface BeatenPathSongSpec extends SongSpec {
    core: Core,
}

export {
    Block,
    Blocks,
    Durations,
    DurationsAndRatios,
    BeatenPathSongSpec,
}
