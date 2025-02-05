import TodoListSection from "../components/TodoListSection";

function HomePage() {

  return (
    <div className="home-page">
      <h1 className="page-title">My Todos</h1>
      <TodoListSection />
    </div>
  )
}

export default HomePage;
