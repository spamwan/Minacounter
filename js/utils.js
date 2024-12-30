function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const trueSet = new Set(['1', 'true', 'on', 'yes'])
const falseSet = new Set(['0', 'false', 'off', 'no'])

function toBool(value) {
    if (trueSet.has(value)) {
        return true
    } else if (falseSet.has(value)) {
        return false
    }
}
