interface FilterButtonsProps {
    filterAll: () => void;
    moreThanThree: () => void;
    sortByLikes: () => void;
}

function FilterButtons({ filterAll, moreThanThree, sortByLikes }: FilterButtonsProps) {

    const handleClickMoreThanThree = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        moreThanThree();
    }

    const handleClickAll = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        filterAll();
    }

    const handleClickSortByLikes = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        sortByLikes();
    }

    return (
        <div id="filter-buttons">
            <button onClick={handleClickSortByLikes}>Sort By Likes</button>
            <button onClick={handleClickMoreThanThree}>More than 3 stars</button>
            <button onClick={handleClickAll}>All</button>
        </div>
    )
}

export default FilterButtons;
