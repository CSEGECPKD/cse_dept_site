function convertRange(value, oldMin, oldMax, newMin, newMax) {
    if (value <= oldMin) {
        return newMin
    } else if (value >= oldMax) {
        return newMax
    }
    return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}
export default convertRange