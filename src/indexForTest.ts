// tslint:disable no-reaching-imports

export {
    buildSegments,
    buildEntities,
    buildParts,
    buildScales,
    buildDurationsAndRatios,
    firstPartDurationIndex,
    secondPartDurationIndex,
} from './material/indexForTest'
export { pattern } from './patterns'
export { specData } from './spec'

export {
    to,
    from,
    Core,
} from './nominal/indexForTest'
export {
    DurationsAndRatios,
    BeatenPathSpec,
    BeatenPathStyle,
} from './types'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
