import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css'
import { HandsClapping, Trash } from 'phosphor-react';

export function Comment({ 
  author,
  commentId,
  postId, 
  commentContent, 
  dateTime="2001-01-01 00:00:00", 
  reactions=0, 
  reacted=false, 
  userIdAuthor, 
  userId, 
  onDeleteComment})
{ 
  const publishedDate = new Date(dateTime.replace(' ', 'T'));

// Formata o title "24 de junho às 09:14"
  const fullDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(publishedDate)
    .replace(' ', ' de ');

  // Calcula a diferença em milissegundos
  const now = new Date();
  const diffMs = now - publishedDate;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30 * 12));

  let relative;
  if (diffMins < 1) {
    relative = 'Agora mesmo';
  } else if (diffMins < 60) {
    relative = `Cerca de ${diffMins} minuto${diffMins > 1 ? 's' : ''} atrás`;
  } else if (diffHours < 24) {
    relative = `Cerca de ${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
  } else if (diffDays < 30) {
    relative = `Cerca de ${diffDays} dia${diffDays > 1 ? 's' : ''} atrás`;
  } else if (diffMonths < 12) {
    relative = `Cerca de ${diffMonths} m${diffMonths > 1 ? 'eses' : 'ês'} atrás`;
  } else {
    relative = `Cerca de ${diffYears} ano${diffYears > 1 ? 's' : ''} atrás`;
  }
  
  const [applaud, setApplaud] = useState(reactions);
  const [myReaction, setMyReaction] = useState(reacted);

  // function handleApplaudChange(){
  //   if (myReaction) {
  //     setApplaud(applaud - 1)
  //     setMyReaction(false)  
  //   } else {
  //     setApplaud(applaud + 1)
  //     setMyReaction(true)  
  //   }    
  // }

  function handleDeleteComment(){ 
    onDeleteComment(commentId);   
  }

  return(
  <div className={styles.comment}>
    <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/180345462?v=4.png" />

    <div className={myReaction & applaud > 0 ? styles.commentBoxActive: styles.commentBox}>
      <div className={styles.commentContent}>
        <header>
          <div className={styles.authorAndTime}>
            <strong>{author}</strong>   
            <time 
              title={fullDate} 
              dateTime={dateTime} about='1'> 
              {relative}
            </time>            
          </div>

          <button onClick={handleDeleteComment} title="Deletar Comentário">
            <Trash size={24}/>
          </button>
        </header>
        <p>{commentContent}</p>
          
      </div>
      
      <footer>
        {userId !== userIdAuthor && (
          // <button onClick={handleApplaudChange}>
          <button onClick={()=>{if (myReaction) {
                                  setApplaud(applaud - 1)
                                  setMyReaction(false)  
                                } else {
                                  setApplaud(applaud + 1)
                                  setMyReaction(true)  
                                }}}>
            <HandsClapping size={20} />
            Aplaudi{myReaction && applaud > 0 ? 'do' : 'r'} <span>{applaud}</span>
          </button>
        )}
      </footer>
    </div>       
  </div>   
  )
}