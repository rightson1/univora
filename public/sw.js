if(!self.define){let e,s={};const u=(u,n)=>(u=new URL(u+".js",n).href,s[u]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=u,e.onload=s,document.head.appendChild(e)}else e=u,importScripts(u),s()})).then((()=>{let e=s[u];if(!e)throw new Error(`Module ${u} didn’t register its module`);return e})));self.define=(n,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const c=e=>u(e,a),r={module:{uri:a},exports:t,require:c};s[a]=Promise.all(n.map((e=>r[e]||c(e)))).then((e=>(i(...e),t)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"00a80b35140452ddeddd060e4340a34d"},{url:"/_next/static/3NZuU968luWhP0C3BuAgU/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/3NZuU968luWhP0C3BuAgU/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-d3faeb60be6dae65.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/1127-16b09d2e62a14f1c.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/1396-8d3e5018f9945b52.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/2077-bc22ad76bd576271.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/2173-915ab78849b3db85.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/2253-de2725995823556a.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/2345-746a58374f952ab4.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/2431.0281137ef8f147a8.js",revision:"0281137ef8f147a8"},{url:"/_next/static/chunks/2439-f4e1c7ed713d10d2.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/263-49a9b04960f3e208.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/2698-5b692d54ba1bc4c3.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/2886-a81d70b32cefcd75.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/3039-c75fdc879049f4e8.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/307-93c81dc4689359b4.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/3441-d8768884019f2bb9.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/3669-3107669dfb35cada.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/3d47b92a-d90fa18102060584.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/4148-f193975156be6b60.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/418-e6b2ba1712ab29f6.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/4266-96c8aca3abf96fdf.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/479ba886-8aa2a0e143aeb596.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/4810-0b028a67c90e1056.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/4938-a3952c41895dd59d.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/500-d81e41288eb946f8.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/5530-999a0ff31b707c4c.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/5e22fd23-369750b5a1e23cf1.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/6233.08b342e87b259add.js",revision:"08b342e87b259add"},{url:"/_next/static/chunks/6543.b5072240b49ade40.js",revision:"b5072240b49ade40"},{url:"/_next/static/chunks/6588-49606bf57231e0fb.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/6632-40bd6496353c6121.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/740-1f47cb0749554cb8.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/773-80bb1ebd2aa9031a.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/795d4814-53996835677a8e1b.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/798-122b732107f105d7.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/7aa4777d-2fd183547591fd25.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8012d7e2.cfee5e9c70535fb0.js",revision:"cfee5e9c70535fb0"},{url:"/_next/static/chunks/8046-94569193d7a41868.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8230-4c81c164f60acfab.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8254-ebf55d8075c57bf8.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8408-d6de82ab2210c61e.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8478-d82c5d3276523da1.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8732-43a3a09a189752bb.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8966-1b513bb0eb474fbd.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/8e1d74a4-12f9f2e4a8d20a15.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/9233-a960824c8d7de727.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/9763-986d88471c6e9be2.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/9c4e2130-3db92923062d6f13.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/email/page-03b16a6f06275020.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/layout-133af1270211e935.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/page-683b06872441cb54.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/products/%5Bbusiness%5D/page-68461a9069c514ba.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/admin/add/page-8ebbb573141ae21e.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/admin/layout-ff991c66ee64a028.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/admin/login/page-7e8a43f00289e7b8.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/super/(main)/admins/page-2960c79066b4eb1c.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/super/(main)/categories/page-ca2d8d1875c2d0b7.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/super/(main)/layout-63c2a8cedf0c9e42.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/super/(main)/page-07f98d29ef427d9b.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/super/(main)/schools/page-e79a299ff702ccf3.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/super/layout-f1bb882221373e9a.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(admins)/super/login/page-f5163aa54cde531c.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(user)/%5Bschool%5D/page-68013b5d51b93d0e.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(user)/layout-e4f10c9492b54a2e.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/(user)/page-7b12f8d61e2c8ac7.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/_not-found-1d235f91c2eb824f.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/error-2971dd94982432cb.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/layout-a6dcfd4d39e2d4b3.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/(home)/page-f477dbaf46fe1880.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/layout-729a51835148b714.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/new-product/page-3a55a799e257c888.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/orders/%5Border%5D/page-673e5ec7f117f240.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/orders/page-b42a01c937c237e0.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/products/%5Bproduct%5D/page-33bf41d173417d36.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/products/page-bcdc1df63d1d18a4.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/(main)/settings/page-df5e03bf32fc3a47.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/create/page-760b21e6323460d8.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/layout-ffb27241ca76eccf.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/app/seller/login/page-e6a0cdb2351669a7.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/bc9e92e6-39b6b0c955ffcdb1.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/e34aaff9-792c067f7ed47623.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/fd9d1056-a2f1f89260d06de9.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/main-71a132226553869b.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/main-app-698dea8456f6a855.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-4c1f690b8e0de800.js",revision:"3NZuU968luWhP0C3BuAgU"},{url:"/_next/static/css/1aa163429cb09119.css",revision:"1aa163429cb09119"},{url:"/_next/static/css/8aee48eb52f4c731.css",revision:"8aee48eb52f4c731"},{url:"/_next/static/media/007e588278555864-s.p.woff2",revision:"aae89715baf55e61f75052b9358e39e6"},{url:"/_next/static/media/008f2e8b4aae291f-s.p.woff2",revision:"54718ab24898dc8cd382ef3f285cfd0d"},{url:"/_next/static/media/337e174c39fdff16-s.p.woff2",revision:"0489fc11192376611770e91326e8575a"},{url:"/_next/static/media/3534416bbfdcc9be-s.p.woff2",revision:"8951283ba1faa0d2c460f42df9366ca1"},{url:"/_next/static/media/3c46462b57ac880e-s.p.woff2",revision:"3942629d96d5cee049ce769cefb891e1"},{url:"/_next/static/media/4529092560591ab4-s.woff2",revision:"4f8626e31885b0732c32a2358239d9cf"},{url:"/_next/static/media/78187650dd6b50b3-s.woff2",revision:"d84d7157146a9c9347d9c07d172dc651"},{url:"/_next/static/media/b8222d26e20b2e06-s.woff2",revision:"6c7142c441804cd078afe45be959fa78"},{url:"/_next/static/media/e15aee706fa5141e-s.p.woff2",revision:"f7557400680808791cff5cc3c63fcb6b"},{url:"/icon-192x192.png",revision:"16cdca46e7460f3faf4f083182111960"},{url:"/icon-256x256.png",revision:"7bff7874cd2e8ca12551dc4f82a00731"},{url:"/icon-384x384.png",revision:"8af3e5bbc1679636d2d088173d1364ea"},{url:"/icon-512x512.png",revision:"77452efa83ef2707d8e305c5934f333f"},{url:"/imgs/1.png",revision:"2f4b2444ac914ea97f23aa692bb41d09"},{url:"/imgs/2.png",revision:"e311663778f0adc2479ccbfbc4a8bf86"},{url:"/imgs/3.png",revision:"ba6578e25f06e1f1d5b8089a151708f3"},{url:"/login/headphones.jpg",revision:"a1f21afba59887753b626396f03e928b"},{url:"/login/makeup.jpg",revision:"ebb8c4c8d159df68493d7f91fcf1ac63"},{url:"/login/smartwatch.jpg",revision:"9664192146ebfa61ae8443b740e669a3"},{url:"/login/sneakers.jpg",revision:"9c81025befa2d60305a92393ecd5a15d"},{url:"/logo.png",revision:"9ab0d34dab441dfc05fe11f648317e48"},{url:"/logo.svg",revision:"11cb5fcf62b25397ca0f1323c7dd5adc"},{url:"/manifest.json",revision:"96a931bec31ab9353856cec41c9a89c6"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:u,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
