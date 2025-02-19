import Cookie from 'js-cookie'


export const onSubmitForm = async (event: any, navigate: (url: string) => void, url: "login" | 'registration', setError: (err: string | null) => void) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  let data;

  if(url === 'login') {
    data = {
      unique_id: formData.get('unique_id'),
      password: formData.get('password'),
    };
  }else{
    data = {
      username: formData.get('username'),
      unique_id: formData.get('unique_id'),
      password: formData.get('password'),
    };
  }


  try {
    const response = await fetch(`http://localhost:3000/auth/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res: {[key: string]: any} = await response.json()

    if (res?.id) {
      Cookie.set('user', JSON.stringify(res))
      navigate('/')
      window.location.reload()
    } else {
      setError(res.msg)
    }
  } catch (error) {
    console.error('Error:', error);
  }
};