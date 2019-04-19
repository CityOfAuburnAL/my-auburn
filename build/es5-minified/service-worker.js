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

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","499da7504e6a81bc27962db7330a2087"],["bower_components/app-layout/app-drawer/app-drawer.html","899b4c580e4cf7180cfec2891e07e82e"],["bower_components/app-layout/app-header-layout/app-header-layout.html","f92f45cdb28307e23d100de8111581af"],["bower_components/app-layout/app-header/app-header.html","897f47b476ac2ed552c4cd78b81e6096"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","6067be0559f2e78c71baa692978c3b10"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","886071cbf48064bca775e06ec8e6d80e"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","72bd6e4c581a3d0232f4b31b1fe2b341"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","74151f1d340a317bf6f9c9d02a777344"],["bower_components/app-layout/app-scroll-effects/effects/material.html","b948c0619fd9f2833f1b4166045b415f"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","723d241b3047b5d24e80307012c02912"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","3ac33f76fc37c074e36acad9d948fd96"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","3b7d168fafcc296b516b19c238ce7b24"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","665dc9bd3a3f66975382149f440fdfac"],["bower_components/app-layout/app-toolbar/app-toolbar.html","cac42c92a39fd9611d080d1362905030"],["bower_components/app-layout/helpers/helpers.html","9d316f2db7197864684c38ccb7b2297b"],["bower_components/app-route/app-location.html","4b3fa0cb3b1af2c1ccc92587b25b1913"],["bower_components/app-route/app-route-converter-behavior.html","ab302160ad8b1bdf4e06d29b674751f2"],["bower_components/app-route/app-route.html","262f9b8a6eaaee07a5250736ca4425b6"],["bower_components/coa-ajax/coa-ajax.html","1d9b99b2ff6648aa9051209d588d39d1"],["bower_components/coa-user/coa-user.html","4cb1364c375cced802bbc43178922a25"],["bower_components/font-roboto/roboto.html","22fe760d42278ca3b2b3718390fbb1bd"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","26ca0615d1958492c0589e7d47e6d4e8"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","214b7ed364030386c0f9ad51a6e8a5c0"],["bower_components/iron-ajax/iron-ajax.html","da6640bab37c14ca818d5bb4faf1bd88"],["bower_components/iron-ajax/iron-request.html","a2373a1c184b1568160b7635236926fa"],["bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","30b61f05aeb4fc1b6c09f35f441bc86b"],["bower_components/iron-behaviors/iron-button-state.html","d8f74265f517dc1edfef7d4dc47f8d7e"],["bower_components/iron-behaviors/iron-control-state.html","971b28a26e537e2c9f581b45d1d3d2a7"],["bower_components/iron-flex-layout/iron-flex-layout.html","3e285c2698feec264710fffd609630ad"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","1856c886fd1b03a96ae6df3db6796e9b"],["bower_components/iron-icon/iron-icon.html","c82f7863797094f8fc5c00a4b8a36573"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","dd034384d697a0e8694e3a545cfd8a2f"],["bower_components/iron-input/iron-input.html","04148d43c6c3adeb561894ca75a41f2a"],["bower_components/iron-location/iron-location.html","dd09b1424b62f092da5f03140e62eceb"],["bower_components/iron-location/iron-query-params.html","37a5c897abd44fb158e7acd63bc28b9a"],["bower_components/iron-media-query/iron-media-query.html","2452503079d0a3cef2bcff004d5c8ea8"],["bower_components/iron-meta/iron-meta.html","f6834d9c2826a3bfa6cbdf4afd239a6c"],["bower_components/iron-pages/iron-pages.html","36a8ff3259cda98c825e940ef9ee6436"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","02227937bcb372ff5ce9a484e108f352"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","b116b815dc1ad2c7aba6e7ef4f1b88a2"],["bower_components/iron-selector/iron-multi-selectable.html","1bf080a64d44c8f2309d7db0fa8c0ed8"],["bower_components/iron-selector/iron-selectable.html","02b12cbd8e9a77f64e3ae47729c95baa"],["bower_components/iron-selector/iron-selection.html","37263b189d9881ccbe86e391625d0545"],["bower_components/iron-selector/iron-selector.html","b16e67c27ef856b12149a467cc5223b0"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","efbc5b717b88bffec57c4009237c8b3b"],["bower_components/paper-behaviors/paper-button-behavior.html","2dc5b49def828a802dc64b891c628316"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","eacb4b0c1516411b27c8880c2890fcc0"],["bower_components/paper-behaviors/paper-ripple-behavior.html","8d558844974d32f9b060c6df7e902f88"],["bower_components/paper-button/paper-button.html","6e530cba122b581b4f9b4cf0708958db"],["bower_components/paper-icon-button/paper-icon-button.html","6aba788a3416e3768bd95175364d8060"],["bower_components/paper-input/paper-input-addon-behavior.html","55ea37e8a0001f220178fac0a0c4cccd"],["bower_components/paper-input/paper-input-behavior.html","93485a24fb403aba762f5f3ec93bc158"],["bower_components/paper-input/paper-input-char-counter.html","8198f008b7ec009f2377b3c48ad4d32f"],["bower_components/paper-input/paper-input-container.html","c1383edf9e7f1ffd8e49b298d09bb29a"],["bower_components/paper-input/paper-input-error.html","fe4e8a3a47f3e5d0c399d199e2981f89"],["bower_components/paper-input/paper-input.html","69698bfd0b779685a1ac817ce97285ce"],["bower_components/paper-input/paper-textarea.html","e201162f201a7104c16956c4a5675cb3"],["bower_components/paper-ripple/paper-ripple.html","c89c00fe92815709a7d1972538a6f744"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/polymer/lib/elements/array-selector.html","cab5f7b8bce02b3d632a19fb8c372d46"],["bower_components/polymer/lib/elements/custom-style.html","583981b00e9d31efec919bb6d4ad0b7d"],["bower_components/polymer/lib/elements/dom-bind.html","9fc72e82de0acdc3956120d119e394a7"],["bower_components/polymer/lib/elements/dom-if.html","ba2fb160eae4efcfb912f6920d8c254c"],["bower_components/polymer/lib/elements/dom-module.html","ae36fc95c5ff3c0d05b8b9856701326d"],["bower_components/polymer/lib/elements/dom-repeat.html","bd483be4b6aceee8be965b810df15330"],["bower_components/polymer/lib/legacy/class.html","b527bf3b6df2282454252a534d4335ab"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","801a2ea162816e6eb2f3081d0bb83027"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","88d354a4884a6e0ad89a5b3df68e7832"],["bower_components/polymer/lib/legacy/polymer-fn.html","c8e3c17a270dca9b45abe1a1b8a63f93"],["bower_components/polymer/lib/legacy/polymer.dom.html","33b4cba07336e4244e6a74c358484fc5"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","0cc80eb910a7a9a4e3d44e0a30a24bbe"],["bower_components/polymer/lib/mixins/element-mixin.html","659b011549f86e4325c5727fc6c3448d"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","287c19447d3a60fbd716d134297e230d"],["bower_components/polymer/lib/mixins/mutable-data.html","c6105c52dcc7204ccc1a49e382df48cd"],["bower_components/polymer/lib/mixins/property-accessors.html","b04337056e9d644708e0b368e8d80489"],["bower_components/polymer/lib/mixins/property-effects.html","9f58b513ebc66c0cd8f563771c43b3ba"],["bower_components/polymer/lib/mixins/template-stamp.html","4dced3f4be3f431058bb0ce4ab105fad"],["bower_components/polymer/lib/utils/array-splice.html","8d60febfb27aaeedf47f43ff7b11ddb1"],["bower_components/polymer/lib/utils/async.html","d2953162092f5b3f5c00b2a4a6e0f258"],["bower_components/polymer/lib/utils/boot.html","f723125c9462e801e0421a8e30c968d3"],["bower_components/polymer/lib/utils/case-map.html","953a3db276974a4aafd8ac900bbf9ee1"],["bower_components/polymer/lib/utils/debounce.html","6b32d5b14570f9be0b74ee1b06a672d2"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","039f9c015dba68d9efa2485ee7f5b5fc"],["bower_components/polymer/lib/utils/flush.html","51af95ddb265d8dd5ca2ea77000cf8e2"],["bower_components/polymer/lib/utils/gestures.html","c8f6d4bbc6722386ed57023048dbd56d"],["bower_components/polymer/lib/utils/import-href.html","efb0710511a5d33db257daa807467f74"],["bower_components/polymer/lib/utils/mixin.html","c2827a63bc2619eefe1fb19afd37cebd"],["bower_components/polymer/lib/utils/path.html","dcdaec1c85c22a6d94dbb49fee1f00ee"],["bower_components/polymer/lib/utils/render-status.html","1b3477e684f3911b0d45c3261cc7aa11"],["bower_components/polymer/lib/utils/resolve-url.html","13046ef2ff0c3c3291c0c68c28038a43"],["bower_components/polymer/lib/utils/style-gather.html","9ee7d33146fa76cac1dbc785d54aca42"],["bower_components/polymer/lib/utils/templatize.html","a492b79fec1abca3157deb97fa761fbe"],["bower_components/polymer/lib/utils/unresolved.html","50b8ec3ab60b6b40f4cf4fc931027b80"],["bower_components/polymer/polymer-element.html","65481e12cd5a762b307d8d83a7668241"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","9554c315a9b688e4ebcd17714b5db747"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","fc9d850cc79c1cb631840a250f061025"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","e6324a1b9a6f7dbac892a472464088db"],["bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","495de81020abfefd4f0e3dcff6b7fd3e"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","68bc22bcb5543e6caabd1d66dc9e1ca9"],["bower_components/webcomponentsjs/webcomponents-hi.js","0ac538bae69f6beb629d2357350041e7"],["bower_components/webcomponentsjs/webcomponents-lite.js","c89f66cb63a098895f4b1b42eb371673"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","c5f6fe397db634cde89f66c2f1bc2f62"],["index.html","4ca6b60437dd8a3b610dfccf0aac1196"],["manifest.json","17e9de7a42ef99ca286f2e3252c7b544"],["src/my-auburn.html","4a058e94e10aa976507c051c88df6a59"],["src/my-facility-maintenance.html","4877e12137bde85f5cafc8dc5a534e20"],["src/my-icons.html","1618712b865f25904ddffef31c5d9db0"],["src/my-view404.html","85ee11b222238714a7ead99c2675d3bc"],["src/my-welcome.html","85aea605a7653aab56d387533bcb77cd"],["src/shared-styles.html","d5133ed0135bb42a87b98527f8f1c7aa"]];
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

    return bodyPromise.then(function (body) {
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
    return whitelist.some(function (whitelistedPathRegex) {
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
      .map(function (kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function (kv) {
        return ignoreUrlParametersMatching.every(function (ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function (kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function (item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function (response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function (event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingRequests) {
        return Promise.all(
          existingRequests.map(function (existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function () {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function (event) {
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
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function (e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







