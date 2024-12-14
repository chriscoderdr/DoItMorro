import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

function generateFolderPath() {
    return FileSystem.documentDirectory + "appData/";
}

function generateFilePath(key: string) {
    const fileName = key.replace(/[^a-z0-9.\-_]/gi, "-");
    return generateFolderPath() + fileName;
}

function writeFile(path: string, value: string) {
    return FileSystem.writeAsStringAsync(path, value);
}

const NativeFileSystemStorage = {
    getItem(key: string) {
        return FileSystem.readAsStringAsync(generateFilePath(key));
    },
    setItem(key: string, value: string) {
        const folderPath = generateFolderPath();
        return FileSystem.getInfoAsync(folderPath).then((info) => {
            const filePath = generateFilePath(key);
            if (info.exists) {
                return writeFile(filePath, value);
            } else {
                return FileSystem.makeDirectoryAsync(folderPath, {
                    intermediates: true,
                }).then(() => writeFile(filePath, value));
            }
        });
    },
    removeItem(key: string) {
        return FileSystem.deleteAsync(generateFilePath(key), { idempotent: true });
    },
};

const WebFileSystemStorage = {
    getItem(key: string) {
        if (typeof window !== "undefined" && window.localStorage) {
            return Promise.resolve(localStorage.getItem(key) || null);
        }
        return Promise.resolve(null);
    },
    setItem(key: string, value: string) {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem(key, value);
        }
        return Promise.resolve();
    },
    removeItem(key: string) {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem(key);
        }
        return Promise.resolve();
    },
};

// Use the appropriate implementation based on the platform
const ExpoFileSystemStorage =
    Platform.OS === "web" ? WebFileSystemStorage : NativeFileSystemStorage;

export default ExpoFileSystemStorage;
