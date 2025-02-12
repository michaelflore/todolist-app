import { Link } from "react-router";

import { css } from "@emotion/react";

import AddIcon from "@mui/icons-material/Add";

function NoTodos() {

  const addLinkStyles = css`
    background-color: #000;
    padding: 0.4em 0.8em;
    font-size: 1em;
    line-height: 1em;
    font-weight: 500;
    border: 1px solid transparent;
    color: #fff;
    border-radius: 5px;
    transition: background-color 0.25s;
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 5px;
    width: max-content;

    & .add-icon {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background-color: rgb(0, 0, 0, 0.7);
      color: #fff;
    }

    &:active {
      outline: 2px solid rgb(0, 0, 0, 0.7);
    }

    &:focus-visible {
      outline: 2px solid #000;
    }
  
  `;

  return (
    <div className="no-todos-comp">
      <section>
        <p>You do not have any todos yet.</p>
        <p>Add some to get started!</p>
      </section>
      <div className="actions">
        <Link
          css={addLinkStyles}
          to="/add"
        >
          <AddIcon className="add-icon" />Add Todo
        </Link>
      </div>
    </div>
  )
}

export default NoTodos;
