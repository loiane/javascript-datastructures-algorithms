class MediaPlayerSong {
  constructor(songTitle) {
    this.songTitle = songTitle;
    this.previous = null;
    this.next = null;
  }
}

class MediaPlayer {
  #firstSong;
  #lastSong;
  #size = 0;
  #playingSong;

  addSongByTitle(newSongTitle) {
    const newSong = new MediaPlayerSong(newSongTitle);
    if (this.#size === 0) { // empty list
      this.#insertEmptyPlayList(newSong);
    } else {
      const position = this.#findIndexOfSortedSong(newSongTitle);
      if (position === 0) { // insert at the beginning
        this.#insertAtBeginning(newSong);
      } else if (position === this.#size) { // insert at the end
        this.#insertAtEnd(newSong);
      } else { // insert in the middle
        this.#insertInMiddle(newSong, position);
      }
    }
    this.#size++;
  }

  #insertEmptyPlayList(newSong) {
    this.#firstSong = newSong;
    this.#lastSong = newSong;
    newSong.next = newSong; // points to itself
    newSong.previous = newSong; // points to itself
  }

  #insertAtBeginning(newSong) {
    newSong.next = this.#firstSong;
    newSong.previous = this.#lastSong;
    this.#firstSong.previous = newSong;
    this.#lastSong.next = newSong;
    this.#firstSong = newSong;
  }

  #insertAtEnd(newSong) {
    newSong.next = this.#firstSong;
    newSong.previous = this.#lastSong;
    this.#lastSong.next = newSong;
    this.#firstSong.previous = newSong;
    this.#lastSong = newSong;
  }

  #insertInMiddle(newSong, position) {
    let currentSong = this.#firstSong;
    for (let i = 0; i < position - 1; i++) {
      currentSong = currentSong.next;
    }
    newSong.next = currentSong.next;
    newSong.previous = currentSong;
    currentSong.next.previous = newSong;
    currentSong.next = newSong;
  }

  #findIndexOfSortedSong(newSongTitle) {
    let currentSong = this.#firstSong;
    let i = 0;
    for (; i < this.#size && currentSong; i++) {
      const currentSongTitle = currentSong.songTitle;
      if (this.#compareSongs(currentSongTitle, newSongTitle) >= 0) {
        return i;
      }
      currentSong = currentSong.next;
    }
    return 0;
  }

  #compareSongs(songTitle1, songTitle2) {
    return songTitle1.localeCompare(songTitle2);
  }

  play() {
    if (this.#size === 0) {
      return null;
    }
    this.#playingSong = this.#firstSong;
    return this.#playingSong.songTitle;
  }

  next() {
    if (this.#size === 0) {
      return null;
    }
    if (!this.#playingSong) {
      return this.play();
    }
    this.#playingSong = this.#playingSong.next;
    return this.#playingSong.songTitle;
  }

  previous() {
    if (this.#size === 0) {
      return null;
    }
    if (!this.#playingSong) {
      return this.play();
    }
    this.#playingSong = this.#playingSong.previous;
    return this.#playingSong.songTitle;
  }

  showPlaylist() {
    let currentSong = this.#firstSong;
    let result = '';
    for (let i = 0; i < this.#size - 1; i++) {
      result += currentSong.songTitle + ' -> ';
      currentSong = currentSong.next;
    }
    result += currentSong.songTitle;
    return result;
  }
}

const mediaPlayer = new MediaPlayer();
mediaPlayer.addSongByTitle('The Bard\'s Song');
mediaPlayer.addSongByTitle('Florida!!!');
mediaPlayer.addSongByTitle('Run to the Hills');
mediaPlayer.addSongByTitle('Nothing Else Matters');

console.log('Playing:', mediaPlayer.play()); // Florida!!!
console.log('Next:', mediaPlayer.next()); // Nothing Else Matters
console.log('Next:', mediaPlayer.next()); // Run to the Hills
console.log('Next:', mediaPlayer.next()); // The Bard's Song
console.log('Next:', mediaPlayer.next()); // Florida!!!
console.log('Previous:', mediaPlayer.previous()); // The Bard's Song
console.log('Previous:', mediaPlayer.previous()); // Run to the Hills
console.log('Previous:', mediaPlayer.previous()); // Nothing Else Matters
console.log('Previous:', mediaPlayer.previous()); // Florida!!!

// to see the output of this file use the command: node src/06-linked-list/media-player.js