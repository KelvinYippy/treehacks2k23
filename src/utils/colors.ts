const hexPrimary = ["#0000FF", "#FF0000", "#FFFF00"]

const hexSecondary = ["#FF6600", "#00FF00", "#6600FF"]

const hexTertiary = ["#FF5349", "#FFAE42", "#9ACD32", "#0D98BA", "#8A2BE2", "#953553"]

export const hexCombo = hexPrimary.concat(hexSecondary, hexTertiary)

export const primarySecondaryTertiary: Record<string, Set<string>> = {
    "primary": new Set(hexPrimary),
    "secondary": new Set(hexSecondary),
    "tertiary": new Set(hexTertiary)
}