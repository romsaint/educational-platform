import Cookie from 'js-cookie'


export const onSubmitForm = async (event: any, navigate: (url: string) => void, role: "ADMIN" | "MODERATOR", setError: (err: string | null) => void) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  let data;

  data = {
    username: formData.get('username'),
    unique_id: formData.get('unique_id'),
    password: formData.get('password'),
    role
  };


  try {
    const response = await fetch(`http://localhost:3000/auth/registration-with-role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res: {[key: string]: any} = await response.json()
    console.log(res)
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