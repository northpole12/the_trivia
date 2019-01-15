import React, { Component } from 'react';
import Home from './Home';
import api from '../../helpers/api';
import './Home.css'

class HomeContainer extends Component {
  state = {
    categories: [],
    attempt: 0
  }
  async componentDidMount() {
    // Si localStorage pas initialisé => premiere visite
    if (!localStorage["categories"]) {
      // Appel a l'api
      const data = await api.getCategories();
      // Suppression des categories avec plus de 5 questions
      data.map(category => {
        data.splice(data.findIndex(category => category.clues_count > 5 ), 1);
        return 0;
      })
      // Initialisation de localStorage et mis a jour des state
      const storage = JSON.stringify(data); // mettre dans le bon format
      localStorage.setItem("categories", storage);
      localStorage.setItem("attempt", this.state.attempt);
      this.setState({categories: data,});

    }
    // Si localStorage déjà existant => retour de l'utilisateur sur la page
    else {
      // Recuperer les donner du localStorage et mise a jour des state
      let recup = localStorage.getItem("categories");
      let newData = JSON.parse(recup); // Mettre dans le bon format
      let attempt = localStorage.getItem("attempt");
      let newAttempt = JSON.parse(attempt);
      this.setState({
        categories: newData,
        attempt: newAttempt
      });
    }
  }
  // <--- RENDER --->
  render() {
    return (
      <Home
        categories={this.state.categories}
        attempt={this.state.attempt}
      />
    );
  }
}

export default HomeContainer;
