import { css } from "@emotion/react";

interface FilterButtonsProps {
    filterAll: () => void;
    filterCompleted: () => void;
    filterPending: () => void;
}

const buttonStyles = css`
  background-color: rgba(0, 0, 0, 0.02);
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  border: 1px solid transparent;
  color: #000;
  border-radius: 5px;
  transition: background-color 0.25s;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    outline: 2px solid #777777;
  }

  &:focus-visible {
    outline: 2px solid #777777;
  }
`;

function FilterButtons({ filterAll, filterCompleted, filterPending }: FilterButtonsProps) {

    const handleClickAll = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        filterAll();
    }

    const handleClickCompleted = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        filterCompleted();
    }

    const handleClickPending = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        filterPending();
    }

    return (
        <div className="filter-buttons">
            <button
                css={buttonStyles}
                onClick={handleClickAll}
            >
                All
            </button>
            <button
                css={buttonStyles}
                onClick={handleClickCompleted}
            >
                Completed
            </button>
            <button
                css={buttonStyles}
                onClick={handleClickPending}
            >
                Pending
            </button>
        </div>
    )
}

export default FilterButtons;
