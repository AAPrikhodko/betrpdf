export function convertStringToRGB(s: string) {
    let rgbArr = s.split(',').map(Number)
    return {
        getR() {
            return rgbArr[0]
        },
        getG() {
            return rgbArr[1]
        },
        getB() {
            return rgbArr[2]
        }
    }
}