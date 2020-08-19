(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.init()",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  {
   "propagateClick": false,
   "children": [
    "this.Container_5645B517_5EBA_61DA_41CE_5170204AEC9E"
   ],
   "horizontalAlign": "center",
   "left": "0%",
   "paddingLeft": 0,
   "scrollBarColor": "#000000",
   "paddingRight": 0,
   "borderSize": 0,
   "scrollBarVisible": "rollOver",
   "minHeight": 1,
   "verticalAlign": "middle",
   "scrollBarOpacity": 0.5,
   "bottom": "0%",
   "contentOpaque": false,
   "minWidth": 1,
   "scrollBarMargin": 2,
   "height": 142,
   "width": "100%",
   "gap": 10,
   "layout": "horizontal",
   "paddingTop": 0,
   "shadow": false,
   "paddingBottom": 0,
   "backgroundOpacity": 0,
   "class": "Container",
   "borderRadius": 0,
   "data": {
    "name": "Container44746"
   },
   "overflow": "scroll",
   "scrollBarWidth": 10
  },
  "this.IconButton_10AC0C35_000D_EDAB_40E2_B625CE390640",
  "this.IconButton_10FC4B40_0006_EBE9_4113_035EF7316200",
  "this.Container_F3D3EE1E_FC25_1704_41EC_A796C2AD66BC",
  "this.Container_11469FA3_0003_6AAF_4124_EC189393BE88",
  "this.IconButton_136509EC_0003_56BA_4120_04AE34C508B0",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scripts": {
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "unregisterKey": function(key){  delete window[key]; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "existsKey": function(key){  return key in window; },
  "getKey": function(key){  return window[key]; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "registerKey": function(key, value){  window[key] = value; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); }
 },
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "gap": 10,
 "layout": "absolute",
 "height": "100%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "Player",
 "borderRadius": 0,
 "data": {
  "name": "Player43899"
 },
 "overflow": "visible",
 "definitions": [{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D10 Bangabandhu Library",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_t.jpg",
 "partial": false,
 "id": "panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -179.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17BF6085_0187_459C_4175_00F3B06547E1"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 0.15,
   "yaw": -45.29,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524"
  }
 ],
 "hfov": 360,
 "id": "panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53",
 "thumbnailUrl": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_t.jpg",
 "label": "D00 Garden",
 "pitch": 0,
 "partial": false,
 "hfovMin": "150%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_25A61788_003D_5B79_4147_5A9A26DE0160",
  "this.overlay_10660249_0184_C494_4174_292F70B044BF",
  "this.overlay_13D3CB54_0184_C4BC_4178_71BE21913D20",
  "this.popup_12012729_019C_CC94_4171_A44AE9501AC7"
 ]
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 103.3,
   "yaw": 171.22,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5"
  },
  {
   "backwardYaw": -45.29,
   "yaw": 0.15,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53"
  }
 ],
 "hfov": 360,
 "id": "panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524",
 "thumbnailUrl": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_t.jpg",
 "label": "D01 Entry1",
 "pitch": 0,
 "partial": false,
 "hfovMin": "135%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_28CBD760_000D_7BA9_4166_620D3B00A258",
  "this.overlay_32557257_0003_D597_4147_C719AD6E98F8",
  "this.overlay_412D82B6_0007_7A96_4170_A8C23F9756F9",
  "this.popup_3C6F5E43_0005_2DEE_4174_6642D270135A"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -9.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17ADA09C_0187_45AC_4162_C6E423A88869"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D13 Living Room (Second Floor)",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_t.jpg",
 "partial": false,
 "id": "panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": 171.22,
   "yaw": 103.3,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524"
  },
  {
   "backwardYaw": 170.15,
   "yaw": -12.25,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A"
  }
 ],
 "hfov": 360,
 "id": "panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5",
 "thumbnailUrl": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_t.jpg",
 "label": "D02 Outside Stairs",
 "pitch": 0,
 "partial": false,
 "hfovMin": "135%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_30FD0E20_0002_EDAA_415B_8959BD87CE30",
  "this.overlay_338698C5_0003_36EB_4159_FE591B84EA28"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_camera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D09 Living Room (Ground Floor)",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_t.jpg",
 "partial": false,
 "id": "panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D07 Corridor Passage (2nd Shot)",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_t.jpg",
 "partial": false,
 "id": "panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D11 Balcony",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_t.jpg",
 "partial": false,
 "id": "panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_camera"
},
{
 "duration": 200,
 "id": "effect_1976795F_001D_3797_415A_5CCAA1B429B1",
 "class": "FadeOutEffect",
 "easing": "linear"
},
{
 "id": "ImageResource_17E0AB12_019F_44B4_416F_4C7CBCF2A694",
 "class": "ImageResource",
 "levels": [
  {
   "url": "media/popup_12012729_019C_CC94_4171_A44AE9501AC7_0_0.png",
   "width": 12500,
   "class": "ImageResourceLevel",
   "height": 6250
  },
  {
   "url": "media/popup_12012729_019C_CC94_4171_A44AE9501AC7_0_1.png",
   "width": 8192,
   "class": "ImageResourceLevel",
   "height": 4096
  },
  {
   "url": "media/popup_12012729_019C_CC94_4171_A44AE9501AC7_0_2.png",
   "width": 4096,
   "class": "ImageResourceLevel",
   "height": 2048
  },
  {
   "url": "media/popup_12012729_019C_CC94_4171_A44AE9501AC7_0_3.png",
   "width": 2048,
   "class": "ImageResourceLevel",
   "height": 1024
  },
  {
   "url": "media/popup_12012729_019C_CC94_4171_A44AE9501AC7_0_4.png",
   "width": 1024,
   "class": "ImageResourceLevel",
   "height": 512
  },
  {
   "url": "media/popup_12012729_019C_CC94_4171_A44AE9501AC7_0_5.png",
   "width": 512,
   "class": "ImageResourceLevel",
   "height": 256
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -8.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17A40090_0187_45B4_4167_6A984591A764"
},
{
 "items": [
  {
   "media": "this.panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F753536D_FC25_2D05_41D1_FBE6887ED1DD_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F75327C7_FC25_3504_41EE_F09E39A83F26",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE",
   "camera": "this.panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D06 Corridor Passage",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_t.jpg",
 "partial": false,
 "id": "panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D14 Sheikh Rehana's Room",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_t.jpg",
 "partial": false,
 "id": "panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 167.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17FAF0CA_0187_4594_412C_92783BB80508"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 134.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17CF60BF_0187_45EC_4175_380ED4FB256A"
},
{
 "duration": 200,
 "id": "effect_19290169_001D_37BA_4157_7FE9BC5B3C0D",
 "class": "FadeOutEffect",
 "easing": "linear"
},
{
 "autoplay": true,
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_1294F843_0187_4494_416D_2D60A4D5E626.mp3",
  "oggUrl": "media/audio_1294F843_0187_4494_416D_2D60A4D5E626.ogg"
 },
 "id": "audio_1294F843_0187_4494_416D_2D60A4D5E626",
 "data": {
  "label": "Garden"
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F753F731_FC25_351D_41E3_5AA0E318FE4D_camera"
},
{
 "touchControlMode": "drag_rotation",
 "buttonRestart": "this.IconButton_5645B517_5EBA_61DA_41D4_85AB00D87A76",
 "buttonMoveRight": "this.IconButton_5645B517_5EBA_61DA_41BA_A43ED1B1FB40",
 "displayPlaybackBar": true,
 "buttonZoomOut": "this.IconButton_5645B517_5EBA_61DA_41D3_52532616D552",
 "buttonPlayPause": "this.IconButton_5645B517_5EBA_61DA_41CB_7C4DBBC2A8E5",
 "class": "PanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonPlayRight": "this.IconButton_5645B517_5EBA_61DA_41C5_1BC8156F8BCF",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "buttonPlayLeft": "this.IconButton_5645B517_5EBA_61DA_41D1_EAD81768A56B",
 "buttonZoomIn": "this.IconButton_5645B517_5EBA_61DA_41D2_D639DF8052CA",
 "buttonMoveUp": "this.IconButton_5645B517_5EBA_61DA_41D6_9282B67C524F",
 "buttonMoveDown": "this.IconButton_5645B517_5EBA_61DA_41D6_E94D03438B44",
 "buttonPause": "this.IconButton_5645B517_5EBA_61DA_41BC_DB59BC8AC3A2",
 "buttonMoveLeft": "this.IconButton_5645B517_5EBA_61DA_41A9_0D8835A41A7C",
 "mouseControlMode": "drag_rotation"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 170.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17D6A0A7_0187_459C_415B_712585354028"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D15 Main Stairs",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_t.jpg",
 "partial": false,
 "id": "panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F753D128_FC25_ED0C_41D7_00A6D2F2C229_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7533904_FC25_1AFB_41E3_8661929E7D2A_camera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D20 Living Room (Third Floor)",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_t.jpg",
 "partial": false,
 "id": "panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7532C5D_FC25_1B04_41E0_60ABAA7C4743_camera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D18 Sheikh Kamal's Room",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_t.jpg",
 "partial": false,
 "id": "panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 130.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_170790EE_0187_456C_416C_FDF708F9FFB7"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -49.67,
   "yaw": 117.89,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A"
  }
 ],
 "hfov": 360,
 "id": "panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1",
 "thumbnailUrl": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_t.jpg",
 "label": "D05 Kitchen",
 "pitch": 0,
 "partial": false,
 "hfovMin": "135%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_3605F9AB_001D_56BF_416C_718E2263CCDA"
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "yaw": -100.63,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 10.42,
 "hideDuration": 500,
 "popupMaxWidth": "95%",
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_3C6F5E43_0005_2DEE_4174_6642D270135A",
 "image": {
  "levels": [
   {
    "url": "media/popup_3C6F5E43_0005_2DEE_4174_6642D270135A_0_0.jpg",
    "width": 1000,
    "class": "ImageResourceLevel",
    "height": 580
   },
   {
    "url": "media/popup_3C6F5E43_0005_2DEE_4174_6642D270135A_0_1.jpg",
    "width": 512,
    "class": "ImageResourceLevel",
    "height": 296
   }
  ],
  "class": "ImageResource"
 },
 "popupDistance": 100,
 "popupMaxHeight": "95%",
 "class": "PopupPanoramaOverlay",
 "pitch": 11.39
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7A7D64E_FC25_1704_41D5_DE63F6A388FF_camera"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "yaw": 84.71,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 6.74,
 "hideDuration": 500,
 "popupMaxWidth": "95%",
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_12012729_019C_CC94_4171_A44AE9501AC7",
 "image": {
  "levels": [
   {
    "url": "media/popup_12012729_019C_CC94_4171_A44AE9501AC7_0_4.png",
    "width": 1024,
    "class": "ImageResourceLevel",
    "height": 512
   }
  ],
  "class": "ImageResource"
 },
 "popupDistance": 100,
 "popupMaxHeight": "95%",
 "class": "PopupPanoramaOverlay",
 "pitch": -11.26
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D21 Roof",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE_t.jpg",
 "partial": false,
 "id": "panorama_F7ACFD6F_FC25_1504_41EB_CD3417B0D3FE",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D12 Bangabandhu Room",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_t.jpg",
 "partial": false,
 "id": "panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7",
   "class": "AdjacentPanorama"
  },
  {
   "backwardYaw": -12.25,
   "yaw": 170.15,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5"
  },
  {
   "backwardYaw": -71.25,
   "yaw": -9.73,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF"
  },
  {
   "backwardYaw": 117.89,
   "yaw": -49.67,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1"
  }
 ],
 "hfov": 360,
 "id": "panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A",
 "thumbnailUrl": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_t.jpg",
 "label": "D03 Kitchen Outside",
 "pitch": 0,
 "partial": false,
 "hfovMin": "135%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_339ECC15_007F_2D6A_4152_ECE4A2836754",
  "this.overlay_3265899E_007F_7699_4152_C3BE3F8348AB",
  "this.overlay_35D561C5_007E_D6EB_4161_8679F65E5776",
  "this.overlay_3486A86C_007D_35B9_4164_9AEAEF3BCAD6",
  "this.overlay_335A1FB5_007D_6AAB_4150_9F51787A27BA",
  "this.overlay_0F135346_017D_449C_4174_71C9663A3ECF"
 ]
},
{
 "duration": 200,
 "id": "effect_1BF87206_0003_3576_4145_93CDEB841FA0",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D08 Corridor Passage (3rd Shot)",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_t.jpg",
 "partial": false,
 "id": "panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -76.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17C0E0B3_0187_45F4_4155_4F8936C85F00"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7A25264_FC25_2F3B_41EC_393942E5C22D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7BDA618_FC25_F70C_41D5_2E58FCA8AC99_camera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D19 Bangabandhu Office",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F75327C7_FC25_3504_41EE_F09E39A83F26_t.jpg",
 "partial": false,
 "id": "panorama_F75327C7_FC25_3504_41EE_F09E39A83F26",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7B9FBEA_FC25_1D0F_41C5_E7D2502237CA_camera"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D16 Sheikh Jamal's Room",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_t.jpg",
 "partial": false,
 "id": "panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "duration": 200,
 "id": "effect_19A77B26_0003_2BB6_4168_98A126499016",
 "class": "FadeInEffect",
 "easing": "linear"
},
{
 "duration": 200,
 "id": "effect_19F6C76E_001F_FBB6_4136_E4AEE480B7D0",
 "class": "FadeOutEffect",
 "easing": "linear"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7A3BE3A_FC25_370F_41C7_0FB475724FE7_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7A2CD05_FC25_1507_41D5_1A69A99E8889_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7A2B1A9_FC25_2D0C_41CF_7E7251A112C3_camera"
},
{
 "adjacentPanoramas": [
  {
   "backwardYaw": -9.73,
   "yaw": -71.25,
   "class": "AdjacentPanorama",
   "distance": 1,
   "panorama": "this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A"
  }
 ],
 "hfov": 360,
 "id": "panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF",
 "thumbnailUrl": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_t.jpg",
 "label": "D04 Pigeon Nest",
 "pitch": 0,
 "partial": false,
 "hfovMin": "135%",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_t.jpg"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_374717EC_001F_DAB9_416F_D39F0B3ED3A8"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7A3E73D_FC25_7504_41EB_F4C5BBF5FBB6_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -62.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_171810E2_0187_4594_4170_6984CB4C6A8A"
},
{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "D17 Second Floor Entry",
 "class": "Panorama",
 "thumbnailUrl": "media/panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C_t.jpg",
 "partial": false,
 "id": "panorama_F753627E_FC25_6F07_41C1_3729E6BAA79C",
 "pitch": 0,
 "hfovMin": "135%"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 108.75,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "camera_17EB10D5_0187_45BC_4174_6C4A8C699B4C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ]
 },
 "id": "panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_camera"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 10,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#AAAAAA",
 "progressBarBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "progressBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "width": "100%",
 "minHeight": 50,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 20,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 4,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 4,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "class": "ViewerArea",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 10,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 2,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 10,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 20,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#AAAAAA",
 "progressBorderSize": 2,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 4,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadHeight": 30,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_5645B517_5EBA_61DA_41D3_52532616D552",
  "this.IconButton_5645B517_5EBA_61DA_41D4_85AB00D87A76",
  "this.IconButton_5645B517_5EBA_61DA_41D1_EAD81768A56B",
  "this.IconButton_5645B517_5EBA_61DA_41A9_0D8835A41A7C",
  "this.Container_5645B517_5EBA_61DA_41AF_FC7FEB37EBCD",
  "this.IconButton_5645B517_5EBA_61DA_41BA_A43ED1B1FB40",
  "this.IconButton_5645B517_5EBA_61DA_41C5_1BC8156F8BCF",
  "this.IconButton_5645B517_5EBA_61DA_41CB_7C4DBBC2A8E5",
  "this.IconButton_5645B517_5EBA_61DA_41D2_D639DF8052CA"
 ],
 "id": "Container_5645B517_5EBA_61DA_41CE_5170204AEC9E",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 360,
 "minHeight": 20,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 360,
 "height": "96.479%",
 "gap": 4,
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "data": {
  "name": "Container31983"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 45,
 "propagateClick": false,
 "id": "IconButton_10AC0C35_000D_EDAB_40E2_B625CE390640",
 "paddingRight": 0,
 "right": "0.6%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_10AC0C35_000D_EDAB_40E2_B625CE390640.jpg",
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_F3D3EE1E_FC25_1704_41EC_A796C2AD66BC, false, 0, this.effect_1976795F_001D_3797_415A_5CCAA1B429B1, 'hideEffect', false); this.setComponentVisibility(this.Container_11469FA3_0003_6AAF_4124_EC189393BE88, true, 0, this.effect_19A77B26_0003_2BB6_4168_98A126499016, 'showEffect', false); this.setComponentVisibility(this.IconButton_136509EC_0003_56BA_4120_04AE34C508B0, true, 0, this.effect_19A77B26_0003_2BB6_4168_98A126499016, 'showEffect', false)",
 "height": "2.295%",
 "width": "4.644%",
 "top": "0.51%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "data": {
  "name": "DhanmondiButton"
 },
 "cursor": "hand",
 "maxWidth": 172
},
{
 "transparencyActive": false,
 "maxHeight": 55,
 "propagateClick": false,
 "id": "IconButton_10FC4B40_0006_EBE9_4113_035EF7316200",
 "paddingRight": 0,
 "right": "5.85%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_10FC4B40_0006_EBE9_4113_035EF7316200.PNG",
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_11469FA3_0003_6AAF_4124_EC189393BE88, false, 0, this.effect_19F6C76E_001F_FBB6_4136_E4AEE480B7D0, 'hideEffect', false); this.setComponentVisibility(this.Container_F3D3EE1E_FC25_1704_41EC_A796C2AD66BC, true, 0, this.effect_1BF87206_0003_3576_4145_93CDEB841FA0, 'showEffect', false); this.setComponentVisibility(this.IconButton_136509EC_0003_56BA_4120_04AE34C508B0, true, 0, this.effect_1BF87206_0003_3576_4145_93CDEB841FA0, 'showEffect', false)",
 "height": "2.951%",
 "width": "5.971%",
 "top": "0.22%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "data": {
  "name": "SuhrawardyButton"
 },
 "cursor": "hand",
 "maxWidth": 271
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_F3D3EE1E_FC25_1704_41EC_A796C2AD66BC",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0.6%",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "21.71%",
 "top": "4.04%",
 "gap": 10,
 "layout": "absolute",
 "height": "21.858%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "SuhrawardyMenu"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_11469FA3_0003_6AAF_4124_EC189393BE88",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0.6%",
 "children": [
  "this.IconButton_11A89B1E_001D_2B96_4128_D2E1D2343AB8",
  "this.IconButton_119A84FB_001F_DE9F_4117_9536EB318048",
  "this.IconButton_10ADEC8B_001F_ED7F_4103_625B1E974A30",
  "this.IconButton_1073E2CB_001F_FAFF_4122_C6088C6931DC",
  "this.IconButton_10847BAA_001F_EABE_4123_17EB07554AA0",
  "this.IconButton_107113F3_001F_DAAF_4113_2793BB1D8D80",
  "this.IconButton_10BBF142_001F_57EE_4112_98AC936646B0",
  "this.IconButton_10846F12_001F_6B6E_411D_1E493DACC8C0",
  "this.IconButton_107016C2_001F_7AEE_4124_BB37FAFAA178",
  "this.IconButton_1071FF22_001F_6BAE_40D1_EB1BE8C1F700",
  "this.IconButton_1070756B_001F_5FBE_412B_6F1E4FF448D4",
  "this.IconButton_1087CB9A_001F_2A9E_4104_E5240D306B00",
  "this.IconButton_108EC52A_001F_3FB9_412C_076EDEA2A8B0",
  "this.IconButton_10A1F8AA_001E_D6B9_4121_9D9895245890",
  "this.IconButton_109246F9_001E_FA9A_4113_9B85ED785998",
  "this.IconButton_10700D1B_001E_EF9F_4121_FCC22FBA556C",
  "this.IconButton_10718322_001E_DBA9_4114_0B018FBFE9A0",
  "this.IconButton_108608EA_001E_D6B9_4129_DA26B302B778",
  "this.IconButton_10708E82_001D_2D69_412B_DF58578AEBA0",
  "this.IconButton_1070E563_001D_3FAF_40FD_088DD57FDAA0",
  "this.IconButton_11A9A924_0003_57A9_40D0_6201A6958C00",
  "this.IconButton_10C472C1_0003_3AEB_412E_CE5F5B1B7198"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "horizontalAlign": "left",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "21.713%",
 "top": "4.04%",
 "gap": 10,
 "layout": "absolute",
 "height": "21.858%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "data": {
  "name": "DhanmondiMenu"
 },
 "overflow": "scroll"
},
{
 "transparencyActive": false,
 "maxHeight": 512,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_136509EC_0003_56BA_4120_04AE34C508B0",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "1%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Cancel",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_136509EC_0003_56BA_4120_04AE34C508B0.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_F3D3EE1E_FC25_1704_41EC_A796C2AD66BC, false, 0, this.effect_19290169_001D_37BA_4157_7FE9BC5B3C0D, 'hideEffect', false); this.setComponentVisibility(this.Container_11469FA3_0003_6AAF_4124_EC189393BE88, false, 0, this.effect_19290169_001D_37BA_4157_7FE9BC5B3C0D, 'hideEffect', false); this.setComponentVisibility(this.IconButton_136509EC_0003_56BA_4120_04AE34C508B0, false, 0, this.effect_19290169_001D_37BA_4157_7FE9BC5B3C0D, 'hideEffect', false)",
 "height": "3.825%",
 "width": "1.87%",
 "top": "5%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "CancelButton"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 488,
 "toolTipTextShadowOpacity": 0
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "bottom": 0,
 "minWidth": 0,
 "backgroundColor": [
  "#000000"
 ],
 "top": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.55,
 "class": "UIComponent",
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "UIComponent9279"
 }
},
{
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "bottom": 0,
 "minWidth": 0,
 "backgroundColor": [],
 "top": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "class": "ZoomImage",
 "borderRadius": 0,
 "visible": false,
 "scaleMode": "custom",
 "data": {
  "name": "ZoomImage9280"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "CloseButton9281"
 },
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "propagateClick": false,
 "paddingLeft": 5,
 "paddingRight": 5,
 "fontFamily": "Arial",
 "right": 10,
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "iconHeight": 20,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "iconColor": "#000000",
 "minWidth": 0,
 "iconLineWidth": 5,
 "mode": "push",
 "fontSize": "1.29vmin",
 "label": "",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowBlurRadius": 6,
 "top": 10,
 "gap": 5,
 "layout": "horizontal",
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "paddingTop": 5,
 "shadow": false,
 "paddingBottom": 5,
 "backgroundOpacity": 0.3,
 "class": "CloseButton",
 "borderRadius": 0,
 "visible": false,
 "iconBeforeLabel": true,
 "iconWidth": 20,
 "cursor": "hand",
 "fontWeight": "normal"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0_HS_0_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.95,
   "yaw": -45.29
  }
 ],
 "id": "overlay_25A61788_003D_5B79_4147_5A9A26DE0160",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524, this.camera_17BF6085_0187_459C_4175_00F3B06547E1); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.84,
   "yaw": -45.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0_HS_0_0_0_map.gif",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0_HS_1_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 30
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.26,
   "yaw": 40.49
  }
 ],
 "id": "overlay_10660249_0184_C494_4174_292F70B044BF",
 "areas": [
  {
   "click": "if(this.getGlobalAudio(this.audio_1294F843_0187_4494_416D_2D60A4D5E626).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_1294F843_0187_4494_416D_2D60A4D5E626); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_1294F843_0187_4494_416D_2D60A4D5E626); }",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.76,
   "yaw": 40.49,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0_HS_1_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Info 02"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.74,
   "image": "this.AnimatedImageResource_17D5DB07_019F_449C_4165_D7FF71F8EF3C",
   "pitch": -11.26,
   "yaw": 84.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_13D3CB54_0184_C4BC_4178_71BE21913D20",
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_12012729_019C_CC94_4171_A44AE9501AC7, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_17E0AB12_019F_44B4_416F_4C7CBCF2A694, null, null, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 6.74,
   "yaw": 84.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0_HS_0_0.png",
      "width": 99,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.14,
   "yaw": 0.15
  }
 ],
 "id": "overlay_28CBD760_000D_7BA9_4166_620D3B00A258",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53, this.camera_17CF60BF_0187_45EC_4175_380ED4FB256A); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.91,
   "yaw": 0.15,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0_HS_1_0.png",
      "width": 99,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.67,
   "yaw": 171.22
  }
 ],
 "id": "overlay_32557257_0003_D597_4147_C719AD6E98F8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5, this.camera_17C0E0B3_0187_45F4_4155_4F8936C85F00); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.84,
   "yaw": 171.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0_HS_1_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.2,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0_HS_2_0.png",
      "width": 189,
      "class": "ImageResourceLevel",
      "height": 142
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.39,
   "roll": 0,
   "yaw": -100.63
  }
 ],
 "id": "overlay_412D82B6_0007_7A96_4170_A8C23F9756F9",
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_3C6F5E43_0005_2DEE_4174_6642D270135A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, null, null, null, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 11.2,
   "yaw": -100.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524_0_HS_2_1_0_map.gif",
      "width": 94,
      "class": "ImageResourceLevel",
      "height": 71
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.39
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0_HS_0_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.02,
   "yaw": -12.25
  }
 ],
 "id": "overlay_30FD0E20_0002_EDAA_415B_8959BD87CE30",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A, this.camera_17ADA09C_0187_45AC_4162_C6E423A88869); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.92,
   "yaw": -12.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0_HS_0_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.02
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0_HS_1_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.27,
   "yaw": 103.3
  }
 ],
 "id": "overlay_338698C5_0003_36EB_4159_FE591B84EA28",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7AAC0B8_FC25_2B0C_41E7_007DE1D89524, this.camera_17A40090_0187_45B4_4167_6A984591A764); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.92,
   "yaw": 103.3,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5_0_HS_1_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.27
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41D4_85AB00D87A76",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41D4_85AB00D87A76.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D4_85AB00D87A76_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D4_85AB00D87A76_pressed.png",
 "visible": false,
 "cursor": "hand",
 "data": {
  "name": "Button31985"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41BA_A43ED1B1FB40",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41BA_A43ED1B1FB40.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41BA_A43ED1B1FB40_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41BA_A43ED1B1FB40_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31992"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41D3_52532616D552",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41D3_52532616D552.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D3_52532616D552_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D3_52532616D552_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31984"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41CB_7C4DBBC2A8E5",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41CB_7C4DBBC2A8E5.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41CB_7C4DBBC2A8E5_pressed.png",
 "visible": false,
 "cursor": "hand",
 "data": {
  "name": "Button31994"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41C5_1BC8156F8BCF",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41C5_1BC8156F8BCF.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41C5_1BC8156F8BCF_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41C5_1BC8156F8BCF_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31993"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41D1_EAD81768A56B",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41D1_EAD81768A56B.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D1_EAD81768A56B_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D1_EAD81768A56B_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31986"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41D2_D639DF8052CA",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41D2_D639DF8052CA.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D2_D639DF8052CA_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D2_D639DF8052CA_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31995"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41D6_9282B67C524F",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41D6_9282B67C524F.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D6_9282B67C524F_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D6_9282B67C524F_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31989"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41D6_E94D03438B44",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41D6_E94D03438B44.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D6_E94D03438B44_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41D6_E94D03438B44_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31991"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41BC_DB59BC8AC3A2",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41BC_DB59BC8AC3A2.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41BC_DB59BC8AC3A2_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31990"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_5645B517_5EBA_61DA_41A9_0D8835A41A7C",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_5645B517_5EBA_61DA_41A9_0D8835A41A7C.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_5645B517_5EBA_61DA_41A9_0D8835A41A7C_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_5645B517_5EBA_61DA_41A9_0D8835A41A7C_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31987"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0_HS_0_0.png",
      "width": 99,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.63,
   "yaw": 117.89
  }
 ],
 "id": "overlay_3605F9AB_001D_56BF_416C_718E2263CCDA",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A, this.camera_170790EE_0187_456C_416C_FDF708F9FFB7); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.64,
   "yaw": 117.89,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1_0_HS_0_0_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_0_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.07,
   "yaw": -9.73
  }
 ],
 "id": "overlay_339ECC15_007F_2D6A_4152_ECE4A2836754",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF, this.camera_17EB10D5_0187_45BC_4174_6C4A8C699B4C); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.89,
   "yaw": -9.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_0_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_1_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.6,
   "yaw": 37
  }
 ],
 "id": "overlay_3265899E_007F_7699_4152_C3BE3F8348AB",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.8,
   "yaw": 37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_1_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.6
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_2_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.35,
   "yaw": -49.67
  }
 ],
 "id": "overlay_35D561C5_007E_D6EB_4161_8679F65E5776",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7B90BDF_FC25_7D05_419E_62E03F1FEDC1, this.camera_171810E2_0187_4594_4170_6984CB4C6A8A); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.81,
   "yaw": -49.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_2_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_3_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.08,
   "yaw": 170.15
  }
 ],
 "id": "overlay_3486A86C_007D_35B9_4164_9AEAEF3BCAD6",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F752CB54_FC25_3D04_41D5_D09A7FFBFDF5, this.camera_17FAF0CA_0187_4594_412C_92783BB80508); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.86,
   "yaw": 170.15,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_3_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_4_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.35,
   "yaw": 59.36
  }
 ],
 "id": "overlay_335A1FB5_007D_6AAB_4150_9F51787A27BA",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.78,
   "yaw": 59.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_4_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "items": [
  {
   "hfov": 7.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_5_0.png",
      "width": 127,
      "class": "ImageResourceLevel",
      "height": 128
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.28,
   "yaw": 99.11
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_0F135346_017D_449C_4174_71C9663A3ECF",
 "maps": [
  {
   "hfov": 7.54,
   "yaw": 99.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0_HS_0_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.69,
   "yaw": -71.25
  }
 ],
 "id": "overlay_374717EC_001F_DAB9_416F_D39F0B3ED3A8",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_F7B9B607_FC25_1705_41CD_C0E4014FEB1A, this.camera_17D6A0A7_0187_459C_415B_712585354028); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 5.91,
   "yaw": -71.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_F753608E_FC25_6B04_41D3_B07BBE698EAF_0_HS_0_0_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.69
  }
 ]
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_5645B517_5EBA_61DA_41D6_9282B67C524F",
  "this.IconButton_5645B517_5EBA_61DA_41BC_DB59BC8AC3A2",
  "this.IconButton_5645B517_5EBA_61DA_41D6_E94D03438B44"
 ],
 "id": "Container_5645B517_5EBA_61DA_41AF_FC7FEB37EBCD",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 40,
 "minHeight": 20,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "height": "100%",
 "gap": 4,
 "layout": "vertical",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "data": {
  "name": "Container31988"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_11A89B1E_001D_2B96_4128_D2E1D2343AB8",
 "left": "5.56%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Roof",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_11A89B1E_001D_2B96_4128_D2E1D2343AB8.png",
 "bottom": "7%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 21)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_119A84FB_001F_DE9F_4117_9536EB318048",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "18.06%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Kitchen",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_119A84FB_001F_DE9F_4117_9536EB318048.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "height": "15%",
 "width": "8.33%",
 "top": "24%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10ADEC8B_001F_ED7F_4103_625B1E974A30",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "27.22%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Pigeon Nest",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10ADEC8B_001F_ED7F_4103_625B1E974A30.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 4)",
 "height": "15%",
 "width": "8.33%",
 "top": "5.5%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_1073E2CB_001F_FAFF_4122_C6088C6931DC",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "42.23%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Kitchen Outside",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_1073E2CB_001F_FAFF_4122_C6088C6931DC.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 3)",
 "height": "15%",
 "width": "8.33%",
 "top": "4.5%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10847BAA_001F_EABE_4123_17EB07554AA0",
 "left": "34.44%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Outside Stairs",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10847BAA_001F_EABE_4123_17EB07554AA0.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 2)",
 "height": "15%",
 "width": "8.33%",
 "top": "4%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_107113F3_001F_DAAF_4113_2793BB1D8D80",
 "left": "6.67%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Garden",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_107113F3_001F_DAAF_4113_2793BB1D8D80.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "height": "15%",
 "width": "8.33%",
 "top": "6%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10BBF142_001F_57EE_4112_98AC936646B0",
 "left": "1.11%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Living Room (Ground Floor)",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10BBF142_001F_57EE_4112_98AC936646B0.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 9)",
 "height": "15%",
 "width": "8.33%",
 "top": "26%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10846F12_001F_6B6E_411D_1E493DACC8C0",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "6.11%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Sheikh Jamal's Room",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10846F12_001F_6B6E_411D_1E493DACC8C0.png",
 "bottom": "17.5%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 16)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_107016C2_001F_7AEE_4124_BB37FAFAA178",
 "left": "2.5%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Bangabandhu Library",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_107016C2_001F_7AEE_4124_BB37FAFAA178.png",
 "bottom": "32%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_1071FF22_001F_6BAE_40D1_EB1BE8C1F700",
 "left": "18.61%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Balcony",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_1071FF22_001F_6BAE_40D1_EB1BE8C1F700.png",
 "bottom": "30.5%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 11)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_1070756B_001F_5FBE_412B_6F1E4FF448D4",
 "left": "40.55%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Bangabandhu Room",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_1070756B_001F_5FBE_412B_6F1E4FF448D4.png",
 "bottom": "33%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 12)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_1087CB9A_001F_2A9E_4104_E5240D306B00",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "30.27%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Corridor Passage",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_1087CB9A_001F_2A9E_4104_E5240D306B00.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 6)",
 "height": "15%",
 "width": "8.33%",
 "top": "29%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_108EC52A_001F_3FB9_412C_076EDEA2A8B0",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "32.5%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Living Room (Second Floor)",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_108EC52A_001F_3FB9_412C_076EDEA2A8B0.png",
 "bottom": "32%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 13)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10A1F8AA_001E_D6B9_4121_9D9895245890",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "2.78%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Main Stairs",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10A1F8AA_001E_D6B9_4121_9D9895245890.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 15)",
 "height": "15%",
 "width": "8.33%",
 "top": "39%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_109246F9_001E_FA9A_4113_9B85ED785998",
 "left": "41.67%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Corridor Passage 2",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_109246F9_001E_FA9A_4113_9B85ED785998.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 7)",
 "height": "15%",
 "width": "8.33%",
 "top": "26.5%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10700D1B_001E_EF9F_4121_FCC22FBA556C",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "18.89%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Second Floor Entry",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10700D1B_001E_EF9F_4121_FCC22FBA556C.png",
 "bottom": "7%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 17)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10718322_001E_DBA9_4114_0B018FBFE9A0",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "16.12%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Sheikh Rehana's Room",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10718322_001E_DBA9_4114_0B018FBFE9A0.png",
 "bottom": "35%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 14)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_108608EA_001E_D6B9_4129_DA26B302B778",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "right": "32.78%",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Sheikh Kamal's Room",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_108608EA_001E_D6B9_4129_DA26B302B778.png",
 "bottom": "6%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 18)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10708E82_001D_2D69_412B_DF58578AEBA0",
 "left": "43.33%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Bangabandhu Office",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10708E82_001D_2D69_412B_DF58578AEBA0.png",
 "bottom": "8%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 19)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_1070E563_001D_3FAF_40FD_088DD57FDAA0",
 "left": "18.34%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Entry01",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_1070E563_001D_3FAF_40FD_088DD57FDAA0.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 1)",
 "height": "15%",
 "width": "8.33%",
 "top": "2.5%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_11A9A924_0003_57A9_40D0_6201A6958C00",
 "left": "23.61%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Living Room (Third Floor)",
 "horizontalAlign": "center",
 "toolTipFontSize": 12,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_11A9A924_0003_57A9_40D0_6201A6958C00.png",
 "bottom": "6.5%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 20)",
 "height": "15%",
 "width": "8.33%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": false,
 "maxHeight": 57,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_10C472C1_0003_3AEB_412E_CE5F5B1B7198",
 "left": "22.5%",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 1,
 "toolTip": "Corridor Passage 3",
 "horizontalAlign": "center",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_10C472C1_0003_3AEB_412E_CE5F5B1B7198.png",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "push",
 "minWidth": 1,
 "click": "this.mainPlayList.set('selectedIndex', 8)",
 "height": "15%",
 "width": "8.33%",
 "top": "26.5%",
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "toolTipPaddingRight": 6,
 "class": "IconButton",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "data": {
  "name": "IconButton5591"
 },
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 64,
 "toolTipTextShadowOpacity": 0
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "levels": [
  {
   "url": "media/panorama_F01F4C2B_FC25_1B0C_41D3_74241C683C53_0_HS_2_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "colCount": 4,
 "id": "AnimatedImageResource_17D5DB07_019F_449C_4165_D7FF71F8EF3C",
 "frameCount": 24,
 "frameDuration": 41
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
