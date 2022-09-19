import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAll, getAllLength, setPage } from '../redux/modules/comments';

export default function PageList() {
  const { loading, error, data } = useSelector(
    (state) => state.commentsReducer.total
  );
  const page = useSelector((state) => state.commentsReducer.page);
  const dispatch = useDispatch();
  const pageArray = [];

  const handlePage = (page) => {
    // dispatch(setPage(page));
    dispatch(getAll(page));
    dispatch(getAllLength());
  };

  const pagination = Math.ceil(
    data?.length / process.env.REACT_APP_NUM_PER_PAGE
  );
  for (let i = 0; i < pagination; i++) {
    const PAGE = i + 1;
    pageArray.push(
      <Page key={i} onClick={() => handlePage(PAGE)} active={page === PAGE}>
        {PAGE}
      </Page>
    );
  }
  return <PageListStyle>{pageArray}</PageListStyle>;
}

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  ${({ active }) =>
    active &&
    `
        background: gray;
        color: #fff;
  `}
  margin-right: 3px;
`;
