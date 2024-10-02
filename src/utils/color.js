const values = [[224, 12, 0],
[224, 92, 0],
[224, 52, 0],
[224, 0, 90],
[224, 131, 0],
[224, 110, 75],
[97, 51, 48],
[97, 68, 48],
[97, 48, 68],
[97, 77, 48]]

export function color(mod) {
    return `rgb(${values[mod%values.length][0]},${values[mod%values.length][1]},${values[mod%values.length][2]})`
}

export function colorTransparente(mod) {
    return `rgb(${values[mod%values.length][0]},${values[mod%values.length][1]},${values[mod%values.length][2]},0.2)`
}