/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","44de121d4742d823967a761e5c7b4e20"],["bower_components/app-layout/app-drawer/app-drawer.html","0aebee1ef87299228d6daa709a37eceb"],["bower_components/app-layout/app-header-layout/app-header-layout.html","d3072f8cf30de94a99ac4825d1e07df8"],["bower_components/app-layout/app-header/app-header.html","62d69c07d519c29122a10f54fee304af"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","a64d340503d802c441f231999bc50513"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","ffadeb52557b2c0fc7a28ff106903622"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","cb65065f730d76538be3d15794650adf"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","d7fe94ca7c381f0d814ae8f03e7a1707"],["bower_components/app-layout/app-scroll-effects/effects/material.html","93d85d4f6d42fd57d73fda270f8b8b5d"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","cb919252b3b9eb1c7d57fc7022353c9a"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","e1917db70703c8af036b1a29fd7d6237"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","91cbbf08e10ad1d60804d5403f10b679"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["bower_components/app-layout/app-toolbar/app-toolbar.html","1969068eeac3ed606025f04bf7871282"],["bower_components/app-layout/helpers/helpers.html","1da38888481edb36a5d7f15a8633dd9f"],["bower_components/app-route/app-location.html","77bdb903ec70eece5e41c911c355d0cf"],["bower_components/app-route/app-route-converter-behavior.html","717082ae29ce5616531c20e1ddc20d3c"],["bower_components/app-route/app-route.html","1b749c5cac5a95fd9410bb35daef3276"],["bower_components/coa-ajax/coa-ajax.html","c37875704a2ca08fa7ab03f31496ccc3"],["bower_components/coa-user/coa-user.html","dc98255b9aa8660e8ef51cbfa56e3638"],["bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","2147d8e18cb4f776df227ff7c5c6da86"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","73983c95dc8427e20e2b9a7b9c71d2d7"],["bower_components/iron-ajax/iron-ajax.html","0990974ada7fc5a2820ff323d10fe7f5"],["bower_components/iron-ajax/iron-request.html","ab9837f802f4948635b731566480bacc"],["bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","a85e1c0de0b6b84bd70bc7c356b8370f"],["bower_components/iron-behaviors/iron-button-state.html","40f4d0c50c0df6b151f84006fb1823ac"],["bower_components/iron-behaviors/iron-control-state.html","fb2613f2ffc10065e718be1f9969acb5"],["bower_components/iron-flex-layout/iron-flex-layout.html","3e285c2698feec264710fffd609630ad"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","2f0a609a52c3b90dc78d529858f04445"],["bower_components/iron-icon/iron-icon.html","cb0fc2d7d07009ab937d42c387acf9e1"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","03e6664a85fae57bf66d7563eb277ed4"],["bower_components/iron-input/iron-input.html","13561c0aa93c046a964d55a400333cf4"],["bower_components/iron-location/iron-location.html","a53d089df7c2f93417675531e89dc266"],["bower_components/iron-location/iron-query-params.html","213f4fa4294b5992135e4bfe5ae50507"],["bower_components/iron-media-query/iron-media-query.html","e58c5c28ea1a1707a79d208e32e995dc"],["bower_components/iron-meta/iron-meta.html","aa90ac8b9694a6a582c9bed8b3bef3f8"],["bower_components/iron-pages/iron-pages.html","aeb0aff1b1109fc353d8b7af89792220"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","0a37dd92e02c6863cdfa37710ab511bd"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","58238ea481cc89dd8bc3eb98d30a2bba"],["bower_components/iron-selector/iron-multi-selectable.html","f89d61e11f7c4657c909f602c06b09ca"],["bower_components/iron-selector/iron-selectable.html","58ad69762f3c8b328903bdd79aaf7efe"],["bower_components/iron-selector/iron-selection.html","1548ed2c2db7d8b51428f512de787305"],["bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","504b1856b7fdd09f43bf98eb3ea697b3"],["bower_components/paper-behaviors/paper-button-behavior.html","793782859ac11addc2f665dda089da48"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","891a915a3403caeff1fc3a4a9ed1e9c3"],["bower_components/paper-behaviors/paper-ripple-behavior.html","f8da6bdab811221037f001d1b16785c9"],["bower_components/paper-button/paper-button.html","e56a59ed88bb90e19df8338c53e984a5"],["bower_components/paper-icon-button/paper-icon-button.html","48eec3cbac79a0fc3778854e1b0996ba"],["bower_components/paper-input/paper-input-addon-behavior.html","db9171b2bf4fdb8327dd4f311ccc0296"],["bower_components/paper-input/paper-input-behavior.html","4458c0a83b4cc2e698f0cec068f6780a"],["bower_components/paper-input/paper-input-char-counter.html","5e800861916aee9a137a5c6397265435"],["bower_components/paper-input/paper-input-container.html","5aedfb58091a8ea938850cf80bafc554"],["bower_components/paper-input/paper-input-error.html","bd45af6be1c5185799be39f0194252ea"],["bower_components/paper-input/paper-input.html","f50ea31c1030a0fbf269a7f75625811f"],["bower_components/paper-input/paper-textarea.html","385c7e364fe1820015d9ae924dcc15ce"],["bower_components/paper-ripple/paper-ripple.html","8cb2d836f86ca84aaad9fe07b032276d"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/polymer/lib/elements/array-selector.html","fe98ef26af1d3c0203f860abe33c7ea3"],["bower_components/polymer/lib/elements/custom-style.html","b246cd8d5813053a40e5babd9afdcd90"],["bower_components/polymer/lib/elements/dom-bind.html","f3e83e5cc726f3669e23ee66d3636b07"],["bower_components/polymer/lib/elements/dom-if.html","de86afbdc9f052599c600f668ddfc2f8"],["bower_components/polymer/lib/elements/dom-module.html","ff7101dc5b037becb673fd313d47eb28"],["bower_components/polymer/lib/elements/dom-repeat.html","aa4ff8fa7c736931c2d523c58836f4d9"],["bower_components/polymer/lib/legacy/class.html","52bb09aa0d90279638bc558a0183a1d7"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","2083539ce63abf615f97e22af769c459"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","a03f5783244490e022bfdee9bc36c1d8"],["bower_components/polymer/lib/legacy/polymer-fn.html","5d99aef273c86bd97b5b35b1252e660a"],["bower_components/polymer/lib/legacy/polymer.dom.html","40839739ebfc3eb5282a7e8ac9c4dbaf"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","b68221cfeaa232f815aa9eac5d307d22"],["bower_components/polymer/lib/mixins/element-mixin.html","6f9531c70890734c8a69a62b37254bde"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","46d469e21135419c27cb129e0cbcfe2e"],["bower_components/polymer/lib/mixins/mutable-data.html","1ee8caa2078cd3302f7ceb8f169dc283"],["bower_components/polymer/lib/mixins/property-accessors.html","cd90c8922c882b362f184d57f21f03b8"],["bower_components/polymer/lib/mixins/property-effects.html","c9b6bf09486a42db58770cf87905c815"],["bower_components/polymer/lib/mixins/template-stamp.html","e1a1ff3fc2300ef7a072bae1c15c1ec4"],["bower_components/polymer/lib/utils/array-splice.html","9c1a8201554264f7ab03047243aa008e"],["bower_components/polymer/lib/utils/async.html","16db8592c7ca246f0d7ae821b2f8b7ed"],["bower_components/polymer/lib/utils/boot.html","3391dfa5a91291f9a24cc8b7ba090450"],["bower_components/polymer/lib/utils/case-map.html","64a92e8ff052e4e0eef6f91c2b377672"],["bower_components/polymer/lib/utils/debounce.html","356e336d5a023cf35f84821e37db5e5c"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","082952a0812b3387e8a40710c05987bd"],["bower_components/polymer/lib/utils/flush.html","ba27adf065d373f6b0e434d0d8ef6fd9"],["bower_components/polymer/lib/utils/gestures.html","a932c0518514a2f405087c3fbc69f126"],["bower_components/polymer/lib/utils/import-href.html","d8b6004a95ea428da210fb8ac176b583"],["bower_components/polymer/lib/utils/mixin.html","0e4ba1a810f7c2d5df89f7c41f2ffb86"],["bower_components/polymer/lib/utils/path.html","15575ff2f79d923e6f9ed443a1ea98b2"],["bower_components/polymer/lib/utils/render-status.html","60fa263b678961716ff8fe7e948c8f4a"],["bower_components/polymer/lib/utils/resolve-url.html","dfc0c7635dbb36cb322720ca162c05ec"],["bower_components/polymer/lib/utils/style-gather.html","b60d81b7ee3a04c859f1bdd2c77b0268"],["bower_components/polymer/lib/utils/templatize.html","2fc4924f6cf459f95516819dbc8033ea"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","31b98668d3a96df5ab93c6fd2dd8d6db"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","985834a8133da3bf5ef839002604a080"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","eb89d3862a054d45bdd7c0a009f0a98c"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","e6324a1b9a6f7dbac892a472464088db"],["bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","495de81020abfefd4f0e3dcff6b7fd3e"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","68bc22bcb5543e6caabd1d66dc9e1ca9"],["bower_components/webcomponentsjs/webcomponents-hi.js","0ac538bae69f6beb629d2357350041e7"],["bower_components/webcomponentsjs/webcomponents-lite.js","c89f66cb63a098895f4b1b42eb371673"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","c5f6fe397db634cde89f66c2f1bc2f62"],["index.html","6868f75edb3154783a561e75af9373bf"],["manifest.json","17e9de7a42ef99ca286f2e3252c7b544"],["src/my-auburn.html","760ba7f71033c48d67cec86cea0c2020"],["src/my-facility-maintenance.html","da66073457d1502efb65e077e6a965f0"],["src/my-icons.html","1618712b865f25904ddffef31c5d9db0"],["src/my-view404.html","30dabfac36cfbf8fd388f96c708578fa"],["src/my-welcome.html","504303baf9357c789bab2a38a7240374"],["src/shared-styles.html","d5133ed0135bb42a87b98527f8f1c7aa"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







