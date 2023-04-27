import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../CSS/ShareRecipeBtn.css';

const copy = require('clipboard-copy');

function ShareRecipeBtn({ id }) {
  const [copied, setCopied] = useState();
  const history = useHistory();
  const { pathname } = history.location;

  const getCopyLink = () => {
    if (pathname.includes('drinks')) {
      copy(`http://localhost:3000/drinks/${id}`);
    } else {
      copy(`http://localhost:3000/foods/${id}`);
    }
    setCopied(true);
  };

  useEffect(() => {
    setCopied(false);
  }, []);

  return (
    <div>
      <button
        onClick={ () => getCopyLink() }
        type="button"
        data-testid="share-btn"
        className="share-btn"
      >
        <img src={ shareIcon } alt="share" />
      </button>
      { copied && <p>Link copied!</p> }
    </div>
  );
}

ShareRecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ShareRecipeBtn;
