import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCommentListLength, getCommentListPerPage } from '../apis';
import { getComments } from '../reducers/comments';

export default function PageList() {
  const { page } = useSelector((state) => state.commentsReducer);
  const dispatch = useDispatch();
  let pageCount;
  const pageArray = [];

  for (let i = 0; i < 6; i++) {
    const PAGE = i + 1;
    pageArray.push(
      <Page
        key={i}
        onClick={() => handleGetComments(PAGE)}
        active={page === PAGE}
      >
        {PAGE}
      </Page>
    );
  }

  const handleGetComments = async (page) => {
    const data = await getCommentListPerPage(page);
    dispatch(getComments(data, page));
  };

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
