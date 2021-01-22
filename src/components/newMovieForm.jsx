/**@format */
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "./../services/fakeMovieService";
import { Redirect } from "react-router-dom";

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      genres: getGenres(),
      activeGenre: getGenres()[0].name,
      numberInStock: "",
      rate: "",
    },
    errors: {
      tile: "",
      genres: "",
      activeGenre: "",
      numbersInStock: "",
      rate: "",
    },
  };

  schema = {
    title: Joi.string().required(),
    genres: Joi.array().required(),
    activeGenre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    rate: Joi.number().min(0).max(10).required(),
  };

  doSubmit = () => {
    let { title, activeGenre, numberInStock, rate } = this.state.data;
    activeGenre = getGenres().find((g) => g.name === activeGenre);

    saveMovie({
      _id: "",
      title,
      genre: activeGenre,
      numberInStock,
      dailyRentalRate: rate,
    });

    window.location.assign("/movies");
  };

  render() {
    let { genres, activeGenre } = this.state.data;

    return (
      <div>
        <h1>Create new movie</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {this.renderInput("title", "Title", false, "text")}
            {this.renderOptionInput(
              "activeGenre",
              "Genre",
              genres,
              activeGenre
            )}
            {this.renderInput(
              "numberInStock",
              "Number in Stock",
              false,
              "text"
            )}
            {this.renderInput("rate", "Rate", false, "text")}
          </div>
          {this.renderButton("Save", "/movies")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
