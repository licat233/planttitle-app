import dayjs from "dayjs";

//加密并返回base64编码的字符串
export function encryptData(data: any): string {
    const input = JSON.stringify(data)
    const secretData = encryptString(input)
    // 将加密后的字符串进行 Base64 编码
    const encodedData = window.btoa(secretData);
    return encodedData
}

//解密base64编码的json字符串
export function decryptJsonBase64Data(data: string, time: Date = new Date()): string {
    // 将 Base64 编码的字符串解码为原始字符串
    data = window.atob(data)
    const secretKey = genSecretKey(time)
    const decryptData = decryptJSONString(data, secretKey)
    return decryptData
}

function encryptString(input: string, secretKey?: string): string {
    secretKey = secretKey || genSecretKey()
    const n = secretKey.length
    let encrypted = '';
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        const iv = secretKey.charCodeAt(i % n)
        const encryptedCharCode = charCode + iv; // 加密算法，简单地将字符编码+
        encrypted += String.fromCharCode(encryptedCharCode);
    }
    return encrypted;
}

export function decryptString(input: string, secretKey?: string): string {
    secretKey = secretKey || genSecretKey()
    const n = secretKey.length
    let decrypted = '';
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        const iv = secretKey.charCodeAt(i % n)
        const decryptedCharCode = charCode - iv; // 解密算法，简单地将字符编码-
        decrypted += String.fromCharCode(decryptedCharCode);
    }
    return decrypted;
}

export function decryptJSONString(input: string, secretKey?: string): string {
    const date = new Date()
    secretKey = secretKey || genSecretKey(date)
    let decrypted = decryptString(input, secretKey)
    if (!isJSON(decrypted)) {
        //不符合预期的规范，表示解密失败
        //获取上一分钟，再次解密
        secretKey = genSecretKey(date, true)
        decrypted = decryptString(input, secretKey)
        if (!isJSON(decrypted)) {
            return ""
        }
    }
    return decrypted;
}

export function getPreviousMinuteDate(date?: Date): Date {
    date = date || new Date()
    return dayjs(date).subtract(1, 'minutes').toDate()
}

export function genSecretKey(date?: Date, previousMinute?: boolean): string {
    date = date || new Date()
    if (previousMinute) {
        date = getPreviousMinuteDate(date)
    }
    const timestampInSeconds = Math.floor(date.getTime() / 1000)
    const timestampInMinutes = timestampInSeconds - (timestampInSeconds % 60); // 当前分钟的时间戳
    return timestampInMinutes + "";
}

export function isJSON(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}