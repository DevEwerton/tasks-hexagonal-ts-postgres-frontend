export const isValidEmail = (email: string): boolean =>
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const isNotEmpty = (value: string): boolean =>
{
    return value.trim().length > 0;
};

export const isValidPassword = (password: string): boolean =>
{
    return password.trim().length >= 6;
};