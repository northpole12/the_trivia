import React from 'react';
import PropTypes from 'prop-types';

const Category = ({categoryName, category, checkAnswer, question1, score, userAnswer}) => (
    <div>
      <h1 className="title">CATEGORY : {categoryName}</h1>
      <h2>Clue {question1 + 1}</h2>
      <h3>{category.clues[question1].question}</h3>
      <form onSubmit={checkAnswer} >
        <input type="text" ref={userAnswer} placeholder="Answer"/>
        <button>Submit</button>
      </form>
      <p className="score">Score : {score} / 5</p>
    </div>
);

Category.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default Category;
