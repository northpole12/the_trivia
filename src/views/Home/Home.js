import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ categories, attempt}) => (
  <div>
    <h1>Choose a category</h1>
    <p className="score">Category already done : {50 - categories.length} / 50  </p>
    <p>Attempt : {attempt}</p>
    {categories.length > 0 && (
      <div>
        {categories.map(category => (
          <Link className= "square_btn" to={`/categories/${category.id}`} key={category.id}>
            {category.title}
          </Link>
        ))}
      </div>
    )}
  </div>
);

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      clues_count: PropTypes.number
    }),
  ),
}

export default Home;
