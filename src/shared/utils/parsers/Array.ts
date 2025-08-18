export function findKeyValueFromFlatArray<T>(key: string, flatObjectArray: (string | T)[]): Record<string, T> {
    for (let i = 0; i < flatObjectArray.length; i += 2) {
        if (flatObjectArray[i] === key) {
            const object = { 
                [flatObjectArray[i] as string]: flatObjectArray[i + 1] as T 
            };
            return object;
        }
    }
    
    return null;
}
