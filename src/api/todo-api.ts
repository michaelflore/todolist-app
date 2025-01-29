export const fetchTodosAPI = async (searchTerm: string, signal: AbortSignal) => {

    try {
        let url = "/api/todolist";

        const searchQuery = searchTerm ? `?search=${searchTerm}` : "";

        if(searchQuery) {
            url = url + searchQuery;
        }

        const response = await fetch(url, {
            method: "GET",
            signal: signal
        });
console.log(response);
        const data = await response.json();

        return data;

    } catch(err) {

      if(err instanceof Error) {
        console.error("fetchTodosAPI", err);
      }

    }

}