// tslint:disable

declare namespace jasmine {
    interface Matchers<T> {
        toBeCloseToTyped(
            expected: T,
            precision?: number,
            negate?: boolean,
            message?: string,
        ): CustomMatcherResult
        toBeGreaterThanOrCloseTo(
            expected: T,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toBeLessThanOrCloseTo(
            expected: T,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toBeHomogenous(
            manualExpectedElementValue?: NumericElementType,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toBeCloseToArray(
            expected: NumericElementType[],
            message?: string,
        ): CustomMatcherResult
        toBeCloseSoFar(
            expected: NumericElementType[],
            precision?: number,
            // tslint:disable-next-line bool-param-default
            negate?: boolean,
            message?: string,
        ): CustomMatcherResult
        toHaveSameMembersAs(
            expected: ElementType[],
            message?: string,
        ): CustomMatcherResult
        toBeLessThanTyped(
            expected: NumericType,
            message?: string,
        ): CustomMatcherResult
        toBeGreaterThanTyped(
            expected: NumericType,
            message?: string,
        ): CustomMatcherResult
        toBeLessThanOrEqualTyped(
            expected: NumericType,
            message?: string,
        ): CustomMatcherResult
        toBeGreaterThanOrEqualTyped(
            expected: NumericType,
            message?: string,
        ): CustomMatcherResult
        toGoMonotonically(
            expectedBeginValue?: NumericElementType,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toGoMonotonicallyBetweenValueAndValue(
            expectedBeginValue: NumericElementType,
            expectedEndValue: NumericElementType,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toGoMonotonicallyFromValueToValue(
            expectedBeginValue: NumericElementType,
            expectedEndValue: NumericElementType,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toGoQuadratically(
            expectedBeginValue?: NumericElementType,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toGoQuadraticallyBetweenValueAndValue(
            expectedBeginValue: NumericElementType,
            expectedEndValue: NumericElementType,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
        toGoQuadraticallyFromValueToValue(
            expectedBeginValue: NumericElementType,
            expectedEndValue: NumericElementType,
            precision?: number,
            message?: string,
        ): CustomMatcherResult
    }
}
