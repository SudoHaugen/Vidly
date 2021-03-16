/**@format */

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovieById, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genres: getGenres(),
      activeGenre: "",
      numberInStock: 0,
      rate: 0,
    },
    errors: { _id: "", title: "", genre: "", numbersInStock: "", rate: "" },
  };

  schema = {
    _id: Joi.string().required(),
    title: Joi.string().required(),
    genres: Joi.array().required(),
    activeGenre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    rate: Joi.number().min(0).max(10).required(),
  };

  async componentDidMount() {
    let {
      _id,
      title,
      genre,
      numberInStock,
      dailyRentalRate,
    } = await getMovieById(this.props.match.params.id);
    let { genres } = this.state.data;

    this.setState({
      data: {
        _id,
        title,
        genres,
        activeGenre: genre.name,
        numberInStock,
        rate: dailyRentalRate,
      },
    });
  }

  doSubmit = async () => {
    let { _id, title, activeGenre, numberInStock, rate } = this.state.data;
    let { history } = this.props;
    activeGenre = await getGenres().find((g) => g.name === activeGenre);

    await saveMovie({
      _id,
      title,
      genre: activeGenre,
      numberInStock,
      dailyRentalRate: rate,
    });

    history.push("/movies");
  };

  render() {
    let { genres, activeGenre } = this.state.data;

    return (
      <div>
        <h1>Movie Form</h1>
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
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
