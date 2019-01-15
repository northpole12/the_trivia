import React, { Component, createRef } from 'react';
import Category from './Category';
import { Link } from 'react-router-dom';
import api from '../../helpers/api';
import './Category.css'

class CategoryContainer extends Component {
  state = {
    category: null,
    question1: 0,
    score: 0,
    clues_count: 0,
  }

  userAnswer = createRef()// Reponse de l'utilisateur reference

  // Appel a l'api et mise a jour des state
  async componentDidMount() {
    const data = await api.getCategoryById(this.props.match.params.id);
    this.setState({
      category: data,
      clues_count: data.clues_count,
    });
  }
  // Fonction verification de la bonne ou mauvaise reponse
  checkAnswer = (e) => {
    e.preventDefault();
    const userAnswer = this.userAnswer.current.value;
    if (userAnswer.toLowerCase() === this.state.category.clues[this.state.question1].answer.toLowerCase()){
      this.setState({
        score: this.state.score + 1,
        question1: this.state.question1 + 1
      });
    }
    else {
      this.setState({question1: this.state.question1 + 1});
    }
    this.userAnswer.current.value = "";
  }
  // <--- RENDER --->
  render() {
    const { category, question1, score, clues_count } = this.state;
    console.log(this.state.category); // Afficher les reponses dans la console

    if (!category) return <div>is loading</div> // Avant l'appel de l'api (éviter erreur)
    // Tant que l'on est pas a la dernier questions on afficher <Category>
    if (question1 < clues_count){
      return (
        <div>
          <Category
            categoryName={this.state.category.title}
            category={category}
            checkAnswer={this.checkAnswer}
            question1={question1}
            score={this.state.score}
            userAnswer = {this.userAnswer}
          />
        <Link className="return-home" to={`/`}>
            Return to home
          </Link>
        </div>
      );
    }
    // A la fin de la dernier question
    else {
      // Plus de 3 bonne reponse => gagné
      if (score >= 3) {
        /* Recupere dans le localStorage les categories et supprime la
        categorie en cours du localStorage */
        let recup = localStorage.getItem("categories");
        let newData = JSON.parse(recup);// Mettre dans le bon format
        newData.splice(newData.findIndex(
          category => category.id === parseInt(this.props.match.params.id)
        ), 1);// Suppression de la category
        const storage = JSON.stringify(newData);// Mettre dans le bon format
        localStorage.removeItem("categories");
        localStorage.setItem("categories", storage);

        let attempt = localStorage.getItem("attempt");
        localStorage.setItem("attempt", parseInt(attempt) + 1);// Ajoute 1 au tentative
        return (
          <div>
            <h1>You win ! <span role="img" aria-label="party">🎉</span></h1>
            <p className="score">Score : {score} / 5</p>
            <Link className="return-home" to={`/`}>
              Return to home
            </Link>
          </div>
        )
      }
      // Sinon perdu
      else {
        let attempt = localStorage.getItem("attempt");
        localStorage.setItem("attempt", parseInt(attempt) + 1); // Ajoute 1 au tentative
        return (
          <div>
            <h1>You lost <span role="img" aria-label="crying">😢</span></h1>
            <p className="score">Score : {score} / 5</p>
            <Link className="return-home" to={`/`}>
              Return to home
            </Link>
          </div>
        )
      }
    }
  }
}

export default CategoryContainer;
