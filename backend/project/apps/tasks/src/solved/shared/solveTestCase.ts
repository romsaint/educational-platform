export function solveTestCase(code: string, testCases: string) {
    // 1. Извлечь имя функции из строки кода
    const match = code.match(/function\s+(\w+)\s*\(/);
    if (!match) {
        return {msg: "Function name not found in code.", ok: false}
    }
    const functionName = match[1];

    // 2. Выполнить код и вернуть функцию одновременно
    let func;
    console.log(code, functionName, testCases);
    try {
        // Оборачиваем исходный код в IIFE, которая возвращает нужную функцию
        func = eval(`(function() {
            ${code}
            return ${functionName};
        })()`);
    } catch (e) {
        return {msg: "Error evaluating code: " + e.message, ok: false};
    }
    if (typeof func !== "function") {
        return {msg: `${functionName} is not a function`, ok: false};
    }

    // 3. Обработка тестовых данных
    let testCaseArray: any = [];
    if (testCases.includes("[")) {
        testCaseArray = testCases.match(/\[.*?\]/g) || [];
        testCaseArray = testCaseArray.map(tc => {
            try {
                return eval(tc);
            } catch (e) {
                return {msg: "Error evaluating test case", ok: false};
            }
        });
    } else {
        testCaseArray = testCases.split(",").map(tc => {
            const trimmed = tc.trim();
            const num = parseFloat(trimmed);
            if (/^\d+(\.\d+)?$/.test(trimmed)) {
                return num;
            }
            return trimmed;
        });
    }

    // 4. Вызываем функцию для каждого тестового кейса
    const res = testCaseArray.map(tc => {
        try {
            if (Array.isArray(tc)) {
                return func(...tc);
            } else {
                return func(tc);
            }
        } catch (e) {
            return "Error: " + e.message;
        }
    });

    return res;
}
