import styles from './Post.module.css';
import { Comment } from './Comment';
import { Avatar } from './Avatar'; 
import { useState } from 'react';
import MD5 from "crypto-js/md5";

export function Post({...props}) {

  const [comments, setComments] = useState([
    {commentId: 1,
     postId: 1,
     commentContent: "Muito, paarabéns!! 👏👏",
     dateTime: "2025-06-24 15:00:00",
     userIdAuthor: "00002",
     author: "Mateus Ferreira",
     reactions: 6,
     reacted: true},
    {commentId: 2,
     postId: 1,
     commentContent: "bom, parabésns!! 👏👏",
     dateTime: "2025-06-25 15:00:00",
     userIdAuthor: "00003",
     author: "Ricardo Antunes",
     reactions: 66,},
    {commentId: 3,
     postId: 2,
     commentContent: "Devon, p arabéns!! 👏👏",
     dateTime: "2025-06-25 16:00:00",
     userIdAuthor: "00004",
     author: "João Quaresma",
     reactions: 668,
     reacted: true}
  ]);

  const publishedDate = new Date(props.publishedAt.replace(' ', 'T'));

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
    relative = 'Publicado agora mesmo';
  } else if (diffMins < 60) {
    relative = `Publicado há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    relative = `Publicado há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  } else if (diffDays < 30) {
    relative = `Publicado há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
  } else if (diffMonths < 12) {
    relative = `Publicado há ${diffMonths} m${diffMonths > 1 ? 'eses' : 'ês'}`;
  } else {
    relative = `Publicado há ${diffYears} ano${diffYears > 1 ? 's' : ''}`;
  }

  const [newCommentText, setNewCommentText] = useState('');

  function handleCreateNewComment() {    
    event.preventDefault()

    if (newCommentText != '') {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds());

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      
      let newId = MD5(props.user.userId + now + milliseconds).toString();

      console.log(newId)

      setComments([...comments, {
                                commentId: newId,
                                commentContent: (newCommentText),
                                dateTime: formattedDate,                            
                                author: props.user.userName + ' (Você)',
                                reactions: 0,
                                reacted: false,
                                userIdAuthor: props.user.userId}]);

      setNewCommentText('');
    } else {
      //alerta!
    }
  }

  function handleNewCommentChange(){
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentId){
    setComments(comments.filter(comment => comment.commentId !== commentId));
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>          
          <Avatar src={props.avatar} alt="Avatar" />

          <div className={styles.authorInfo}>
            <strong>{props.author}</strong>

            <span>{props.role}</span>
          </div>
        </div>

        <time title={fullDate} dateTime={props.publishedAt}>
          {relative}
        </time>

      </header>

      <div className={styles.content}>
        {props.contentObject.map(line => {        
          if (line.type === 'paragraph') {
            return <p key={line.id}
                  >{line.content}</p>
          }
          if (line.type === 'link') {
            return (
              <p key={line.id}> 
                <a href="">
                  {line.content}
                </a>                
              </p>)
          }
        })}
                
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        
        <textarea 
          className={styles.textArea}
          maxLength={256}
          name="comment" 
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange} 
          value={newCommentText}
          required
        />
        
        <footer>
            <button type="submit" disabled={isNewCommentEmpty} >Publicar</button>    
        </footer>        
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (          
            <Comment
              key={comment.commentId}
              userId={props.user.userId}
              userIdAuthor={comment.userIdAuthor}
              commentId={comment.commentId}
              postId={comment.postId}
              commentContent= {comment.commentContent}
              dateTime={comment.dateTime}
              author={comment.author}
              reactions={comment.reactions}
              reacted={comment.reacted}
              onDeleteComment={deleteComment}
            />
          )    
        })}                    
      </div>
      
    </article>
  );
}
