if(!self.define){let s,e={};const i=(i,c)=>(i=new URL(i+".js",c).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(c,n)=>{const a=s||("document"in self?document.currentScript.src:"")||location.href;if(e[a])return;let t={};const u=s=>i(s,a),r={module:{uri:a},exports:t,require:u};e[a]=Promise.all(c.map((s=>r[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-9b4d2a02"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d4301410b0fda066f9575d088d791f22"},{url:"/_next/static/chunks/0e5ce63c-75ba1af430444c98.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/1095-c985eebb15176122.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/1379-26b105876511016a.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/1396-e0862d270d303998.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/1858-ec227f0956429026.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/2142-88d6543f4e6ff08f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/2173-74de7c61f5b566a1.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/2345-746a58374f952ab4.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/2431.0281137ef8f147a8.js",revision:"0281137ef8f147a8"},{url:"/_next/static/chunks/2439-63c78d3a6ab0cbb3.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/2623-3a400c92a85dc1da.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/2698-073bc0dd5c7120dd.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/2886-0ba606abafc56cac.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/3080-a7b054941fdf0626.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/3193-b3100a338a313c74.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/3322-c32e556c6fd6906f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/3586-ca05a30484d2ec19.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/3d47b92a-d90fa18102060584.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/4138-f1a26a6f60df131e.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/4205-699f55cc6f405ffc.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/4266-ede312e690b07af2.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/479ba886-8aa2a0e143aeb596.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/4938-a3952c41895dd59d.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/500-b523b507e7ffdbc2.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/5050-25174d155e2be76f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/53c13509-bf3cef17787cf831.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/5e22fd23-369750b5a1e23cf1.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/6109-42d86736e701bdf4.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/6233.08b342e87b259add.js",revision:"08b342e87b259add"},{url:"/_next/static/chunks/6543.5ea292c927ffa5a1.js",revision:"5ea292c927ffa5a1"},{url:"/_next/static/chunks/6691-da7e805cd8106e4a.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/715-a79173e58f21faed.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/7460-c2ade2c2b0ba4676.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/7945-6326b77b477bc0c2.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/795d4814-364c9cd5cfc29015.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/7aa4777d-d02f204aa31c09f8.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/8012d7e2.cfee5e9c70535fb0.js",revision:"cfee5e9c70535fb0"},{url:"/_next/static/chunks/8046-77bb2562341f4d96.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/8412-96313fcaddb84b8f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/8529-93325d19027c8216.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/8682-24e75812e7ec962f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/8732-43a3a09a189752bb.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/8e1d74a4-aba463c795f0ff6d.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/9285-a2ca201b09385e81.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/9386-5ef9fef1f4e0cb4e.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/9c4e2130-e18fb533a07295e9.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/email/page-1e80a1d0efd2ca48.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/layout-806840e71a38600f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/page-e9372824cef1f5ff.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/products/%5Bbusiness%5D/page-ed26af416feee814.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/admin/add/page-9e2da9ea18a0c99c.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/admin/layout-591420a258af3227.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/admin/login/page-dd1db7cd4eaacccd.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/super/(main)/admins/page-904afc0a72e63087.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/super/(main)/categories/page-a3eb537481b7078e.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/super/(main)/layout-241f215bfc568e7c.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/super/(main)/page-b07b3bbbb9946c6a.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/super/(main)/schools/page-c0de8d3c88fc50e5.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/super/layout-2251f0742e0e0c3b.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(admins)/super/login/page-9b6e3b63ba500055.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(user)/%5Bschool%5D/page-b4ca39274b850cea.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(user)/layout-17148865116a7655.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/(user)/page-402c7ddb98914376.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/_not-found-1d235f91c2eb824f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/error-2971dd94982432cb.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/layout-622e31f937e3e761.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/(home)/page-cb4f9dc9a1996f2e.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/layout-9416ac888e7955ec.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/new-product/page-53c1f0869de9c1aa.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/orders/%5Border%5D/page-fc298821ff0d3fd1.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/orders/create/page-0b981d9a2fd54468.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/orders/page-38e1d5d7f1b7d606.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/products/%5Bproduct%5D/page-ce489ed3f8054712.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/products/page-a217acffde48bbf6.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/(main)/settings/page-f2ea028c4b10c0f5.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/forgot-password/page-cda1b41ca4633222.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/layout-148ab265d6b26090.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/login/page-80704f4d0e747583.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/app/seller/register/page-9088a43f2be01e6f.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/bc9e92e6-39b6b0c955ffcdb1.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/e34aaff9-792c067f7ed47623.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/eec3d76d-858fba1323d5208c.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/fd9d1056-a2f1f89260d06de9.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/main-a8cd9467d266db10.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/main-app-698dea8456f6a855.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-29b59eaa1956f8cf.js",revision:"uAcsTO5FLRbdliKyb3B95"},{url:"/_next/static/css/8aee48eb52f4c731.css",revision:"8aee48eb52f4c731"},{url:"/_next/static/css/f4c0c3ca27398134.css",revision:"f4c0c3ca27398134"},{url:"/_next/static/media/007e588278555864-s.p.woff2",revision:"aae89715baf55e61f75052b9358e39e6"},{url:"/_next/static/media/008f2e8b4aae291f-s.p.woff2",revision:"54718ab24898dc8cd382ef3f285cfd0d"},{url:"/_next/static/media/337e174c39fdff16-s.p.woff2",revision:"0489fc11192376611770e91326e8575a"},{url:"/_next/static/media/3534416bbfdcc9be-s.p.woff2",revision:"8951283ba1faa0d2c460f42df9366ca1"},{url:"/_next/static/media/3c46462b57ac880e-s.p.woff2",revision:"3942629d96d5cee049ce769cefb891e1"},{url:"/_next/static/media/4529092560591ab4-s.woff2",revision:"4f8626e31885b0732c32a2358239d9cf"},{url:"/_next/static/media/78187650dd6b50b3-s.woff2",revision:"d84d7157146a9c9347d9c07d172dc651"},{url:"/_next/static/media/b8222d26e20b2e06-s.woff2",revision:"6c7142c441804cd078afe45be959fa78"},{url:"/_next/static/media/e15aee706fa5141e-s.p.woff2",revision:"f7557400680808791cff5cc3c63fcb6b"},{url:"/_next/static/uAcsTO5FLRbdliKyb3B95/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/uAcsTO5FLRbdliKyb3B95/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"16cdca46e7460f3faf4f083182111960"},{url:"/icon-256x256.png",revision:"7bff7874cd2e8ca12551dc4f82a00731"},{url:"/icon-384x384.png",revision:"8af3e5bbc1679636d2d088173d1364ea"},{url:"/icon-512x512.png",revision:"77452efa83ef2707d8e305c5934f333f"},{url:"/imgs/1.png",revision:"2f4b2444ac914ea97f23aa692bb41d09"},{url:"/imgs/2.png",revision:"e311663778f0adc2479ccbfbc4a8bf86"},{url:"/imgs/3.png",revision:"ba6578e25f06e1f1d5b8089a151708f3"},{url:"/login/headphones.jpg",revision:"a1f21afba59887753b626396f03e928b"},{url:"/login/makeup.jpg",revision:"ebb8c4c8d159df68493d7f91fcf1ac63"},{url:"/login/smartwatch.jpg",revision:"9664192146ebfa61ae8443b740e669a3"},{url:"/login/sneakers.jpg",revision:"9c81025befa2d60305a92393ecd5a15d"},{url:"/logo.png",revision:"9ab0d34dab441dfc05fe11f648317e48"},{url:"/logo.svg",revision:"11cb5fcf62b25397ca0f1323c7dd5adc"},{url:"/manifest.json",revision:"96a931bec31ab9353856cec41c9a89c6"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:i,state:c})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
