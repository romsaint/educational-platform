import Cookie from 'js-cookie'


export const onSubmitForm = async (event: any, navigate: (url: string) => void, role: "ADMIN" | "MODERATOR", setError: (err: string | null) => void, file: null | File) => {
  event.preventDefault();

  const formData = new FormData();
  if (file) {
    formData.append('file', file); // 'file' — это ключ, который ожидает сервер
  }

  formData.append('username', event.target.username.value);
  formData.append('unique_id', event.target.unique_id.value);
  formData.append('password', event.target.password.value);
  formData.append('role', role);


  try {
    const response = await fetch(`http://localhost:3000/auth/registration-with-role`, {
      method: 'POST',
      body: formData, // FormData отправляется как multipart/form-data
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
    if(error instanceof Error) {
      setError(error.message)
    }
    setError('Error')
  }
};