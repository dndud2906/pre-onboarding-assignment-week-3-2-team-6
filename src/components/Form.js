import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getAllLength,
  postOne,
  putOne,
  getAll,
} from '../redux/modules/comments';

export default function Form() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(
    (state) => state.commentsReducer.comment
  );
  const page = useSelector((state) => state.commentsReducer.page);
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
    data && dispatch(putOne({ commentId: data.id, sendData }));
    dispatch(getAll(page));

    !data && dispatch(postOne(sendData));
    dispatch(getAll(1));
    dispatch(getAllLength());

    settingInput('', '', '', '');
  };

  useEffect(() => {
    data &&
      settingInput(data.profile_url, data.author, data.content, data.createdAt);
  }, [data]);

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
