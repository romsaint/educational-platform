export function onChangeTestCase(value: string, idx: number, setTestCasesValues: (prev: any) => void) {
  setTestCasesValues(prev => {
    const newValues = [...prev];
    newValues[idx] = value;
    return newValues;
  });
}
