var AliHub;
(function (AliHub) {
    var Media;
    (function (Media) {
        var PianoSingleton = (function () {
            function PianoSingleton() {
                this.musicBlobArray = [];
                this.notes = [
                    { name: 'C', y: 0, size: 9194, blob: null, src: '#C_note' },
                    { name: 'C_sharp', y: 0, size: 9194, blob: null, src: '#C_sharp_note' },
                    { name: 'D', y: 2.5, size: 8358, blob: null, src: '#B_note' },
                    { name: 'D_sharp', y: 2, size: 8358, blob: null, src: '#A_sharp_note' },
                    { name: 'E', y: 2, size: 8776, blob: null, src: '#B_note' },
                    { name: 'F', y: 1.5, size: 7940, blob: null, src: '#B_note' },
                    { name: 'F_sharp', y: 1, size: 8358, blob: null, src: '#A_sharp_note' },
                    { name: 'G', y: 1, size: 8358, blob: null, src: '#B_note' },
                    { name: 'G_sharp', y: 0.5, size: 7940, blob: null, src: '#A_sharp_note' },
                    { name: 'A', y: 0.5, size: 7522, blob: null, src: '#B_note' },
                    { name: 'A_sharp', y: 0, size: 7940, blob: null, src: '#A_sharp_note' },
                    { name: 'B', y: 0, size: 8358, blob: null, src: '#B_note' },
                    { name: 'C2', y: -0.5, size: 7940, blob: null, src: '#B_note' },
                    { name: 'C2_sharp', y: -1, size: 7940, blob: null, src: '#A_sharp_note' },
                    { name: 'D2', y: -1, size: 7940, blob: null, src: '#B_note' },
                    { name: 'D2_sharp', y: -1.5, size: 8358, blob: null, src: '#A_sharp_note' },
                    { name: 'E2', y: -1.5, size: 8358, blob: null, src: '#B_note' },
                    { name: 'F2', y: -2, size: 7940, blob: null, src: '#B_note' },
                    { name: 'F2_sharp', y: -2.5, size: 7940, blob: null, src: '#A_sharp_note' },
                    { name: 'G2', y: -2.5, size: 7940, blob: null, src: '#B_note' },
                    { name: 'G2_sharp', y: -3, size: 6686, blob: null, src: '#A_sharp_note' },
                    { name: 'A2', y: -3, size: 6268, blob: null, src: '#B_note' },
                    { name: 'A2_sharp', y: -3.5, size: 6268, blob: null, src: '#A_sharp_note' },
                    { name: 'B2', y: -3.5, size: 7104, blob: null, src: '#B_note' }
                ];
                this.position = 0;
                this.yOffset = 0;
                this.blobConstSupport = false;
                this.dirty = true;
                this.addEvents();
                this.init();
            }
            PianoSingleton.prototype.getChildElement = function (id) {
                return document.getElementById(id);
            };
            PianoSingleton.prototype.getMusicBlob = function () {
                var blob;
                if (this.blobConstSupport) {
                    blob = new Blob(this.musicBlobArray, {
                        type: 'audio/mpeg'
                    });
                }
                else {
                    var bb = new window.BlobBuilder();
                    for (var i = 0; i < this.musicBlobArray.length; i++) {
                        bb.append(this.musicBlobArray[i]);
                    }
                    blob = bb.getBlob('audio/mpeg');
                }
                return blob;
            };
            ;
            PianoSingleton.prototype.getScoreBlob = function () {
                var blob;
                var score = this.getChildElement('score-container').innerHTML;
                if (this.blobConstSupport) {
                    blob = new Blob([score], {
                        type: 'image/svg+xml'
                    });
                }
                else {
                    var bb = new window.BlobBuilder();
                    bb.append(score);
                    blob = bb.getBlob('image/svg+xml');
                }
                return blob;
            };
            ;
            PianoSingleton.prototype.updateFileSizes = function () {
                if (this.blobConstSupport || window.BlobBuilder) {
                    this.getChildElement('music-blob-size').innerHTML = this.getMusicBlob().size;
                    this.getChildElement('score-blob-size').innerHTML = this.getScoreBlob().size;
                }
            };
            ;
            PianoSingleton.prototype.playNotes = function () {
                if (!this.getChildElement('song-audio').canPlayType('audio/mp3')) {
                    /* eslint-disable no-alert */
                    window.alert('MP3 audio isn\'t available in this browser, \ntry upgrading to a modern browser.');
                    /* eslint-enable no-alert */
                    return;
                }
                var musicBlob = this.getMusicBlob();
                if (musicBlob.size === 0) {
                    /* eslint-disable no-alert */
                    window.alert('No music file available.');
                    /* eslint-enable no-alert */
                    return;
                }
                if (this.dirty) {
                    this.dirty = false;
                    var audio = this.getChildElement('song-audio');
                    audio.src = window.URL.createObjectURL(musicBlob);
                    audio.play();
                }
                else {
                    this.getChildElement('song-audio').play();
                }
            };
            PianoSingleton.prototype.saveSong = function () {
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(this.getMusicBlob(), 'PianoSonG.mp3');
                } else {
                    /* eslint-disable no-alert */
                    // window.alert('Sorry this function doesn\'t work in your browser.\nTry upgrading to a modern browser.');
                }
            };
            PianoSingleton.prototype.saveSheetMusic = function () {
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(this.getScoreBlob(), 'MusicScore.svg');
                } else {
                    /* eslint-disable no-alert */
                    // window.alert('Sorry this function doesn\'t work in your browser.\nTry upgrading to a modern browser.');
                }
            };
            ;
            PianoSingleton.prototype.getNoteInfo = function (note) {
                if (!!this.notes[note])
                    return this.notes[note];
                var info;
                this.notes.some(function (ele, i, arr) {
                    if (ele.name !== note)
                        return false;
                    info = ele;
                    return true;
                });
                return info;
            };
            PianoSingleton.prototype.getNote = function (note) {
                return this.getNoteInfo(note).blob;
            };
            PianoSingleton.prototype.writeNote = function (note) {
                var data = this.getNoteInfo(note);
                var y = data.y;
                var src = data.src;
                if (note.indexOf('sharp') !== -1) {
                    this.position = this.position + 1;
                }
                var svgNS = 'http://www.w3.org/2000/svg';
                var xlinkNS = 'http://www.w3.org/1999/xlink';
                // if x is to high add a line to the score
                if (this.position > 44) {
                    this.yOffset = this.yOffset + 10;
                    var use = document.createElementNS(svgNS, 'use');
                    use.setAttributeNS(null, 'y', this.yOffset.toString());
                    use.setAttributeNS(xlinkNS, 'xlink:href', '#lines');
                    use.setAttribute('class', 'added');
                    this.getChildElement('scale').appendChild(use);
                    var use2 = document.createElementNS(svgNS, 'use');
                    use2.setAttributeNS(null, 'y', this.yOffset.toString());
                    use2.setAttributeNS(xlinkNS, 'xlink:href', '#final_line_end');
                    use2.setAttribute('class', 'lineEnd added');
                    this.getChildElement('scale').appendChild(use2);
                    this.getChildElement('scale').viewBox.baseVal.height += 10;
                    this.position = 0;
                    if (this.yOffset === 10) {
                        this.getChildElement('score-container').style.height = '320px';
                    }
                    else if (this.yOffset > 11) {
                        this.getChildElement('score-container').style.height = '450px';
                        this.getChildElement('scale').style.height = '1000px';
                        this.getChildElement('score-container').style.overflowY = 'scroll';
                        this.getChildElement('score-container').scrollTop = this.getChildElement('score-container').scrollHeight;
                    }
                    var lineEnds = document.getElementsByClassName('line-end');
                    if (lineEnds.length - 2 >= 0) {
                        lineEnds[lineEnds.length - 2].setAttributeNS(xlinkNS, 'xlink:href', '#regular_line_end');
                    }
                }
                // create the use element for the svg musical scale.
                var use = document.createElementNS(svgNS, 'use');
                use.setAttributeNS(null, 'x', this.position.toString());
                use.setAttributeNS(null, 'y', (y + this.yOffset).toString());
                use.setAttributeNS(xlinkNS, 'xlink:href', src);
                use.setAttribute('class', 'added');
                this.getChildElement('scale').appendChild(use);
                this.position = this.position + 2;
            };
            PianoSingleton.prototype.addNote = function (n, silent) {
                if ((n.key) && !((n.key === 'Spacebar') || (n.key === 'Enter'))) {
                    return;
                }
                var note = n;
                if (!silent) {
                    note = n.target.id;
                    if (note === '') {
                        note = n.target.parentNode.id;
                    }
                }
                // add the note to the stored list and play the sound
                var z = this.getNote(note);
                if (z) {
                    this.musicBlobArray.push(z);
                }
                var audio = document.getElementById(note + '_audio');
                if (audio && !silent) {
                    if (audio.canPlayType('audio/mp3')) {
                        audio.pause();
                        try {
                            audio.currentTime = 0;
                        }
                        catch (e) {
                        }
                        audio.play();
                    }
                    else {
                        this.getChildElement('audio-warning').style.display = 'block';
                    }
                }
                // draw note on the svg scale
                this.writeNote(note);
                if (!silent) {
                    this.updateFileSizes();
                }
                this.dirty = true;
            };
            PianoSingleton.prototype.addBlobNote = function (id, src) {
                var audioContainer = this.getChildElement('audio-container');
                var audioElt = document.createElement('audio');
                audioElt.controls = true;
                audioElt.src = src;
                audioElt.id = id;
                audioContainer.appendChild(audioElt);
            };
            PianoSingleton.prototype.getBlobs = function () {
                var _this = this;
                var req = new XMLHttpRequest();
                var url = PianoSingleton.allnotesUrl || 'allnotes.mp3';
                var data = {};
                req.open('GET', url);
                req.responseType = 'blob';
                req.onload = function () {
                    var j = 0;
                    var audio = req.response;
                    for (var i = 0; i < _this.notes.length; i++) {
                        var note = _this.notes[i];
                        var id = note.name + '_audio';
                        var src = '';
                        if (audio && (audio.size === 190978)) {
                            //slice the file
                            var endSlice = j + note.size;
                            var blob = null;
                            if (audio.slice) {
                                blob = audio.slice(j, endSlice, audio.type);
                            }
                            j = endSlice;
                            note.blob = blob;
                            if (window.URL) {
                                src = window.URL.createObjectURL(blob);
                            }
                            else {
                                if (window.webkitURL) {
                                    src = window.webkitURL.createObjectURL(blob);
                                }
                            }
                        }
                        else {
                            //audio didn't download as a blob
                            //var x = [notes[i], null];
                            //noteBlobs[i] = x;
                            src = 'pianonotes/' + _this.notes[i].name + '.mp3';
                            _this.getChildElement('xhrBlobWarning').style.display = 'block';
                        }
                        data[note.name] = note;
                        _this.addBlobNote(id, src);
                    }
                    _this.notes = data;
                };
                req.send(null);
            };
            ;
            PianoSingleton.prototype.reset = function () {
                var added = document.querySelectorAll('.added');
                var scale = this.getChildElement('scale');
                for (var i = 0; i < added.length; i++) {
                    scale.removeChild(added[i]);
                }
                this.musicBlobArray = [];
                this.position = 0;
                this.yOffset = 0;
                this.dirty = true;
                scale.viewBox.baseVal.height = 8;
                this.updateFileSizes();
                var xlinkNS = 'http://www.w3.org/1999/xlink';
                document.querySelector('.line-end').setAttributeNS(xlinkNS, 'xlink:href', '#final_line_end');
                this.getChildElement('score-container').style.height = '';
                this.getChildElement('scale').style.height = '';
                this.getChildElement('score-container').style.overflowY = '';
            };
            PianoSingleton.prototype.setSong = function (val) {
                if (val === 'orig') {
                    return;
                }
                this.reset();
                var song = val.split(',');
                for (var i = 0; i < song.length; i++) {
                    this.addNote(song[i], true);
                }
                this.getChildElement('score-container').style.height = '450px';
                this.updateFileSizes();
            };
            ;
            PianoSingleton.prototype.addEvents = function () {
                var _this = this;
                this.getChildElement('save-song').addEventListener('click', function (ev) { _this.saveSong(); }, false);
                this.getChildElement('save-sheet').addEventListener('click', function (ev) { _this.saveSheetMusic(); }, false);
                this.getChildElement('reset').addEventListener('click', function (ev) { _this.reset(); }, false);
                this.getChildElement('play-button').addEventListener('click', function (ev) { _this.playNotes(); }, false);
                this.getChildElement('pause-button').addEventListener('click', function (ev) {
                    _this.getChildElement('song-audio').pause();
                }, false);
                var songAudio = this.getChildElement('song-audio');
                songAudio.addEventListener('play', function () {
                    _this.getChildElement('play-button').style.display = 'none';
                    _this.getChildElement('pause-button').style.display = 'block';
                }, false);
                songAudio.addEventListener('pause', function () {
                    _this.getChildElement('play-button').style.display = 'block';
                    _this.getChildElement('pause-button').style.display = 'none';
                }, false);
                songAudio.addEventListener('ended', function () {
                    _this.getChildElement('play-button').style.display = 'block';
                    _this.getChildElement('pause-button').style.display = 'none';
                }, false);
                this.getChildElement('song').addEventListener('change', function (evt) {
                    _this.setSong(evt.target.value);
                });
            };
            ;
            PianoSingleton.prototype.init = function () {
                var _this = this;
                try {
                    /* eslint-disable no-unused-vars */
                    var x = new Blob();
                    /* eslint-enable no-unused-vars */
                    this.blobConstSupport = true;
                }
                catch (e) {
                }
                window.URL = window.URL || window.webkitURL;
                window.BlobBuilder = window.BlobBuilder || window.MSBlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
                if (this.blobConstSupport || window.BlobBuilder) {
                    // BlobBuilder is supported
                    this.getBlobs();
                    this.updateFileSizes();
                }
                else {
                    //hide some elements which require Blob Builder
                    var bbReq = document.getElementsByClassName('bb-req');
                    for (var i = 0; i < bbReq.length; i++) {
                        bbReq[i].style.display = 'none';
                    }
                    this.getChildElement('warning').style.display = 'block';
                    //add audio elements with regular source so the sound can play.
                    var audioContainer = this.getChildElement('audio-container');
                    for (var i = 0; i < this.notes.length; i++) {
                        var audio = document.createElement('audio');
                        audio.src = 'pianonotes/' + this.notes[i].name + '.mp3';
                        audio.controls = true;
                        audio.id = this.notes[i].name + '_audio';
                        audioContainer.appendChild(audio);
                    }
                }
                //add event listeners for the Piano Keys
                var keys = document.querySelectorAll('#piano g');
                for (var i = 0; i < keys.length; i++) {
                    if (window.navigator.msPointerEnabled) {
                        keys[i].addEventListener('MSPointerDown', function (ev) { _this.addNote(ev, null); }, false);
                    } else {
                        keys[i].addEventListener('mousedown', function (ev) { _this.addNote(ev, null); }, false);
                    }
                    keys[i].addEventListener('keydown', function (ev) { _this.addNote(ev, null); }, false);
                }
            };
            ;
            return PianoSingleton;
        }());
        Media.PianoSingleton = PianoSingleton;
    })(Media = AliHub.Media || (AliHub.Media = {}));
})(AliHub || (AliHub = {}));
//# sourceMappingURL=index.js.map