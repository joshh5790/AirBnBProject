export const month = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

export const validateImg = (image, name, errors) => {
    if (!image.length) return true
    if (/\.(jpg|jpeg|png)$/.test(image)) return true
    errors[name] = 'Image URL must end in .png, .jpg, or .jpeg'
}
