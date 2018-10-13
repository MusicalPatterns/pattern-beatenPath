import { buildEntity } from '../../../src/compile/buildEntity'
import { EntityConfig, EntityConfigs } from '../../../src/compile/types'
import { Config, Song, SongConfig, SongID } from '../../../src/songTypes'
import { Entity } from '../../../src/types'
import { buildBeatenPathBlocks } from './blocks'
import { buildBeatenPathDurationsAndRatios } from './durationsAndRatios'
import { buildBeatenPathEntityConfigs } from './entities'
import { Blocks, Core } from './types'

// tslint:disable-next-line:no-any no-magic-numbers
const MINIMUM_FUNCTIONAL_CORE: Core = 2 as any

interface BeatenPathConfig extends Config {
    core: Core,
}

const beatenPathCompile: (songConfig: SongConfig) => Promise<Song> =
    async (songConfig: SongConfig): Promise<Song> => {
        const config: BeatenPathConfig = songConfig.config as BeatenPathConfig
        const configCore: Core = config.core
        const core: Core = configCore < MINIMUM_FUNCTIONAL_CORE ? MINIMUM_FUNCTIONAL_CORE : configCore

        const { beatenPathRatios, beatenPathDurations } = buildBeatenPathDurationsAndRatios(core)
        const beatenPathBlocks: Blocks = buildBeatenPathBlocks(beatenPathDurations, beatenPathRatios)
        const beatenPathEntityConfigs: EntityConfigs = buildBeatenPathEntityConfigs(beatenPathBlocks)

        return {
            entities: beatenPathEntityConfigs.map((entityConfig: EntityConfig): Entity =>
                buildEntity(entityConfig, songConfig)),
            songId: SongID.BEATEN_PATH,
        }
    }

export {
    beatenPathCompile,
}
