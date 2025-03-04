import Cookie from 'js-cookie' 

export async function fetchProfile() {
    const user = Cookie.get('user')

    const fet = await fetch('http://localhost:3000/profile', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: user
    })
    const data = fet.json()
   
    return data 
}