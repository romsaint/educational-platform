import Cookies from "js-cookie";

export function onChangeTestCase(
  newValueStr: string,
  idx: number,
  setTestCasesValues: (updater: (prev: any[]) => any[]) => void,
  idTask: number | undefined,
  currentTestCases: any[]
) {
  setTestCasesValues((prev) => {
    const updated = [...prev];
    const trimmedValue = newValueStr.trim();
    let newValue: any = newValueStr;

    if (trimmedValue.startsWith("{") || trimmedValue.startsWith("[")) {
      try {
        newValue = JSON.parse(trimmedValue);
      } catch (e) {
        // Если парсинг не удался, сохраняем как строку
        newValue = newValueStr;
      }
    }

    updated[idx] = newValue;
    Cookies.set(`test_cases_${idTask}`, JSON.stringify(updated));
    return updated;
  });
}
