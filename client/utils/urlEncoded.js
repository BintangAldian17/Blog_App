const urlEncoded = (a, b, c) => {
    const url = `/${encodeURIComponent(a.toLowerCase())}/${b
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .trim()
        .toLowerCase()}-${c}`

    return url

}

export default urlEncoded
