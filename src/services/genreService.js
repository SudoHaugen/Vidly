const axios = require('axios').default;

export async function getGenres() {
    let genreList = await axios.get('http://localhost:3900/api/genres');

    if (genreList.status === 200) {
        return genreList.data;
    } else {
        console.log(genreList);
        return null;
    }
}