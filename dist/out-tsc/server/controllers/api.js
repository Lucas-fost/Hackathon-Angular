"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify = require('util').promisify;
var cheerio = require('cheerio');
var LastFmNode = require('lastfm').LastFmNode;
var tumblr = require('tumblr.js');
var Octokit = require('@octokit/rest').Octokit;
var Twitter = require('twitter-lite');
var stripe = require('stripe')(process.env.STRIPE_SKEY);
var twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
var paypal = require('paypal-rest-sdk');
var crypto = require('crypto');
var lob = require('lob')(process.env.LOB_KEY);
var ig = require('instagram-node').instagram();
var axios = require('axios');
var google = require('googleapis').google;
var Quickbooks = require('node-quickbooks');
var validator = require('validator');
Quickbooks.setOauthVersion('2.0');
/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function (req, res) {
    res.render('api/index', {
        title: 'API Examples'
    });
};
/**
 * GET /api/foursquare
 * Foursquare API example.
 */
exports.getFoursquare = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, trendingVenues, venueDetail, userCheckins;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.user.tokens.find(function (token) { return token.kind === 'foursquare'; })];
            case 1:
                token = _a.sent();
                axios.all([
                    axios.get("https://api.foursquare.com/v2/venues/trending?ll=40.7222756,-74.0022724&limit=50&oauth_token=" + token.accessToken + "&v=20140806"),
                    axios.get("https://api.foursquare.com/v2/venues/49da74aef964a5208b5e1fe3?oauth_token=" + token.accessToken + "&v=20190113"),
                    axios.get("https://api.foursquare.com/v2/users/self/checkins?oauth_token=" + token.accessToken + "&v=20190113")
                ])
                    .then(axios.spread(function (trendingVenuesRes, venueDetailRes, userCheckinsRes) {
                    trendingVenues = trendingVenuesRes.data.response;
                    venueDetail = venueDetailRes.data.response;
                    userCheckins = userCheckinsRes.data.response;
                    res.render('api/foursquare', {
                        title: 'Foursquare API',
                        trendingVenues: trendingVenues,
                        venueDetail: venueDetail,
                        userCheckins: userCheckins
                    });
                }))
                    .catch(function (error) {
                    next(error);
                });
                return [2 /*return*/];
        }
    });
}); };
/**
 * GET /api/tumblr
 * Tumblr API example.
 */
