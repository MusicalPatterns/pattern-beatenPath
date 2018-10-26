interface Numerator extends Number {
    _NumeratorBrand: string,
}

interface Denominator extends Number {
    _DenominatorBrand: string,
}

interface Core extends Number {
    _CoreBrand: string,
}

type FractionalPart = Numerator | Denominator
type Ratio = [Numerator, Denominator]

export {
    Core,
    Denominator,
    Numerator,
    FractionalPart,
    Ratio,
}
