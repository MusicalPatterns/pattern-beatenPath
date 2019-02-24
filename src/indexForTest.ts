// tslint:disable no-reaching-imports

export {
    buildSegments,
    buildEntities,
    buildParts,
    buildScales,
    buildDurationsAndRatios,
    firstPartDurationIndex,
    secondPartDurationIndex,
    DurationsAndRatios,
} from './material/indexForTest'
export { pattern } from './patterns'
export {
    BeatenPathSpec,
    BeatenPathStyle,
    specData,
} from './spec/indexForTest'

export {
    to,
    from,
    Core,
} from './nominal/indexForTest'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
