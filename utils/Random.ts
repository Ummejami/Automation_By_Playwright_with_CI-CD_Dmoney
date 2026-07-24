export function generateEmail(): string {
    return `ummejami504+${Math.random().toString(36).substring(2, 8)}@gmail.com`;
}

export function generatePhone(): string {
    return `017${Math.floor(10000000 + Math.random() * 90000000)}`;
}