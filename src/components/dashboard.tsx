import React, { useEffect, useState } from 'react';

export default function Dashborad(){
    const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
    return(
        <div>
            {token}
        </div>
    )
}