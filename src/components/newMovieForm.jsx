/**@format */
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import httpService from "../services/httpService";
import config from "../config.json";

class NewMovieForm extends Form {
  state = {
    data: {
      title: "",
      genres: [],
      activeGenre: null,
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

  async componentDidMount() {
    const genres = await httpService.get(config.genresAPI);
    const activeGenre = genres.data[0];

    this.setState({ data: { genres: genres.data, activeGenre } });
  }

  schema = {
    title: Joi.string().required().label("Title"),
    genres: Joi.array().required(),
    activeGenre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    rate: Joi.number().min(0).max(10).required(),
  };

  doSubmit = async () => {
    let { title, activeGenre, numberInStock, rate, genres } = this.state.data;
    let { history } = this.props;
    activeGenre = genres.find((g) => g.name === activeGenre);

    await httpService.post(config.moviesAPI, {
      title,
      genreId: activeGenre._id,
      numberInStock,
      dailyRentalRate: rate,
    });

    history.push("/movies");
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
