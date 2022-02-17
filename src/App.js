import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const url = "https://course-api.com/react-tours-project";

  const removeTour = (id) => {
    const TourItem = tours.filter((tour) => tour.id !== id);
    setTours(TourItem);
  };
  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading></Loading>
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2> No Tour Available</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
