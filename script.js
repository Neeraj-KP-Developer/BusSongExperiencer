(function() {
    let e = document.createElement(`link`).relList;
    if (e && e.supports && e.supports(`modulepreload`))
        return;
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`))
        n(e);
    new MutationObserver(e => {
        for (let t of e)
            if (t.type === `childList`)
                for (let e of t.addedNodes)
                    e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function t(e) {
        let t = {};
        return e.integrity && (t.integrity = e.integrity),
        e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
        t.credentials = e.crossOrigin === `use-credentials` ? `include` : e.crossOrigin === `anonymous` ? `omit` : `same-origin`,
        t
    }
    function n(e) {
        if (e.ep)
            return;
        e.ep = !0;
        let n = t(e);
        fetch(e.href, n)
    }
}
)();
var e, t = !1, n, r = document.getElementById(`btn-play-pause`), i = document.getElementById(`btn-prev`), a = document.getElementById(`btn-next`), o = document.getElementById(`icon-play`), s = document.getElementById(`icon-pause`), c = document.getElementById(`track-title`), l = document.getElementById(`track-artist`), u = document.getElementById(`album-art-img`);
document.getElementById(`album-art-wrapper`);
var d = document.getElementById(`time-current`)
  , f = document.getElementById(`time-total`)
  , p = document.getElementById(`progress-bar-fill`)
  , m = document.getElementById(`progress-container`)
  , h = document.getElementById(`bus-list`)
  , g = document.getElementById(`main-title`)
  , _ = document.getElementById(`route-start`)
  , v = document.getElementById(`route-end`)
  , y = document.getElementById(`btn-fullscreen`)
  , b = document.getElementById(`icon-fs-enter`)
  , x = document.getElementById(`icon-fs-exit`)
  , S = document.getElementById(`btn-honk`)
  , C = document.getElementById(`btn-bell`)
  , w = document.getElementById(`btn-playlist`)
  , T = document.getElementById(`playlist-modal`)
  , E = document.getElementById(`playlist-container`)
  , D = document.getElementById(`btn-timer`)
  , O = document.getElementById(`timer-modal`)
  , k = document.querySelectorAll(`.timer-option`)
  , A = document.getElementById(`btn-info`)
  , j = document.getElementById(`info-modal`)
  , M = document.getElementById(`btn-close-info`)
  , N = new Audio(`/Bus_Horn.mp3`);
  var bell = new Audio(`/bell.mp3`);
S.addEventListener(`click`, () => {
    N.currentTime = 0,
    N.play().catch(e => console.log(`Horn play failed:`, e))
}
);
var P = new Audio(`/start.mp3`)
  , F = new Audio(`/stop.mp3`)
  , I = null;
function L() {
    I ? (clearTimeout(I),
    I = null,
    P.currentTime = 0,
    P.play().catch(e => console.log(`Start play failed:`, e))) : I = setTimeout( () => {
        I = null,
        F.currentTime = 0,
        F.play().catch(e => console.log(`Stop play failed:`, e))
    }
    , 250)
}
C.addEventListener(`click`, () => {
    bell.currentTime = 0;
    bell.play().catch(e => console.log(`Bell play failed:`, e));
}),
y.addEventListener(`click`, () => {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(e => {
        console.log(`Error attempting to enable fullscreen: ${e.message}`)
    }
    )
}
),
document.addEventListener(`fullscreenchange`, () => {
    document.fullscreenElement ? (b.style.display = `none`,
    x.style.display = `block`) : (b.style.display = `block`,
    x.style.display = `none`)
}
),
w.addEventListener(`click`, e => {
    e.stopPropagation(),
    T.classList.toggle(`hidden`),
    T.classList.contains(`hidden`) || R(),
    O && O.classList.add(`hidden`)
}
),
document.addEventListener(`click`, e => {
    T.classList.contains(`hidden`) || !T.contains(e.target) && !w.contains(e.target) && T.classList.add(`hidden`)
}
);
function R() {
    let t = localStorage.getItem(`selectedBus`) || z[0].id
      , n = H[t] || [];
    E.innerHTML = ``;
    let r = e && e.getPlaylistIndex ? e.getPlaylistIndex() : -1;
    n.forEach( (t, n) => {
        let i = document.createElement(`div`);
        i.className = `playlist-item`,
        n === r && i.classList.add(`active`);
        let a = t.thumbnail;
        a && a.startsWith(`data:image/gif`) && (a = `/bg.png`),
        i.innerHTML = `
      <img src="${a}" alt="Thumbnail" class="playlist-item-thumb" onerror="this.src='/bg.png'" />
      <div class="playlist-item-info">
        <p class="playlist-item-title">${t.title}</p>
        <p class="playlist-item-artist">${t.artist || `Unknown Artist`}</p>
      </div>
    `,
        i.addEventListener(`click`, () => {
            e && e.playVideoAt && (e.playVideoAt(n),
            T.classList.add(`hidden`))
        }
        ),
        E.appendChild(i)
    }
    )
}
var z = [{
    id: `MAYILVAHANAM`,
    name: `തേജ്ജസ്`,
    start: `കോഴിക്കോട്`,
    end: `കണ്ണൂർ`
}]
  , B = localStorage.getItem(`selectedBus`) || z[0].id
  , V = z.find(e => e.id === B) || z[0];
g.textContent = V.name,
_.textContent = V.start,
v.textContent = V.end;
var H = {};
Promise.all([fetch(`/songs.json`).then(e => e.json()), new Promise(e => {
    window.YT && window.YT.Player ? e() : window.onYouTubeIframeAPIReady = e
}
)]).then( ([t]) => {
    H = t;
    let n = localStorage.getItem(`selectedBus`) || z[0].id
      , r = localStorage.getItem(`lastPlayedSong`)
      , i = H[n] || []
      , a = i.length > 0 ? i[0].id : ``;
    r && i.some(e => e.id === r) && (a = r),
    e = new YT.Player(`youtube-player`,{
        height: `10`,
        width: `10`,
        videoId: a,
        playerVars: {
            playsinline: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0
        },
        events: {
            onReady: U,
            onStateChange: W
        }
    })
}
).catch(e => console.error(`Initialization error:`, e));
function U(t) {
    r.disabled = !1,
    K(),
    r.addEventListener(`click`, G),
    i.addEventListener(`click`, X),
    a.addEventListener(`click`, Y),
    m.addEventListener(`click`, t => {
        if (!e || !e.getDuration)
            return;
        let n = m.getBoundingClientRect()
          , r = (t.clientX - n.left) / n.width * e.getDuration();
        e.seekTo(r, !0)
    }
    ),
    h.innerHTML = ``,
    [{
        name: `Malabar Region (North)`,
        buses: z.slice(0, 6)
    }, {
        name: `Central Kerala`,
        buses: z.slice(6, 12)
    }, {
        name: `South Kerala`,
        buses: z.slice(12, 15)
    }].forEach(t => {
        let n = document.createElement(`div`);
        n.className = `bus-region`;
        let r = document.createElement(`div`);
        r.className = `bus-region-options`,
        t.buses.forEach(t => {
            let n = document.createElement(`button`);
            n.className = `bus-option`,
            n.textContent = `${t.name} (${t.start} - ${t.end})`,
            n.addEventListener(`click`, () => {
                g.textContent = t.name,
                _.textContent = t.start,
                v.textContent = t.end,
                localStorage.setItem(`selectedBus`, t.id);
                let n = (H[t.id] || []).map(e => e.id);
                n.length > 0 && (e.loadPlaylist(n),
                e.setVolume(100),
                K())
            }
            ),
            r.appendChild(n)
        }
        ),
        n.appendChild(r),
        h.appendChild(n)
    }
    ),
    setTimeout( () => {
        let t = localStorage.getItem(`selectedBus`)
          , n = localStorage.getItem(`lastPlayedSong`);
        if (t && H[t]) {
            let r = z.find(e => e.id === t);
            r && (g.textContent = r.name,
            _.textContent = r.start,
            v.textContent = r.end);
            let i = H[t]
              , a = 0;
            n && (a = i.findIndex(e => e.id === n),
            a === -1 && (a = 0));
            let o = i.map(e => e.id);
            e.cuePlaylist(o, a, 0)
        }
    }
    , 200)
}
function W(n) {
    if (n.data === YT.PlayerState.PLAYING) {
        t = !0,
        o.style.display = `none`,
        s.style.display = `block`,
        K();
        let n = e.getVideoData();
        n && n.video_id && localStorage.setItem(`lastPlayedSong`, n.video_id),
        ee()
    } else if ((n.data === YT.PlayerState.PAUSED || n.data === YT.PlayerState.ENDED) && (t = !1,
    o.style.display = `block`,
    s.style.display = `none`,
    te(),
    n.data === YT.PlayerState.ENDED)) {
        let t = e.getPlaylist()
          , n = e.getPlaylistIndex();
        t && n === t.length - 1 && J()
    }
}
function G() {
    e && (t ? e.pauseVideo() : e.playVideo())
}
function K() {
    if (!e || !e.getPlaylistIndex)
        return;
    let t = e.getPlaylistIndex()
      , n = localStorage.getItem(`selectedBus`) || `MAYILVAHANAM`;
    if (H[n] && H[n][t]) {
        let e = H[n][t];
        c.textContent = e.title,
        l.textContent = e.artist,
        e.thumbnail && !e.thumbnail.startsWith(`data:image/gif`) ? (u.src = `https://img.youtube.com/vi/${e.id}/maxresdefault.jpg`,
        u.onerror = function() {
            u.src = e.thumbnail || `https://img.youtube.com/vi/${e.id}/hqdefault.jpg`
        }
        ) : (u.src = `https://img.youtube.com/vi/${e.id}/maxresdefault.jpg`,
        u.onerror = function() {
            u.src = `https://img.youtube.com/vi/${e.id}/hqdefault.jpg`
        }
        )
    } else {
        let t = e.getVideoData && e.getVideoData();
        t && t.title && (c.textContent = t.title,
        l.textContent = t.author || `Kerala Private Bus Mix`,
        u.src = `https://img.youtube.com/vi/${t.video_id}/maxresdefault.jpg`,
        u.onerror = function() {
            u.src = `https://img.youtube.com/vi/${t.video_id}/hqdefault.jpg`
        }
        )
    }
}
function ee() {
    n = setInterval( () => {
        if (!e || !e.getCurrentTime)
            return;
        let t = e.getCurrentTime()
          , n = e.getDuration();
        d.textContent = q(t),
        f.textContent = q(n);
        let r = t / n * 100;
        p.style.width = `${r}%`
    }
    , 1e3)
}
function te() {
    clearInterval(n)
}
function q(e) {
    let t = Math.floor(e / 60)
      , n = Math.floor(e % 60);
    return `${t}:${n < 10 ? `0` + n : n}`
}
function J() {
    let t = localStorage.getItem(`selectedBus`) || z[0].id
      , n = (z.findIndex(e => e.id === t) + 1) % z.length;
    n < 0 && (n = 0);
    let r = z[n];
    g.textContent = r.name,
    _.textContent = r.start,
    v.textContent = r.end,
    localStorage.setItem(`selectedBus`, r.id);
    let i = (H[r.id] || []).map(e => e.id);
    i.length > 0 && e && e.loadPlaylist && e.loadPlaylist(i, 0, 0)
}
function ne() {
    let t = localStorage.getItem(`selectedBus`) || z[0].id
      , n = z.findIndex(e => e.id === t) - 1;
    n < 0 && (n = z.length - 1);
    let r = z[n];
    g.textContent = r.name,
    _.textContent = r.start,
    v.textContent = r.end,
    localStorage.setItem(`selectedBus`, r.id);
    let i = (H[r.id] || []).map(e => e.id);
    i.length > 0 && e && e.loadPlaylist && e.loadPlaylist(i, i.length - 1, 0)
}
function Y() {
    if (!e)
        return;
    let t = e.getPlaylist()
      , n = e.getPlaylistIndex();
    t && n === t.length - 1 ? J() : e.nextVideo()
}
function X() {
    e && (e.getPlaylistIndex() === 0 ? ne() : e.previousVideo())
}
document.addEventListener(`keydown`, e => {
    if (e.target.tagName === `INPUT` || e.target.tagName === `TEXTAREA`)
        return;
    let t = e.key.toLowerCase();
    t === `x` ? S.click() : t === `b` ? C.click() : t === `p` ? document.getElementById(`btn-play-pause`).click() : t === `f` ? y.click() : t === `j` ? X() : t === `k` ? Y() : t === `n` && J()
}
);
var Z = null
  , Q = null
  , $ = null;
