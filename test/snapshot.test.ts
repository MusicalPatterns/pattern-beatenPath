// tslint:disable-next-line:no-implicit-dependencies
import { compilePattern } from '@musical-patterns/compiler'

describe('snapshot', () => {
    it('stays locked down', async (done: DoneFn) => {
        // tslint:disable-next-line:no-unsafe-any no-require-imports
        const { pattern, snapshot } = require('../src/indexForTest')

        if (!pattern) {
            done()

            return
        }

        // tslint:disable-next-line:no-unsafe-any
        expect(JSON.stringify(await compilePattern(pattern), undefined, 2))
            .toEqual(JSON.stringify(snapshot, undefined, 2))

        done()
    })
})
