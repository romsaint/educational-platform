import Cookie from 'js-cookie'


export const onSubmitReg = async (event: any, navigate: (url: string) => void) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    username: formData.get('username'),
    unique_id: formData.get('unique_id'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('http://localhost:3000/auth/registration', {
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
      console.error('Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};