import { Paper } from "@mui/material";
import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,cover,content,createdAt,author,updatedAt}) {

  return (
    
    <div className="post">
      <div className="image">
      {/* <Paper elevation={3} style={{ width: '90%', height: '90%' }}> */}
        <Link to={`/post/${_id}`}>
          <img src="./logo192.png" alt="" style={{width:'350px'}}/>
        </Link>
        {/* </Paper> */}
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(updatedAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
      
    </div>
    
    
  );
}