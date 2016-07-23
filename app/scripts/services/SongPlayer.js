(function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {}; 
         
         var currentAlbum = Fixtures.getAlbum();
         
         /**
         *@function getSongIndex
         *@desc Retrive index of song
         *@param {Object} song
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
         
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null; 
         
         /**
         * @function playSong
         * @desc Plays song object
         * @param {Object} song
         */
         var playSong = function(song){ 
            currentBuzzObject.play();
            song.playing = true
         } 
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
         };
         
         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;
         
         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) { 
            song = song || SongPlayer.currentSong;
        
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
         }; 
      
        /**
         * @function pause
         * @desc Pauses current song.
         * @param {Object} song
         */  
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }; 
         
        /** 
        *@function .previous
        *@desc Plays previous song in songs index 
        *@param {Object} song
        */
        
         SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--; 
        
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
 

        return SongPlayer; 
    }

    angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();