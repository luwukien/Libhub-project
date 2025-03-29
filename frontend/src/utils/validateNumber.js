export const validateNumber = (number) => {
    const regex = /^[0-9]+$/;
    return regex.test(number);
};