import React from 'react';

import { useHistory } from 'react-router-dom';

export default function Main() {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push('/search')}>ir pra busca</button>
    </div>
  );
}
