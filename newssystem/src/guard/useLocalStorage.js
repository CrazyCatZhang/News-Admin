import {useState} from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    const [storageValue, setStorageValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return value
            } else {
                window.localStorage.setItem(keyName, defaultValue)
                return defaultValue
            }
        } catch (e) {
            return defaultValue
        }
    })
    const setValue = (value) => {
        try {
            window.localStorage.setItem(keyName, value)
        } catch (e) {

        }
        setStorageValue(value)
    }
    return [storageValue, setValue]
}