D.addEventListener(`click`, e => {
    e.stopPropagation(),
    O.classList.toggle(`hidden`),
    T.classList.add(`hidden`)
}
),
document.addEventListener(`click`, e => {
    !O.contains(e.target) && !D.contains(e.target) && O.classList.add(`hidden`)
}
),
k.forEach(n => {
    n.addEventListener(`click`, n => {
        let r = parseInt(n.target.getAttribute(`data-time`), 10);
        if (Z && clearInterval(Z),
        $ && clearInterval($),
        e && typeof e.setVolume == `function` && e.setVolume(100),
        k.forEach(e => e.classList.remove(`active`)),
        r === 0) {
            D.classList.remove(`btn-timer-active`),
            O.classList.add(`hidden`);
            return
        }
        n.target.classList.add(`active`),
        D.classList.add(`btn-timer-active`),
        O.classList.add(`hidden`),
        Q = Date.now() + r * 60 * 1e3,
        Z = setInterval( () => {
            if (Q - Date.now() <= 15e3 && !$ && t && e) {
                let t = 100;
                $ = setInterval( () => {
                    t = Math.max(0, t - 100 / 30),
                    e.setVolume(t),
                    t <= 0 && (clearInterval($),
                    e.pauseVideo(),
                    F.currentTime = 0,
                    F.play().catch(e => console.log(`Stop play failed:`, e)),
                    clearInterval(Z),
                    e.setVolume(100),
                    D.classList.remove(`btn-timer-active`),
                    k.forEach(e => e.classList.remove(`active`)))
                }
                , 500)
            }
        }
        , 1e3)
    }
    )
}
),
A.addEventListener(`click`, e => {
    e.stopPropagation(),
    j.classList.remove(`hidden`),
    T && T.classList.add(`hidden`),
    O && O.classList.add(`hidden`)
}
),
M.addEventListener(`click`, () => {
    j.classList.add(`hidden`)
}
),
document.addEventListener(`click`, e => {
    if (j && !j.classList.contains(`hidden`)) {
        let t = j.querySelector(`.info-dialog`);
        t && !t.contains(e.target) && e.target !== A && !A.contains(e.target) && j.classList.add(`hidden`)
    }
}
);
