import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data.message))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return <div>{data ? data : 'Loading...'}</div>;
};

export default App;
