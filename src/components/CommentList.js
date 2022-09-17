import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCommentsList,
  getComment,
  removeComment,
} from '../redux/modules/comments';

export default function CommentList() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.commentsReducer);

  const removeCommentFunc = async (commentId) => {
    if (confirm('삭제 하시겠습니까?') === true) {
      dispatch(removeComment(commentId));
    }
  };

  useEffect(() => {
    dispatch(getCommentsList(1));
  }, []);

  return comments.map((comment, key) => (
    <Comment key={key}>
      <img src={comment.profile_url} alt="" />

      {comment.author}

      <CreatedAt>{comment.createdAt}</CreatedAt>

      <Content>{comment.content}</Content>

      <Button>
        <a onClick={() => dispatch(getComment(comment.id))}>수정</a>
        <a onClick={() => removeCommentFunc(comment.id)}>삭제</a>
      </Button>

      <hr />
    </Comment>
  ));
}

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
