// tslint:disable:no-reaching-imports

export {
    buildDurationsAndRatios,
} from './custom/indexForTest'
export {
    buildSegments,
    buildEntities,
    buildScales,
} from './materials/indexForTest'
export { pattern } from './patterns'
export { initialSpec } from './specs'

export {
    to,
    from,
    Core,
} from './nominal/indexForTest'
export {
    Durations,
    DurationsAndRatios,
} from './types'

// tslint:disable-next-line:no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
