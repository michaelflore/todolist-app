interface Todo {
    id: number;
    title: string;
    rating: number;
}

interface FilterButtonsProps {
    originalData: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function FilterButtons({ originalData, setTodos }: FilterButtonsProps) {

    const moreThanThree = () => {

        setTodos((state) => {

          const newArr = state.filter((todo) => todo.rating > 3);

          return newArr;
        });

    };

    const filterAll = () => {

        setTodos(originalData);

    };

    const handleClickMoreThanThree = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        moreThanThree();
    }

    const handleClickAll = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        filterAll();
    }

    return (
        <div id="filter-buttons">
            <button onClick={handleClickMoreThanThree}>More than 3 stars</button>
            <button onClick={handleClickAll}>All</button>
        </div>
    )
}

export default FilterButtons;
