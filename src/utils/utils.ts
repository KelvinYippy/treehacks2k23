interface RGB {
    r: number;
    g: number;
    b: number;
}

export const generateRandomHexColor = () => {
    const hexLetters = "0123456789ABCDEF"
    let hexString = "#"
    for (let i = 0; i < 6; i++) {
        hexString += hexLetters[Math.floor(Math.random() * 16)]
    }
    return hexString
}

export const getRGBComponents = (color: number): RGB => ({
    "r": color >> 16,
    "g": (color >> 8) & 255,
    "b": color & 255
})

export const generateRandomRGBColor = () => Math.floor(Math.random() * 0x1000000)

export const getComplementColor = (color: number) => 0xffffff - color

export const getTriadicColor = (rgb: RGB) => ({
    r: rgb.g,
    g: rgb.b,
    b: rgb.r
})

export const getRGBNumber = (rgb: RGB) => (rgb.r << 16) + (rgb.g << 8) + (rgb.b)

export const isEqual = (obj1: Record<number, number>, obj2: Record<number, number>) => {
    const keys = Object.keys(obj1).concat(Object.keys(obj2))
    return keys.every(key => key in obj1 && key in obj2 && obj1[Number(key)] === obj2[Number(key)])
}