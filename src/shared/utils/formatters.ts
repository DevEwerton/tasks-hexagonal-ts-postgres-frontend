export const formatDate = (date: Date): string =>
{
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
};

export const formatDateTime = (date: Date): string =>
{
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

export const truncateText = (text: string, maxLength: number): string =>
{
    if (text.length <= maxLength) { return text; }
    return `${text.substring(0, maxLength)}...`;
};