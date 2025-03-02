export async function checkUnique(uniqueName: string, setUniqueChecked: (arg: boolean | "Data") => void) {
    const res = await fetch("http://localhost:3000/check-unique", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uniqueName })
    })
    const data = await res.json()
    console.log(data)
    if(data.msg === 'Data please') {
      setUniqueChecked('Data')
    }
    else if(data.isExists !== undefined) {
      setUniqueChecked(!data.isExists)
    }else{
      setUniqueChecked(false)
    }
  }