exports.getTumblr = function (req, res, next) {
    var token = req.user.tokens.find(function (token) { return token.kind === 'tumblr'; });
    var client = tumblr.createClient({
        consumer_key: process.env.TUMBLR_KEY,
        consumer_secret: process.env.TUMBLR_SECRET,
        token: token.accessToken,
        token_secret: token.tokenSecret
    });
    client.blogPosts('mmosdotcom.tumblr.com', { type: 'photo' }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.render('api/tumblr', {
            title: 'Tumblr API',
            blog: data.blog,
            photoset: data.posts[0].photos
        });
    });
};
/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = function (req, res, next) {
    var token = req.user.tokens.find(function (token) { return token.kind === 'facebook'; });
    var secret = process.env.FACEBOOK_SECRET;
    var appsecretProof = crypto.createHmac('sha256', secret).update(token.accessToken).digest('hex');
    axios.get("https://graph.facebook.com/" + req.user.facebook + "?fields=id,name,email,first_name,last_name,gender,link,locale,timezone&access_token=" + token.accessToken + "&appsecret_proof=" + appsecretProof)
        .then(function (response) {
        res.render('api/facebook', {
            title: 'Facebook API',
            profile: response.data
        });
    })
        .catch(function (error) { return next(error.response); });
};
/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */
exports.getScraping = function (req, res, next) {
    axios.get('https://news.ycombinator.com/')
        .then(function (response) {
        var $ = cheerio.load(response.data);
        var links = [];
        $('.title a[href^="http"], a[href^="https"]').slice(1).each(function (index, element) {
            links.push($(element));
        });
        res.render('api/scraping', {
            title: 'Web Scraping',
            links: links
        });
    })
        .catch(function (error) { return next(error); });
};
/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var github, repo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                github = new Octokit();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' })];
            case 2:
                repo = (_a.sent()).data;
                res.render('api/github', {
                    title: 'GitHub API',
                    repo: repo
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getQuickbooks = function (req, res) {
    var token = req.user.tokens.find(function (token) { return token.kind === 'quickbooks'; });
    var qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET, token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
    qbo.findCustomers(function (_, customers) {
        res.render('api/quickbooks', {
            title: 'Quickbooks API',
            customers: customers.QueryResponse.Customer
        });
    });
};
/**
 * GET /api/nyt
 * New York Times API example.
 */
exports.getNewYorkTimes = function (req, res, next) {
    var apiKey = process.env.NYT_KEY;
    axios.get("http://api.nytimes.com/svc/books/v2/lists?list-name=young-adult&api-key=" + apiKey)
        .then(function (response) {
        var books = response.data.results;
        res.render('api/nyt', {
            title: 'New York Times API',
            books: books
        });
    })
        .catch(function (err) {
        var message = JSON.stringify(err.response.data.fault);
        next(new Error("New York Times API - " + err.response.status + " " + err.response.statusText + " " + message));
    });
};
/**
 * GET /api/lastfm
 * Last.fm API example.
 */
exports.getLastfm = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var lastfm, getArtistInfo, getArtistTopTracks, getArtistTopAlbums, artistInfo, topTracks, topAlbums, artist, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                lastfm = new LastFmNode({
                    api_key: process.env.LASTFM_KEY,
                    secret: process.env.LASTFM_SECRET
                });
                getArtistInfo = function () {
                    return new Promise(function (resolve, reject) {
                        lastfm.request('artist.getInfo', {
                            artist: 'Roniit',
                            handlers: {
                                success: resolve,
                                error: reject
                            }
                        });
                    });
                };
                getArtistTopTracks = function () {
                    return new Promise(function (resolve, reject) {
                        lastfm.request('artist.getTopTracks', {
                            artist: 'Roniit',
                            handlers: {
                                success: function (_a) {
                                    var toptracks = _a.toptracks;
                                    resolve(toptracks.track.slice(0, 10));
                                },
                                error: reject
                            }
                        });
                    });
                };
                getArtistTopAlbums = function () {
                    return new Promise(function (resolve, reject) {
                        lastfm.request('artist.getTopAlbums', {
                            artist: 'Roniit',
                            handlers: {
                                success: function (_a) {
                                    var topalbums = _a.topalbums;
                                    resolve(topalbums.album.slice(0, 3));
                                },
                                error: reject
                            }
                        });
                    });
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, getArtistInfo()];
            case 2:
                artistInfo = (_a.sent()).artist;
                return [4 /*yield*/, getArtistTopTracks()];
            case 3:
                topTracks = _a.sent();
                return [4 /*yield*/, getArtistTopAlbums()];
            case 4:
                topAlbums = _a.sent();
                artist = {
                    name: artistInfo.name,
                    image: artistInfo.image ? artistInfo.image.slice(-1)[0]['#text'] : null,
                    tags: artistInfo.tags ? artistInfo.tags.tag : [],
                    bio: artistInfo.bio ? artistInfo.bio.summary : '',
                    stats: artistInfo.stats,
                    similar: artistInfo.similar ? artistInfo.similar.artist : [],
                    topTracks: topTracks,
                    topAlbums: topAlbums
                };
                res.render('api/lastfm', {
                    title: 'Last.fm API',
                    artist: artist
                });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                if (err_1.error !== undefined) {
                    console.error(err_1);
                    // see error code list: https://www.last.fm/api/errorcodes
                    switch (err_1.error) {
                        // potentially handle each code uniquely
                        case 10:
                            res.render('api/lastfm', {
                                error: err_1
                            });
                            break;
                        default:
                            res.render('api/lastfm', {
                                error: err_1
                            });
                    }
                }
                else {
                    next(err_1);
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * GET /api/twitter
 * Twitter API example.
 */
exports.getTwitter = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, T, tweets, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user.tokens.find(function (token) { return token.kind === 'twitter'; });
                T = new Twitter({
                    consumer_key: process.env.TWITTER_KEY,
                    consumer_secret: process.env.TWITTER_SECRET,
                    access_token_key: token.accessToken,
                    access_token_secret: token.tokenSecret
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, T.get('search/tweets', {
                        q: 'nodejs since:2013-01-01',
                        geocode: '40.71448,-74.00598,5mi',
                        count: 10
                    })];
            case 2:
                tweets = (_a.sent()).statuses;
                res.render('api/twitter', {
                    title: 'Twitter API',
                    tweets: tweets
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * POST /api/twitter
 * Post a tweet.
 */
exports.postTwitter = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var validationErrors, token, T, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validationErrors = [];
                if (validator.isEmpty(req.body.tweet))
                    validationErrors.push({ msg: 'Tweet cannot be empty' });
                if (validationErrors.length) {
                    req.flash('errors', validationErrors);
                    return [2 /*return*/, res.redirect('/api/twitter')];
                }
                token = req.user.tokens.find(function (token) { return token.kind === 'twitter'; });
                T = new Twitter({
                    consumer_key: process.env.TWITTER_KEY,
                    consumer_secret: process.env.TWITTER_SECRET,
                    access_token_key: token.accessToken,
                    access_token_secret: token.tokenSecret
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, T.post('statuses/update', { status: req.body.tweet })];
            case 2:
                _a.sent();
                req.flash('success', { msg: 'Your tweet has been posted.' });
                res.redirect('/api/twitter');
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * GET /api/steam
 * Steam API example.
 */
exports.getSteam = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var steamId, params, makeURL, getPlayerAchievements, getPlayerSummaries, getOwnedGames, playerstats, playerSummaries, ownedGames, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                steamId = req.user.steam;
                params = { l: 'english', steamid: steamId, key: process.env.STEAM_KEY };
                makeURL = function (baseURL, params) {
                    var url = new URL(baseURL);
                    var urlParams = new URLSearchParams(params);
                    url.search = urlParams.toString();
                    return url.toString();
                };
                getPlayerAchievements = function () {
                    var recentGamesURL = makeURL('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/', params);
                    return axios.get(recentGamesURL)
                        .then(function (_a) {
                        var data = _a.data;
                        // handle if player owns no games
                        if (Object.keys(data.response).length === 0) {
                            return null;
                        }
                        // handle if there are no recently played games
                        if (data.response.total_count === 0) {
                            return null;
                        }
                        params.appid = data.response.games[0].appid;
                        var achievementsURL = makeURL('http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/', params);
                        return axios.get(achievementsURL)
                            .then(function (_a) {
                            var data = _a.data;
                            // handle if there are no achievements for most recent game
                            if (!data.playerstats.achievements) {
                                return null;
                            }
                            return data.playerstats;
                        });
                    })
                        .catch(function (err) {
                        if (err.response) {
                            // handle private profile or invalid key
                            if (err.response.status === 403) {
                                return null;
                            }
                        }
                        return Promise.reject(new Error('There was an error while getting achievements'));
                    });
                };
                getPlayerSummaries = function () {
                    params.steamids = steamId;
                    var url = makeURL('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/', params);
                    return axios.get(url)
                        .then(function (_a) {
                        var data = _a.data;
                        return data;
                    })
                        .catch(function () { return Promise.reject(new Error('There was an error while getting player summary')); });
                };
                getOwnedGames = function () {
                    params.include_appinfo = 1;
                    params.include_played_free_games = 1;
                    var url = makeURL('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/', params);
                    return axios.get(url)
                        .then(function (_a) {
                        var data = _a.data;
                        return data;
                    })
                        .catch(function () { return Promise.reject(new Error('There was an error while getting owned games')); });
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, getPlayerAchievements()];
            case 2:
                playerstats = _a.sent();
                return [4 /*yield*/, getPlayerSummaries()];
            case 3:
                playerSummaries = _a.sent();
                return [4 /*yield*/, getOwnedGames()];
            case 4:
                ownedGames = _a.sent();
                res.render('api/steam', {
                    title: 'Steam Web API',
                    ownedGames: ownedGames.response,
                    playerAchievements: playerstats,
                    playerSummary: playerSummaries.response.players[0]
                });
                return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * GET /api/stripe
 * Stripe API example.
 */
exports.getStripe = function (req, res) {
    res.render('api/stripe', {
        title: 'Stripe API',
        publishableKey: process.env.STRIPE_PKEY
    });
};
/**
 * POST /api/stripe
 * Make a payment.
 */
exports.postStripe = function (req, res) {
    var _a = req.body, stripeToken = _a.stripeToken, stripeEmail = _a.stripeEmail;
    stripe.charges.create({
        amount: 395,
        currency: 'usd',
        source: stripeToken,
        description: stripeEmail
    }, function (err) {
        if (err && err.type === 'StripeCardError') {
            req.flash('errors', { msg: 'Your card has been declined.' });
            return res.redirect('/api/stripe');
        }
        req.flash('success', { msg: 'Your card has been successfully charged.' });
        res.redirect('/api/stripe');
    });
};
/**
 * GET /api/twilio
 * Twilio API example.
 */
exports.getTwilio = function (req, res) {
    res.render('api/twilio', {
        title: 'Twilio API'
    });
};
/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
exports.postTwilio = function (req, res, next) {
    var validationErrors = [];
    if (validator.isEmpty(req.body.number))
        validationErrors.push({ msg: 'Phone number is required.' });
    if (validator.isEmpty(req.body.message))
        validationErrors.push({ msg: 'Message cannot be blank.' });
    if (validationErrors.length) {
        req.flash('errors', validationErrors);
        return res.redirect('/api/twilio');
    }
    var message = {
        to: req.body.number,
        from: '+13472235148',
        body: req.body.message
    };
    twilio.messages.create(message).then(function (sentMessage) {
        req.flash('success', { msg: "Text send to " + sentMessage.to });
        res.redirect('/api/twilio');
    }).catch(next);
};
/**
 * Get /api/twitch
 */
exports.getTwitch = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, twitchID, twitchClientID, getUser, getFollowers, yourTwitchUser, otherTwitchUser, twitchFollowers, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user.tokens.find(function (token) { return token.kind === 'twitch'; });
                twitchID = req.user.twitch;
                twitchClientID = process.env.TWITCH_CLIENT_ID;
                getUser = function (userID) {
                    return axios.get("https://api.twitch.tv/helix/users?id=" + userID, { headers: { Authorization: "Bearer " + token.accessToken, 'Client-ID': twitchClientID } })
                        .then(function (_a) {
                        var data = _a.data;
                        return data;
                    })
                        .catch(function (err) { return Promise.reject(new Error("There was an error while getting user data " + err)); });
                };
                getFollowers = function () {
                    return axios.get("https://api.twitch.tv/helix/users/follows?to_id=" + twitchID, { headers: { Authorization: "Bearer " + token.accessToken, 'Client-ID': twitchClientID } })
                        .then(function (_a) {
                        var data = _a.data;
                        return data;
                    })
                        .catch(function (err) { return Promise.reject(new Error("There was an error while getting followers " + err)); });
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, getUser(twitchID)];
            case 2:
                yourTwitchUser = _a.sent();
                return [4 /*yield*/, getUser(44322889)];
            case 3:
                otherTwitchUser = _a.sent();
                return [4 /*yield*/, getFollowers()];
            case 4:
                twitchFollowers = _a.sent();
                res.render('api/twitch', {
                    title: 'Twitch API',
                    yourTwitchUserData: yourTwitchUser.data[0],
                    otherTwitchUserData: otherTwitchUser.data[0],
                    twitchFollowers: twitchFollowers,
                });
                return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 * GET /api/chart
 * Chart example.
 */
exports.getChart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&apikey=" + process.env.ALPHA_VANTAGE_KEY;
        axios.get(url)
            .then(function (response) {
            var arr = response.data['Time Series (Daily)'];
            var dates = [];
            var closing = []; // stock closing value
            var keys = Object.getOwnPropertyNames(arr);
            for (var i = 0; i < 100; i++) {
                dates.push(keys[i]);
                closing.push(arr[keys[i]]['4. close']);
            }
            // reverse so dates appear from left to right
            dates.reverse();
            closing.reverse();
            dates = JSON.stringify(dates);
            closing = JSON.stringify(closing);
            res.render('api/chart', {
                title: 'Chart',
                dates: dates,
                closing: closing
            });
        }).catch(function (err) {
            next(err);
        });
        return [2 /*return*/];
    });
}); };
/**
 * GET /api/instagram
 * Instagram API example.
 */
exports.getInstagram = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var token, userSelfMediaRecentAsync, myRecentMedia, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user.tokens.find(function (token) { return token.kind === 'instagram'; });
                ig.use({ client_id: process.env.INSTAGRAM_ID, client_secret: process.env.INSTAGRAM_SECRET });
                ig.use({ access_token: token.accessToken });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userSelfMediaRecentAsync = exports.promisify(ig.user_self_media_recent);
                return [4 /*yield*/, userSelfMediaRecentAsync()];
            case 2:
                myRecentMedia = _a.sent();
                res.render('api/instagram', {
                    title: 'Instagram API',
                    myRecentMedia: myRecentMedia
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * GET /api/paypal
 * PayPal SDK example.
 */
exports.getPayPal = function (req, res, next) {
    paypal.configure({
        mode: 'sandbox',
        client_id: process.env.PAYPAL_ID,
        client_secret: process.env.PAYPAL_SECRET
    });
    var paymentDetails = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: process.env.PAYPAL_RETURN_URL,
            cancel_url: process.env.PAYPAL_CANCEL_URL
        },
        transactions: [{
                description: 'Hackathon Starter',
                amount: {
                    currency: 'USD',
                    total: '1.99'
                }
            }]
    };
    paypal.payment.create(paymentDetails, function (err, payment) {
        if (err) {
            return next(err);
        }
        var links = payment.links, id = payment.id;
        req.session.paymentId = id;
        for (var i = 0; i < links.length; i++) {
            if (links[i].rel === 'approval_url') {
                res.render('api/paypal', {
                    approvalUrl: links[i].href
                });
            }
        }
    });
};
/**
 * GET /api/paypal/success
 * PayPal SDK example.
 */
exports.getPayPalSuccess = function (req, res) {
    var paymentId = req.session.paymentId;
    var paymentDetails = { payer_id: req.query.PayerID };
    paypal.payment.execute(paymentId, paymentDetails, function (err) {
        res.render('api/paypal', {
            result: true,
            success: !err
        });
    });
};
/**
 * GET /api/paypal/cancel
 * PayPal SDK example.
 */
exports.getPayPalCancel = function (req, res) {
    req.session.paymentId = null;
    res.render('api/paypal', {
        result: true,
        canceled: true
    });
};
/**
 * GET /api/lob
 * Lob API example.
 */
exports.getLob = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var recipientName, addressTo, addressFrom, lookupZip, createAndMailLetter, uspsLetter, zipDetails, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user) {
                    recipientName = req.user.profile.name;
                }
                else {
                    recipientName = 'John Doe';
                }
                addressTo = {
                    name: recipientName,
                    address_line1: '123 Main Street',
                    address_city: 'New York',
                    address_state: 'NY',
                    address_zip: '94107'
                };
                addressFrom = {
                    name: 'Hackathon Starter',
                    address_line1: '123 Test Street',
                    address_line2: 'Unit 200',
                    address_city: 'Chicago',
                    address_state: 'IL',
                    address_zip: '60012',
                    address_country: 'US'
                };
                lookupZip = function () { return lob.usZipLookups.lookup({ zip_code: '94107' })
                    .then(function (zipdetails) { return (zipdetails); })
                    .catch(function (error) { return Promise.reject(new Error("Could not get zip code details: " + error)); }); };
                createAndMailLetter = function () { return lob.letters.create({
                    description: 'My First Class Letter',
                    to: addressTo,
                    from: addressFrom,
                    // file: minified version of https://github.com/lob/lob-node/blob/master/examples/html/letter.html with slight changes as an example
                    file: "<html><head><meta charset=\"UTF-8\"><style>body{width:8.5in;height:11in;margin:0;padding:0}.page{page-break-after:always;position:relative;width:8.5in;height:11in}.page-content{position:absolute;width:8.125in;height:10.625in;left:1in;top:1in}.text{position:relative;left:20px;top:3in;width:6in;font-size:14px}</style></head>\n          <body><div class=\"page\"><div class=\"page-content\"><div class=\"text\">\n          Hello " + addressTo.name + ", <p> We would like to welcome you to the community! Thanks for being a part of the team! <p><p> Cheer,<br>" + addressFrom.name + "\n          </div></div></div></body></html>",
                    color: false
                })
                    .then(function (letter) { return (letter); })
                    .catch(function (error) { return Promise.reject(new Error("Could not create and send letter: " + error)); }); };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, createAndMailLetter()];
            case 2:
                uspsLetter = _a.sent();
                return [4 /*yield*/, lookupZip()];
            case 3:
                zipDetails = _a.sent();
                res.render('api/lob', {
                    title: 'Lob API',
                    zipDetails: zipDetails,
                    uspsLetter: uspsLetter,
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * GET /api/upload
 * File Upload API example.
 */
exports.getFileUpload = function (req, res) {
    res.render('api/upload', {
        title: 'File Upload'
    });
};
exports.postFileUpload = function (req, res) {
    req.flash('success', { msg: 'File was uploaded successfully.' });
    res.redirect('/api/upload');
};
/**
 * GET /api/pinterest
 * Pinterest API example.
 */
exports.getPinterest = function (req, res, next) {
    var token = req.user.tokens.find(function (token) { return token.kind === 'pinterest'; });
    axios.get("https://api.pinterest.com/v1/me/boards?access_token=" + token.accessToken)
        .then(function (response) {
        res.render('api/pinterest', {
            title: 'Pinterest API',
            boards: response.data.data
        });
    })
        .catch(function (error) {
        next(error);
    });
};
/**
 * POST /api/pinterest
 * Create a pin.
 */
exports.postPinterest = function (req, res, next) {
    var validationErrors = [];
    if (validator.isEmpty(req.body.board))
        validationErrors.push({ msg: 'Board is required.' });
    if (validator.isEmpty(req.body.note))
        validationErrors.push({ msg: 'Note cannot be blank.' });
    if (validator.isEmpty(req.body.image_url))
        validationErrors.push({ msg: 'Image URL cannot be blank.' });
    if (validationErrors.length) {
        req.flash('errors', validationErrors);
        return res.redirect('/api/pinterest');
    }
    var token = req.user.tokens.find(function (token) { return token.kind === 'pinterest'; });
    var formData = {
        board: req.body.board,
        note: req.body.note,
        link: req.body.link,
        image_url: req.body.image_url
    };
    axios.post("https://api.pinterest.com/v1/pins/?access_token=" + token.accessToken, formData)
        .then(function () {
        req.flash('success', { msg: 'Pin created' });
        res.redirect('/api/pinterest');
    })
        .catch(function (error) {
        req.flash('errors', { msg: error.response.data.message });
        res.redirect('/api/pinterest');
    });
};
exports.getHereMaps = function (req, res) {
    var imageMapURL = "https://image.maps.api.here.com/mia/1.6/mapview?app_id=" + process.env.HERE_APP_ID + "&app_code=" + process.env.HERE_APP_CODE + "&poix0=47.6516216,-122.3498897;white;black;15;Fremont Troll&poix1=47.6123335,-122.3314332;white;black;15;Seattle Art Museum&poix2=47.6162956,-122.3555097;white;black;15;Olympic Sculpture Park&poix3=47.6205099,-122.3514661;white;black;15;Space Needle&c=47.6176371,-122.3344637&u=1500&vt=1&&z=13&h=500&w=800&";
    res.render('api/here-maps', {
        app_id: process.env.HERE_APP_ID,
        app_code: process.env.HERE_APP_CODE,
        title: 'Here Maps API',
        imageMapURL: imageMapURL
    });
};
exports.getGoogleMaps = function (req, res) {
    res.render('api/google-maps', {
        title: 'Google Maps API',
        google_map_api_key: process.env.GOOGLE_MAP_API_KEY
    });
};
exports.getGoogleDrive = function (req, res) {
    var token = req.user.tokens.find(function (token) { return token.kind === 'google'; });
    var authObj = new google.auth.OAuth2({
        access_type: 'offline'
    });
    authObj.setCredentials({
        access_token: token.accessToken
    });
    var drive = google.drive({
        version: 'v3',
        auth: authObj
    });
    drive.files.list({
        fields: 'files(iconLink, webViewLink, name)'
    }, function (err, response) {
        if (err)
            return console.log("The API returned an error: " + err);
        res.render('api/google-drive', {
            title: 'Google Drive API',
            files: response.data.files,
        });
    });
};
exports.getGoogleSheets = function (req, res) {
    var token = req.user.tokens.find(function (token) { return token.kind === 'google'; });
    var authObj = new google.auth.OAuth2({
        access_type: 'offline'
    });
    authObj.setCredentials({
        access_token: token.accessToken
    });
    var sheets = google.sheets({
        version: 'v4',
        auth: authObj
    });
    var url = 'https://docs.google.com/spreadsheets/d/12gm6fRAp0bC8TB2vh7sSPT3V75Ug99JaA9L0PqiWS2s/edit#gid=0';
    var re = /spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    var id = url.match(re)[1];
    sheets.spreadsheets.values.get({
        spreadsheetId: id,
        range: 'Class Data!A1:F',
    }, function (err, response) {
        if (err)
            return console.log("The API returned an error: " + err);
        res.render('api/google-sheets', {
            title: 'Google Sheets API',
            values: response.data.values,
        });
    });
};
//# sourceMappingURL=api.js.map