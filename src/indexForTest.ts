// tslint:disable no-reaching-imports

export {
    computeSegments,
    materializeEntities,
    computeNotes,
    computeFractionsAndScalars,
    computeFirstEntityScalarIndex,
    computeSecondEntityScalarIndex,
    FractionsAndScalars,
    BeatenPathEntity,
    BeatenPathEntityNotes,
} from './material/indexForTest'
export { pattern } from './patterns'
export {
    BeatenPathSpec,
    BeatenPathStyle,
    data,
} from './spec/indexForTest'

export { to, from, Core } from './nominal'

// tslint:disable-next-line no-default-import
import * as snapshot from './snapshot.json'

export { snapshot }
