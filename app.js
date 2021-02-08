const getSearchValue = () => {
    const searchValue = document.getElementById('search-value').value;
    return searchValue;
}


//handle search button
const handleSearch = async () => {
   try {
        const searchValue = getSearchValue().trim();
        const res = await fetch(`https://api.lyrics.ovh/suggest/${searchValue}`);
        const data = await res.json();
        showSongs(data.data);
   }
   catch(error) {
       displayError();
   }
}


//show songs list
const showSongs = (songs) => {
    document.getElementById('songs-parent-div').innerHTML = ``;
    document.getElementById('lyrics-place').innerText = '';
    document.getElementById('search-value').value = '';

    songs.forEach(song => {
        const newSong = document.createElement('div');
        newSong.classList.add('single-result', 'row', 'align-items-center', 'my-3', 'py-3');
        newSong.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio src=${song.preview} controls></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;

        document.getElementById('songs-parent-div').appendChild(newSong);
    });
}


//show lyrics 
const getLyrics = async (artistName, songTitle) => {
    try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch(error){
        displayError()
    }
    
}


//display lyrics
const displayLyrics = (lyrics) => {
    document.getElementById('lyrics-place').innerText = lyrics;
}


//display error 
const displayError = (error) => {
    document.getElementById('error').classList.add('text-white', 'text-center')
    document.getElementById("error").innerText = "Songs not found";
}