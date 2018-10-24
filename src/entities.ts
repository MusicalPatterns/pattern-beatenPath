import { Entities, Entity, NoteSpecs, TimeType } from '../../../src/compile/types'
import { OscillatorName, VoiceType } from '../../../src/types'
import sequence from '../../../src/utilities/sequence'
import { buildBeatenPathBlocks } from './blocks'
import { buildBeatenPathDurationsAndRatios } from './durationsAndRatios'
import { BeatenPathSongSpec } from './songSpecs'
import { Block, Blocks, Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const MINIMUM_FUNCTIONAL_CORE: Core = 2 as any

const buildBeatenPathEntities: (songSpec: BeatenPathSongSpec) => Entities =
    (songSpec: BeatenPathSongSpec): Entities => {
        const coreFromSongSpec: Core = songSpec.core
        const core: Core = coreFromSongSpec < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : coreFromSongSpec

        const { beatenPathRatios, beatenPathDurations } = buildBeatenPathDurationsAndRatios(core)
        const beatenPathBlocks: Blocks = buildBeatenPathBlocks(beatenPathDurations, beatenPathRatios)

        const beatenPathOneNoteSpecs: NoteSpecs = sequence(
            beatenPathBlocks.map((block: Block): NoteSpecs => block[ 0 ]),
        )
        const beatenPathTwoNoteSpecs: NoteSpecs = sequence(
            beatenPathBlocks.map((block: Block): NoteSpecs => block[ 1 ]),
        )

        const beatenPathOneEntity: Entity = {
            noteSpecs: beatenPathOneNoteSpecs,
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SQUARE, voiceType: VoiceType.OSCILLATOR },
        }

        const beatenPathTwoEntity: Entity = {
            noteSpecs: beatenPathTwoNoteSpecs,
            timeType: TimeType.RAW,
            voiceSpec: { timbre: OscillatorName.SAWTOOTH, voiceType: VoiceType.OSCILLATOR },
        }

        return [
            beatenPathOneEntity,
            beatenPathTwoEntity,
        ]
    }

export {
    buildBeatenPathEntities,
}
