import Cookie from 'js-cookie';

export const onSubmitForm = async (
  event: any,
  navigate: (url: string) => void,
  url: 'login' | 'registration',
  setError: (err: string | null) => void,
  file: File | null,
) => {
  event.preventDefault();

  // Создаем FormData
  const formData = new FormData();

  // Добавляем файл, если он есть
  if (file) {
    formData.append('file', file); // 'file' — это ключ, который ожидает сервер
  }

  // Добавляем остальные данные формы
  if (url === 'login') {
    formData.append('unique_id', event.target.unique_id.value);
    formData.append('password', event.target.password.value);
  } else {
    formData.append('username', event.target.username.value);
    formData.append('unique_id', event.target.unique_id.value);
    formData.append('password', event.target.password.value);
  }

  try {
    // Отправляем FormData на сервер
    const response = await fetch(`http://localhost:3000/auth/${url}`, {
      method: 'POST',
      body: formData, // FormData отправляется как multipart/form-data
    });

    const res: { [key: string]: any } = await response.json();

    if (res?.id) {
      // Сохраняем данные пользователя в куки
      Cookie.set('user', JSON.stringify(res));
      navigate('/');
      window.location.reload();
    } else {
      // Обработка ошибки
      setError(res.msg || 'An error occurred');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('Network error or server is unavailable');
  }
};