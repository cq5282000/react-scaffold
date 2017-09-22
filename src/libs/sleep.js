export default (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};
