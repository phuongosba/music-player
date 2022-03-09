const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const nowPlayingMusic = $('.now-playing h2');
const nowPlayingSinger = $('.now-playing h4');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const shuffleBtn = $('.btn-shuffle');
const repeatBtn = $('.btn-repeat');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const showBtn = $('.playlist-toggle');
const playList = $('.list-songs');
const hideBtn = $('.bx-x');
const progress = $('#progress');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isShuffle: false,
    isRepeat: false,
    songs: [
        {
            name: 'Stay',
            singer: 'The Kid LAROI, Justin Bieber',
            path: './assets/music/song1.mp3',
            image: './assets/img/img1.jpg',
            time: '2:21'
        },
        {
            name: 'Unstoppable',
            singer: 'Sia',
            path: './assets/music/song2.mp3',
            image: './assets/img/img2.jpg',
            time: '3:37'
        },
        {
            name: 'Peaches',
            singer: 'Justin Bieber, Daniel Caesar, Giveon',
            path: './assets/music/song3.mp3',
            image: './assets/img/img3.jpg',
            time: '3:18'
        },
        {
            name: 'Dusk Till Dawn',
            singer: 'Zayn, Sia',
            path: './assets/music/song4.mp3',
            image: './assets/img/img4.jpg',
            time: '3:59'
        },
        {
            name: 'Love Me Like You Do',
            singer: 'Ellie Goulding',
            path: './assets/music/song5.mp3',
            image: './assets/img/img5.jpg',
            time: '4:10'
        },
        {
            name: 'All Falls Down',
            singer: 'Alan Walker, Noah Cyrus, Digital Farm Animals, Jusliander',
            path: './assets/music/song6.mp3',
            image: './assets/img/img6.jpg',
            time: '3:17'
        },
        {
            name: 'That Girl',
            singer: 'Olly Murs',
            path: './assets/music/song7.mp3',
            image: './assets/img/img7.jpg',
            time: '2:56'
        },
        {
            name: 'Salt',
            singer: 'Ava Max',
            path: './assets/music/song8.mp3',
            image: './assets/img/img8.jpg',
            time: '3:00'
        },
        {
            name: 'ComeThru',
            singer: 'Jeremy Zucker',
            path: './assets/music/song9.mp3',
            image: './assets/img/img9.jpg',
            time: '3:01'
        },
        {
            name: 'Light Switch',
            singer: 'Chris Crocker',
            path: './assets/music/song10.mp3',
            image: './assets/img/img10.jpg',
            time: '3:53'
        }
    ],
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    loadCurrentSong: function() {
        nowPlayingMusic.textContent = this.currentSong.name;
        nowPlayingSinger.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                 <div class="thumb"
                     style="background-image: url('${song.image}')">
                 </div>
                 <div class="body">
                     <h3 class="title">${song.name}</h3>
                     <p class="author">${song.singer}</p>
                 </div>
                 <div class="time">
                     <p>${song.time}</p>
                 </div>
             </div>
        `;
        });
        $('.songs').innerHTML = htmls.join('');
    },
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) this.currentIndex = 0;
        this.loadCurrentSong();
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong();
    },
    loadShuffleSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }, 300);
    },
    handleEvent: function() {
        const _this = this;
        

        /*===== SHOW/HIDE PLAYLIST =====*/ 
        showBtn.addEventListener('click', () =>{
            playList.classList.add('show');
        });
        
        hideBtn.addEventListener('click', () =>{
            playList.classList.remove('show');
        });

        
        /*===== UPDATE TIME =====*/
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime*100 / audio.duration);
                progress.value = progressPercent;
            }
        }

        /*===== CLICK PLAY =====*/
        playBtn.onclick = function() {
            if(_this.isPlaying) audio.pause();
            else audio.play();
        }

        /*===== ON PLAY =====*/
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdAnimate.play();
        }

        /*===== ON PAUSE =====*/
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdAnimate.pause();
        }

        /*===== SPINNING CD =====*/
        const cdAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        });

        cdAnimate.pause();

        /*===== SHUFFLE SONGS =====*/
        shuffleBtn.onclick = function() {
            _this.isShuffle = !_this.isShuffle;
            shuffleBtn.classList.toggle('active', _this.isShuffle);
            if($('.control .btn-repeat.active')) {
                repeatBtn.classList.remove('active');
                _this.isRepeat = !_this.isRepeat;
            }
        }

        /*===== REPEAT SONG =====*/
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
            if($('.control .btn-shuffle.active')) {
                shuffleBtn.classList.remove('active');
                _this.isShuffle = !_this.isShuffle;
            }
        }

        /*===== NEXT SONG =====*/
        nextBtn.onclick = function() {
            if(_this.isShuffle) _this.loadShuffleSong();
            else _this.nextSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        /*===== PRE SONG =====*/
        prevBtn.onclick = function() {
            if(_this.isShuffle) _this.loadShuffleSong();
            else _this.prevSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        /*===== ON END =====*/
        audio.onended = function() {
            if(_this.isRepeat) audio.play();
            else nextBtn.click();
        }
        
        /*===== CLICK SONG IN PLAYLIST =====*/
        playList.onclick = function(event) {
            const songNode = event.target.closest('.song:not(.active)');
            if (songNode) {
               _this.currentIndex = Number(songNode.getAttribute('data-index'));    // or songNode.dataset.index;
               _this.loadCurrentSong();
               _this.render();
               audio.play();
            }
        }

        /*===== REWIND SONG =====*/
        progress.oninput = function(event) {
            const newTime = audio.duration * event.target.value / 100;
            audio.currentTime = newTime;
        }

    },
    start: function() {
        this.render();
        this.defineProperties();
        this.loadCurrentSong();
        this.handleEvent();
    }
}

app.start();