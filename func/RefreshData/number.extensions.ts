interface Number {
    roundTo(limit: number): number
}

Number.prototype.roundTo = function (limit: number) {
    const limitedValue = Math.pow(10, limit)
    return Math.round((this + Number.EPSILON) * limitedValue) / limitedValue
}
