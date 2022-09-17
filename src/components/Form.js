import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createComment, editComment, getCommentListPerPage } from '../apis';
import { getComments, getOneComment } from '../redux/modules/comments';

export default function Form() {
  const dispatch = useDispatch();
  const { comment, page } = useSelector((state) => state.commentsReducer);
  const profileRef = useRef(null);
  const authorRef = useRef(null);
  const contentRef = useRef(null);
  const dateRef = useRef(null);

  const resetInput = () => {
    profileRef.current.value = '';
    authorRef.current.value = '';
    contentRef.current.value = '';
    dateRef.current.value = '';
  };

  const apiAndDispatch = async (page) => {
    const data = await getCommentListPerPage(page);
    dispatch(getComments(data, page));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      profile_url: profileRef.current.value,
      author: authorRef.current.value,
      content: contentRef.current.value,
      createdAt: dateRef.current.value,
    };
    if (comment.id) {
      await editComment(comment.id, sendData);
      apiAndDispatch(page);
      dispatch(getOneComment({}));
    } else {
      await createComment(sendData);
      apiAndDispatch(1);
    }
    resetInput();
  };

  useEffect(() => {
    if (comment.id) {
      profileRef.current.value = comment.profile_url;
      authorRef.current.value = comment.author;
      contentRef.current.value = comment.content;
      dateRef.current.value = comment.createdAt;
    }
  }, [comment]);

  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
          ref={profileRef}
        />
        <br />
        <input type="text" name="author" placeholder="작성자" ref={authorRef} />
        <br />
        <textarea
          name="content"
          placeholder="내용"
          required
          ref={contentRef}
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          placeholder="2020-05-30"
          required
          ref={dateRef}
        />
        <br />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
}

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
