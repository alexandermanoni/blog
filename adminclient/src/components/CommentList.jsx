import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateComment from "../components/CreateComment";

// [NOTE]: the recursive code only displays the 1st and last comments. 

// [note]: for recursion: https://blog.logrocket.com/recursive-components-react-real-world-example/
// [note]: the curly braces v where () before
const Comment = ({ data }) => {
  
  return (
    <div>
      {
        data.map((parent) => {
          return (
            <div key={parent.commentid} className="rounded-lg bg-white shadow-md space-y-3 p-6 m-1 w-max">
                <div className="text-2xl font-semibold text-black">
                    {parent.commentername}
                </div>
                <div className="text-md font-small text-black text-justify">
                    {parent.commentbody}
                </div>
                <div className="text-sm text-black">
                    {parent.commentdate}
                </div>
                <CreateComment
                  parentCommentID={parent.commentid}
                />    
                <div>
                {parent.children && <Comment data={parent.children} />}
                </div>
              </div>
          );
        })
      }
    </div>
  );
}

/*
const Comment = (props) => (
  <div className="rounded-lg bg-white shadow-md space-y-3 p-6 m-1 w-1/2">
    <div className="text-2xl font-semibold text-black">
        {props.comment.commentername}
    </div>
    <div className="text-md font-small text-black text-justify">
        {props.comment.commentbody}
    </div>
    <div className="text-sm text-black">
        {props.comment.commentdate}
    </div>
    Creates a Reply Section for a comment and passes in the parent id
    <CreateComment
      parentCommentID={props.comment.commentid}
    />    
  </div>
);
*/

export default function CommentList() {
  const { postid } = useParams();
    const [comments, setComments] = useState([]);

    // fetch comments from database    
    useEffect(() => {
        async function getComments() {
            const response = await fetch(`http://localhost:5050/record/comments/${postid}`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }

            const comments = await response.json();
            setComments(comments);
        }

        getComments();
        return;
    }, [comments.length]);

    console.debug(comments);

    /*
    // map comments to table
    function commentList() {
      //console.debug(comments);
        return comments.map((comment) => {
            // [note]: should the key be commentid AND parent AND post?
            //console.debug(...commentList(comment.arr));
            return (
                <Comment
                    comment={comment.c}
                    key={comment.c.commentid}
                />
            );
        });
    }
        */

    // display comments
    return (
      <>
          <div className="flex overflow-visible space-y-10 items-center flex-col">
              <Comment data={comments} />
          </div>
      </>
    );

    /*
    // display comments
    return (
        <>
            <div className="flex overflow-visible space-y-10 items-center flex-col">
                { commentList() }
            </div>
        </>
    );
    */
}
