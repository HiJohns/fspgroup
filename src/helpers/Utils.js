export const forceHttps = () => {
    if (location.protocol === 'http:') {
        location.href = location.href.replace(/^http:/, 'https:')
    }
}
