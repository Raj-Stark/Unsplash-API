import { FaSearch } from "react-icons/fa";
import Modal from "./components/Modal";
import Photo from "./components/Photo";
import { useGlobalContext } from "./context";

function App() {
  const {
    photos,
    loading,
    query,
    setQuery,
    fetchImages,
    setPage,
    page,
    openModal,
  } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    setPage(1);

    if (page === 1) {
      fetchImages();
      return;
    }
  };

  return (
    <div>
      {openModal && <Modal></Modal>}
      <main className="  max-w-full bg-gray-900 h-60">
        <section className=" max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full ">
          <h1 className="text-2xl text-white font-bold mb-10">Raj PIX</h1>
          <form className=" w-3/4 sm:w-2/4 flex  ">
            <input
              type="text"
              placeholder="Search ..."
              className=" w-full  h-10 p-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className=" h-10 ml-3 text-white hover:text-red-600 duration-200 "
            >
              <FaSearch size={25}></FaSearch>
            </button>
          </form>
        </section>
        <section className=" max-w-screen-xl mx-auto mt-20">
          <div className="grid md:grid-cols-3 justify-items-center gap-4 sm:grid-cols-2 p-4  ">
            {photos.map((photo, i) => {
              return <Photo key={i} {...photo}></Photo>;
            })}
          </div>
          {loading && (
            <h2 className="text-center text-2xl font-bold">Loading....</h2>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
