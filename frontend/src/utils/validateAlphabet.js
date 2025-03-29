export const validateAlphabet = (alphabet) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(alphabet);
};