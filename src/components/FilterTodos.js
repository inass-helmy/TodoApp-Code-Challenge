import React from 'react';

import styled from 'styled-components';

const AddTodo = ({ onFilterTodos }) => {
  return (
    <Container>
      <DropDownMenu
        onChange={event => {
          // event handler to filter the todos
          onFilterTodos(event.target.value);
        }}
      >
        <option value="">Filter list...</option>
        <option value="completed">completed</option>
        <option value="active">active</option>
        <option value="all">all</option>
      </DropDownMenu>
    </Container>
  );
};
const Container = styled.div`
  width: 40px;
  height: 40px;
  background-image: url('./icons/arrow-drop-down.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const DropDownMenu = styled.select`
  background: #3b4049;
  color: #8d96a8;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 500px;
  margin-bottom: 16px;
  list-style: none;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;
export default AddTodo;
