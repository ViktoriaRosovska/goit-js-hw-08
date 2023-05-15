import throttle from 'lodash.throttle';
import vimeoPlayer from '@vimeo/player'; 

const PLAYER_CURRENT_TIME_KEY = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);

let time; 
try {
    time = JSON.parse(localStorage.getItem(PLAYER_CURRENT_TIME_KEY)) ?? 0;
} catch (error) {
    console.error(PLAYER_CURRENT_TIME_KEY, error);
    time = 0;
}
player.setCurrentTime(time);
player.on("timeupdate", throttle(({seconds}) => {
    localStorage.setItem(PLAYER_CURRENT_TIME_KEY, JSON.stringify(seconds));
}, 1000));

