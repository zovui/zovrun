export function getSource (source, type) {
    const openTagRE = new RegExp(`<${type}[^>]*>`)
    const closeTagRE = new RegExp(`<\/[^>]*${type}>`)
    const queryRE = new RegExp(`<${type}[^>]*>[\\s\\S]*?<\\/[^>]*${type}>`, 'gi')
    let arr = source.match(queryRE) || []
    return arr.map((item) => {
        return item.replace(openTagRE, '').replace(closeTagRE, '')
    })
}
