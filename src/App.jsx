import './global.css'
import styles from './App.module.css' 
import { Header } from "./components/Header"
import { Post } from './components/Post'
import { SideBar } from './components/Sidebar'

const posts = [
  {id: 1,
   author: {
    avatarUrl: "https://avatars.githubusercontent.com/u/180345462?v=4.png",
    name: "Diego Fernandes",
    role: "Web Developer"
   },
   contentObject: [
    {id: 12, type: 'paragraph', content: 'Fala galeraa 👋'},
    {id: 13, type: 'paragraph', content: 'Acabei de ssubir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
    {id: 14, type: 'link',      content: 'jane.design/doctorcare'},
    {id: 15, type: 'paragraph', content: '#novoprojeto #nlw  #rocketseat'},
   ],
   publishedAt: '2025-06-24 08:30:00'
  },
  {id: 2,
   author: {
    avatarUrl: "https://avatars.githubusercontent.com/u/180345462?v=4.png",
    name: "Lucas Almeida",
    role: "UX Designer"
   },
   contentObject: [
    {id: 1, type: 'paragraph', content: 'Novidades no design'},
    {id: 2, type: 'paragraph', content: 'Atualizamo s nosso sistema de ícones e paleta de cores.'},
    {id: 3, type: 'link',      content: 'https://example.com/design'},
    {id: 4, type: 'paragraph', content: '#design #ux #novidades'},    
   ],
   publishedAt: '2025-06-24 15:00:00'
  },
]

const user = {
  userId: "00001", 
  userName: "João Mateus Quaresma",
  userRole: "Web Developer",
  userAvatar: "https://avatars.githubusercontent.com/u/180345462?v=4.png",
  userBackground: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?fm=jpg&q=100&w=500&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}

export function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <SideBar user={user}/>

        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                user={user} 
                author={post.author.name}  
                avatar={post.author.avatarUrl}
                role={user.userRole}                
                contentObject={post.contentObject} 
                publishedAt={post.publishedAt}/>               
            )
          })}
        </main>
      </div>
    </div>
  )
}

