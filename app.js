const getSearchValue = () => {
    const searchValue = document.getElementById('search-value').value;
    return searchValue;
}


//handle search button
const handleSearch = async() => {
    const searchValue = getSearchValue().trim();
    const res = await fetch(`https://api.lyrics.ovh/suggest/${searchValue}`);
    const data = await res.json();
    showSongs(data.data);
}


//show songs list
const showSongs = (songs) => {
    songs.forEach(song => {
        console.log(song)
        const newSong = document.createElement('div');
        newSong.classList.add('single-result', 'row', 'align-items-center', 'my-3', 'py-3');
        newSong.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.album.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio src=${song.preview} controls></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        `;

        document.getElementById('songs-parent-div').appendChild(newSong);
    });
}