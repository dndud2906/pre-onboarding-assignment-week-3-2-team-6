import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { createComment, editComment } from '../redux/modules/comments';

export default function Form() {
  const dispatch = useDispatch();
  const { comment, page } = useSelector((state) => state.commentsReducer);
  const inputRef = useRef([]);

  const settingInput = (profile_url, author, content, createdAt) => {
    inputRef.current[0].value = profile_url;
    inputRef.current[1].value = author;
    inputRef.current[2].value = content;
    inputRef.current[3].value = createdAt;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sendData = {
      profile_url: inputRef.current[0].value,
      author: inputRef.current[1].value,
      content: inputRef.current[2].value,
      createdAt: inputRef.current[3].value,
    };
    if (comment.id) {
      dispatch(editComment(comment.id, sendData, page));
    } else {
      dispatch(createComment(sendData));
    }
    settingInput('', '', '', '');
  };

  useEffect(() => {
    if (comment.id) {
      settingInput(
        comment.profile_url,
        comment.author,
        comment.content,
        comment.createdAt
      );
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
          ref={(el) => (inputRef.current[0] = el)}
        />
        <br />
        <input
          type="text"
          name="author"
          placeholder="작성자"
          ref={(el) => (inputRef.current[1] = el)}
        />
        <br />
        <textarea
          name="content"
          placeholder="내용"
          required
          ref={(el) => (inputRef.current[2] = el)}
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          placeholder="2020-05-30"
          required
          ref={(el) => (inputRef.current[3] = el)}
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
