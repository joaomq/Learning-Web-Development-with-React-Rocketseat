import {PencilLine} from 'phosphor-react'
import styles from './Sidebar.module.css'
import { Avatar } from './Avatar';

export function SideBar(props) {
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover} 
                src={props.user.userBackground}
            />
            
            <div className={styles.profile}>
                <Avatar src={props.user.userAvatar} />

                <strong name="authorName">{props.user.userName}</strong>
                <span>{props.user.userRole}</span>
            </div>  

            <footer>
                <a href='#'>
                    <PencilLine size={20}/>
                    Editar Seu Perfil
                </a>    
            </footer>      

        </aside>
    );
}