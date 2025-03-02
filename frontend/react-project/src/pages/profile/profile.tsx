// src/pages/profile.tsx
import { Link } from 'react-router-dom';

export function Profile() {
  // Пример данных пользователя (замените на реальные данные из вашего API)
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/150",
    joined: "January 2023",
    completedTasks: 42,
    likesReceived: 128,
    createdTasks: [
      { id: 1, title: "Two Sum", tags: "Array, Hash Table", likes: 45 },
      { id: 2, title: "Reverse String", tags: "String, Algorithms", likes: 32 },
      { id: 3, title: "Binary Search", tags: "Search, Algorithms", likes: 67 },
    ]
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="mt-8 layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#1c110d] text-3xl font-bold mb-6">User Profile</h1>
        
        {/* Основная информация */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-[#f4eae7] flex items-center justify-center">
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h2 className="text-[#1c110d] text-2xl font-bold">{user.name}</h2>
            <p className="text-[#1c110d] text-base">{user.email}</p>
            <p className="text-[#9d6425] text-sm">Member since {user.joined}</p>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#f4eae7] p-6 rounded-xl">
            <h3 className="text-[#1c110d] text-xl font-bold mb-2">Completed Tasks</h3>
            <p className="text-[#f14b0e] text-3xl font-bold">{user.completedTasks}</p>
          </div>
          
          <div className="bg-[#f4eae7] p-6 rounded-xl">
            <h3 className="text-[#1c110d] text-xl font-bold mb-2">Likes Received</h3>
            <p className="text-[#f14b0e] text-3xl font-bold">{user.likesReceived}</p>
          </div>
        </div>

        {/* Созданные задания */}
        <div className="mb-8">
          <h2 className="text-[#1c110d] text-2xl font-bold mb-4">Created Tasks</h2>
          <div className="flex flex-col gap-4">
            {user.createdTasks.length > 0 ? (
              user.createdTasks.map(task => (
                <div 
                  key={task.id}
                  className="bg-[#f4eae7] p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-[#1c110d] text-lg font-medium">{task.title}</h3>
                    <div className="flex gap-2 mt-2">
                      {task.tags.split(', ').map(tag => (
                        <span 
                          key={tag}
                          className="text-sm px-2 py-1 bg-[#e8d5ce] rounded-md text-[#1c110d]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#f14b0e]">❤️ {task.likes}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#1c110d] text-center py-4">
                No tasks created yet
              </p>
            )}
          </div>
        </div>

        <Link 
          to="/tasks"
          className="self-start px-6 py-2 bg-[#f14b0e] text-[#fcf9f8] rounded-md hover:bg-[#e0440d] transition-colors"
        >
          Back to Tasks
        </Link>
      </div>
    </div>
  );
}