export function debounce<T extends (...args: any[]) => Promise<void>>(
    func: T,
    delay = 500
): (...args: Parameters<T>) => void {
    let timer: any | null = null;

    return (...args: Parameters<T>): void => {
        // Clear any previous debounce timer
        if (timer) {
            clearTimeout(timer);
        }

        // Set a new debounce timer
        timer = setTimeout(async () => {
            await func(...args);
        }, delay);
    };
}
