if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>t(e,i),h={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>h[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0865e9e19ccf2d8519419080bf2a60fd"},{url:"/_next/static/chunks/0e5ce63c-d3faeb60be6dae65.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/1231-1fe7b8c6e7234478.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/1396-8d3e5018f9945b52.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/2077-bc22ad76bd576271.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/2173-915ab78849b3db85.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/2253-de2725995823556a.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/2345-746a58374f952ab4.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/2431.0281137ef8f147a8.js",revision:"0281137ef8f147a8"},{url:"/_next/static/chunks/2439-f4e1c7ed713d10d2.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/263-49a9b04960f3e208.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/2698-5b692d54ba1bc4c3.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/2886-b21dceb008b5400a.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/307-93c81dc4689359b4.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/3213-0bfc456b63aea97f.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/3389-f48a07e1306a113a.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/3586-ca05a30484d2ec19.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/3669-3107669dfb35cada.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/3d47b92a-d90fa18102060584.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/4148-f193975156be6b60.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/479ba886-8aa2a0e143aeb596.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/4938-a3952c41895dd59d.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/500-7d4a6ba8045d2b83.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/5552-add1f21278181c39.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/5e22fd23-369750b5a1e23cf1.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/6233.08b342e87b259add.js",revision:"08b342e87b259add"},{url:"/_next/static/chunks/6543.c4fd5c526c4c3739.js",revision:"c4fd5c526c4c3739"},{url:"/_next/static/chunks/6635-bd9fade77b723d06.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/7892-6973b8c099a6b8c6.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/795d4814-53996835677a8e1b.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/798-122b732107f105d7.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/7aa4777d-2fd183547591fd25.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/8012d7e2.cfee5e9c70535fb0.js",revision:"cfee5e9c70535fb0"},{url:"/_next/static/chunks/8254-c590d2df85d2f4eb.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/8360-d4f24c0ccde37541.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/8478-5965a0d2e33ab9ee.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/8732-43a3a09a189752bb.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/8e1d74a4-12f9f2e4a8d20a15.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/9233-a960824c8d7de727.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/9763-986d88471c6e9be2.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/9c4e2130-3db92923062d6f13.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/email/page-773cafb70ec33345.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/layout-0e444eafa9db8919.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/page-59c71344f3905571.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/admin/(main)/products/%5Bbusiness%5D/page-86248094125a404f.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/admin/add/page-df672c5da661e147.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/admin/layout-59acc7474dbb91d3.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/admin/login/page-32a6b00615a6aa63.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/super/(main)/admins/page-2105c31e94c20063.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/super/(main)/categories/page-14cf60166011327d.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/super/(main)/layout-34bc44b77cfdc2dd.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/super/(main)/page-107c4bb06bccf220.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/super/(main)/schools/page-b1c6a28d31ac7357.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/super/layout-1bda6a48eac7f977.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(admins)/super/login/page-5c9512bb1d251b2a.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(user)/%5Bschool%5D/page-abff10c1a2241f2f.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(user)/layout-a3ab90782cc2c032.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/(user)/page-488c01837a480298.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/_not-found-1d235f91c2eb824f.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/error-2971dd94982432cb.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/layout-ca5177f1fb9f44b3.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/(home)/page-ea5843b6de9417ba.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/layout-b4cbd4aa7b1f8bfe.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/new-product/page-1c32e32423f6ddf1.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/orders/%5Border%5D/page-c491bc664e6bcdb8.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/orders/page-dcba15c0081cf57c.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/products/%5Bproduct%5D/page-68630b27c43e8e6d.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/products/page-6b61a3410e0812d6.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/(main)/settings/page-8f878186a875dfce.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/create/page-5a036e6da7c9d814.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/layout-31c54064c018ffe4.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/app/seller/login/page-61caf0749ec82c33.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/bc9e92e6-39b6b0c955ffcdb1.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/e34aaff9-792c067f7ed47623.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/fd9d1056-a2f1f89260d06de9.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/framework-4498e84bb0ba1830.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/main-1203090cc8ca98e4.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/main-app-698dea8456f6a855.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-6a9008760fdcd15a.js",revision:"gRxtsH-reLMHth5z7eKZh"},{url:"/_next/static/css/8aee48eb52f4c731.css",revision:"8aee48eb52f4c731"},{url:"/_next/static/css/b0dee8815aefc706.css",revision:"b0dee8815aefc706"},{url:"/_next/static/gRxtsH-reLMHth5z7eKZh/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/gRxtsH-reLMHth5z7eKZh/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/007e588278555864-s.p.woff2",revision:"aae89715baf55e61f75052b9358e39e6"},{url:"/_next/static/media/008f2e8b4aae291f-s.p.woff2",revision:"54718ab24898dc8cd382ef3f285cfd0d"},{url:"/_next/static/media/337e174c39fdff16-s.p.woff2",revision:"0489fc11192376611770e91326e8575a"},{url:"/_next/static/media/3534416bbfdcc9be-s.p.woff2",revision:"8951283ba1faa0d2c460f42df9366ca1"},{url:"/_next/static/media/3c46462b57ac880e-s.p.woff2",revision:"3942629d96d5cee049ce769cefb891e1"},{url:"/_next/static/media/4529092560591ab4-s.woff2",revision:"4f8626e31885b0732c32a2358239d9cf"},{url:"/_next/static/media/78187650dd6b50b3-s.woff2",revision:"d84d7157146a9c9347d9c07d172dc651"},{url:"/_next/static/media/b8222d26e20b2e06-s.woff2",revision:"6c7142c441804cd078afe45be959fa78"},{url:"/_next/static/media/e15aee706fa5141e-s.p.woff2",revision:"f7557400680808791cff5cc3c63fcb6b"},{url:"/icon-192x192.png",revision:"16cdca46e7460f3faf4f083182111960"},{url:"/icon-256x256.png",revision:"7bff7874cd2e8ca12551dc4f82a00731"},{url:"/icon-384x384.png",revision:"8af3e5bbc1679636d2d088173d1364ea"},{url:"/icon-512x512.png",revision:"77452efa83ef2707d8e305c5934f333f"},{url:"/imgs/1.png",revision:"2f4b2444ac914ea97f23aa692bb41d09"},{url:"/imgs/2.png",revision:"e311663778f0adc2479ccbfbc4a8bf86"},{url:"/imgs/3.png",revision:"ba6578e25f06e1f1d5b8089a151708f3"},{url:"/login/headphones.jpg",revision:"a1f21afba59887753b626396f03e928b"},{url:"/login/makeup.jpg",revision:"ebb8c4c8d159df68493d7f91fcf1ac63"},{url:"/login/smartwatch.jpg",revision:"9664192146ebfa61ae8443b740e669a3"},{url:"/login/sneakers.jpg",revision:"9c81025befa2d60305a92393ecd5a15d"},{url:"/logo.png",revision:"9ab0d34dab441dfc05fe11f648317e48"},{url:"/logo.svg",revision:"11cb5fcf62b25397ca0f1323c7dd5adc"},{url:"/manifest.json",revision:"96a931bec31ab9353856cec41c9a89c6"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
