const pathToTitle = (pathname : string) => {
    return pathname.replace('/', '').charAt(0).toUpperCase() + pathname.replace('/', '').slice(1);
}

export default pathToTitle;