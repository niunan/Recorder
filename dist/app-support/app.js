/*
录音
https://github.com/xiangyuecn/Recorder
src: app-support/app.js,app-support/app-ios-weixin-support.js,app-support/app-native-support.js
*/
!function(n){"use strict";var t=/MicroMessenger/i.test(navigator.userAgent),e=n.RecordAppBaseFolder||"/Recorder/dist/",o=n.OnRecordAppInstalled,u=[{Key:"Native",Support:function(e){l.AlwaysAppUseJS?e(!1):r.Config.IsApp(e)},CanProcess:function(){return!0},Config:{IsApp:function(e){e(!1)},JsBridgeRequestPermission:function(e,n){n("JsBridgeRequestPermission未实现")},JsBridgeStart:function(e,n,t){t("JsBridgeStart未实现")},JsBridgeStop:function(e,n){n("JsBridgeStop未实现")},paths:[{url:e+"app-support/app-native-support.js",check:function(){return!r.IsInit}}]},ExtendDefault:!0},{Key:"IOS-Weixin",Support:function(e){l.AlwaysUseWeixinJS||!Recorder.Support()?e(t):e(!1)},CanProcess:function(){return!1},Config:{WxReady:function(e){e(null,"未实现IOS-Weixin.Config.WxReady")},DownWxMedia:function(e,n,t){t("下载素材接口DownWxMedia未实现")},paths:[{url:e+"app-support/app-ios-weixin-support.js",check:function(){return!i.IsInit}},{url:e+"engine/beta-amr.js",check:function(){return!Recorder.prototype.amr}}]},ExtendDefault:!0},{Key:"Default",Support:function(e){e(!0)},CanProcess:function(){return!0},Config:{paths:[{url:e+"recorder-core.js",check:function(){return!n.Recorder}},{url:e+"engine/mp3.js",check:function(){return!Recorder.prototype.mp3}}]}}],r=u[0],i=u[1],f=u[2];f.RequestPermission=function(e,n){var t=l.__Rec;t&&(t.close(),l.__Rec=null);var o=Recorder();o.open(function(){e()},n)},f.Start=function(e,n,t){var o=l.__Rec;null!=o&&o.close(),l.__Rec=o=Recorder(e),o.appSet=e,o.open(function(){o.start(),n()},function(e){t(e)})},f.Stop=function(t,n){var o=l.__Rec;if(!o)return Recorder.IsOpen()&&((o=Recorder()).open(),o.close()),void n("未开始录音");var r=function(){for(var e in o.close(),o.set)o.appSet[e]=o.set[e]};o.stop(function(e,n){r(),t(e,n),l.__Rec=null},function(e){r(),n(e),l.__Rec=null})};var l={LM:"2019-10-26 11:23:48",Current:0,IsWx:t,BaseFolder:e,AlwaysUseWeixinJS:!1,AlwaysAppUseJS:!1,Platforms:{Native:r,Weixin:i,Default:f},Js:function(r,i,s,e){var c=(e=e||n).document,a=function(e){if(e>=r.length)i();else{var n=r[e],t=n.url;if(!1!==n.check()){var o=c.createElement("script");o.setAttribute("type","text/javascript"),o.setAttribute("src",t),o.onload=function(){a(e+1)},o.onerror=function(e){s("请求失败:"+(e.message||"-")+"，"+t)},c.body.appendChild(o)}else a(e+1)}};a(0)},Install:function(t,o){var r=l.__reqs||(l.__reqs=[]);r.push({s:t,f:o}),t=function(){i("s",arguments)},o=function(e,n){i("f",arguments)};var i=function(e,n){for(var t=0;t<r.length;t++)r[t][e].apply(null,n);r.length=0};if(!(1<r.length)){var s=0,c=function(n,e){if(n.IsInit)e();else{var t=n.Config;l.Js(t.paths,function(){n.IsInit=!0,e()},function(e){e="初始化js库失败："+e,console.log(e,n),o(e)})}},a=function(n){if(n)l.Current=n,t();else{var e=function(){n.Support(function(e){e?c(n,function(){a(n)}):(s++,a())})};(n=u[s]).ExtendDefault?c(f,e):e()}};a(l.Current)}},GetStartUsedRecOrNull:function(){return l.__Rec||null},RequestPermission:function(n,t){l.Install(function(){var e=l.Current;console.log("开始请求"+e.Key+"录音权限"),e.RequestPermission(function(){console.log("录音权限请求成功"),n&&n()},function(e,n){console.log("录音权限请求失败："+e+",isUserNotAllow:"+n),t&&t(e,n)})},function(e){console.log("Install失败",e),t&&t(e)})},Start:function(e,n,t){var o=l.Current;if(o){e||(e={});var r={type:"mp3",sampleRate:16e3,bitRate:16,onProcess:function(){}};for(var i in r)e[i]||(e[i]=r[i]);o.Start(e,function(){console.log("开始录音",e),n&&n()},function(e){console.log("开始录音失败："+e),t&&t(e)})}else t&&t("需先调用RequestPermission")},Stop:function(t,n){var e=l.Current;e?e.Stop(function(e,n){console.log("结束录音"+e.size+"b "+n+"ms",e),t&&t(e,n)},function(e){console.log("结束录音失败："+e),n&&n(e)}):n&&n("需先调用RequestPermission")}};n.RecordApp=l,o&&o()}(window),"function"==typeof define&&define.amd&&define(function(){return RecordApp}),"object"==typeof module&&module.exports&&(module.exports=RecordApp),function(){"use strict";var i=RecordApp.Platforms.Weixin,R=i.Config;i.IsInit=!0;var s,c,a={};i.RequestPermission=function(t,o){R.WxReady(function(e,n){a.wx=null,n?o("微信JsSDK准备失败："+n):(a.wx=e,c?u(function(){i.RequestPermission(t,o)}):e.startRecord({success:function(){setTimeout(function(){g(function(e){!e||/short/i.test(e)?t():o("清理资源出错："+e)})},100)},fail:function(e){o("无法录音："+e.errMsg)},cancel:function(e){o("用户不允许录音："+e.errMsg,!0)}}))})};var g=function(n){s=c=0,a.wx.stopRecord({success:function(){n&&n()},fail:function(e){n&&n("无法结束录音："+e.errMsg)}})},u=function(e){console.warn("录音中，正在kill重试"),g(function(){setTimeout(e,300)})};i.Start=function(e,n,t){var o=a.wx;if(o)if(c)u(function(){i.Start(e,n,t)});else{if(s)return console.log("等待上次wx.startRecord回调后重试"),void setTimeout(function(){i.Start(e,n,t)},600);c=0,s=1;var r=function(e){s=0,t("无法录音："+e.errMsg),g()};o.startRecord({success:function(){c=1,s=0,a.startTime=Date.now(),a.start=e,n()},fail:r,cancel:r}),a.timeout=[],a.err="",o.onVoiceRecordEnd({complete:function(e){var n=Date.now();a.timeout.push({res:e,duration:n-a.startTime,time:n}),console.log("微信录音超时，正在重启..."),o.startRecord({success:function(){a.startTime=Date.now(),console.log("已接续录音,中断"+(Date.now()-n)+"ms")},fail:function(e){var n="无法接续录音："+e.errMsg;console.error(n,e),a.err=n}})}})}else t("请先调用RequestPermission")},i.Stop=function(l,n){var p=function(e){n("录音失败："+(e.errMsg||e))},d=a.start;if(d){a.start=null;var v={list:[]};d.DownWxMediaData=v;var u=function(){var r=v.list,e=r[0];if(e.duration){for(var n=atob(e.data),t=n.length,o=new Uint8Array(t);t--;)o[t]=n.charCodeAt(t);var i=new Blob([o.buffer],{type:e.mime});l(i,e.duration)}else{var s=[],c=0,a=0,u=0,f=function(){if(u||(u=Date.now()),a>=r.length)return v.decodeTime=Date.now()-u,void function(){c||(c=Date.now());for(var e=[],n=0;n<s.length;n++)for(var t=s[n],o=0;o<t.length;o++)e.push(t[o]);var r=Recorder(d).mock(e,8e3);r.stop(function(e,n){for(var t in v.encodeTime=Date.now()-c,r.set)d[t]=r.set[t];l(e,n)},p)}();var e=r[a];e.duration=m[a].duration,e.isAmr=!0;for(var n=atob(e.data),t=n.length,o=new Uint8Array(t);t--;)o[t]=n.charCodeAt(t);Recorder.AMR.decode(o,function(e){s.push(e),a++,f()},function(e){p("AMR音频"+(a+1)+"无法解码:"+e)})};Recorder.AMR?f():p("未加载AMR转换引擎")}},f=[],t=function(){for(var n=[],e=0;e<m.length;e++)n.push(m[e].res.localId);console.log("结束录音共"+n.length+"段，开始上传下载");var t=0,o=0,r=function(){v.downTime=Date.now()-o,u()},i=function(){if(o||(o=Date.now()),t>=f.length)r();else{var e=f[t];R.DownWxMedia({mediaId:e,transform_mediaIds:f.join(","),transform_type:d.type,transform_bitRate:d.bitRate,transform_sampleRate:d.sampleRate},function(e){v.list.push(e),e.duration?r():/amr/i.test(e.mime)?(t++,i()):p("微信服务器返回了未知音频类型："+e.mime)},function(e){p("下载音频失败："+e)})}},s=0,c=function(){if(s>=n.length)return v.uploadTime=Date.now()-a,void i();var e=n[s];console.log("微信录音片段"+s+" wx.playVoice({localId:'"+e+"'})"),wx.uploadVoice({localId:e,isShowProgressTips:0,fail:p,success:function(e){var n=e.serverId;console.log("serverId:"+n),f.push(n),s++,c()}})},a=Date.now();c()},m=a.timeout;if(a.err)return console.error(a.err,m),void p("录制失败，已录制"+m.length+"分钟，但后面出错："+a.err);if(m.length&&Date.now()-m[m.length-1].time<900)return g(),void t();c=0,a.wx.stopRecord({fail:p,success:function(e){var n=Date.now();m.push({res:e,duration:n-a.startTime,time:n}),t()}})}else p("未开始录音")}}(),function(){"use strict";var i=RecordApp,e=i.Platforms.Native,s=e.Config;e.IsInit=!0;var f=window.NativeRecordReceivePCM=window.top.NativeRecordReceivePCM=function(e,n){var t=f.rec;if(t){t._appStart||t.envStart(1,n),t._appStart=1;for(var o,r=atob(e),i=r.length,s=new Int16Array(i/2),c=0,a=0,u=0;u+2<=i;a++,u+=2)o=(r.charCodeAt(u)|r.charCodeAt(u+1)<<8)<<16>>16,s[a]=o,c+=Math.abs(o);t.envIn(s,c)}else console.error("未开始录音，但收到Native PCM数据")};e.RequestPermission=function(e,n){s.JsBridgeRequestPermission(e,n)},e.Start=function(e,n,t){f.param=e;var o=Recorder(e);o.set.disableEnvInFix=!0,f.rec=o,i.__Rec=o,s.JsBridgeStart(e,n,t)},e.Stop=function(o,n){var r=function(e){n(e),f.rec=null,i.__Rec=null};s.JsBridgeStop(function(){var n=f.rec;if(f.rec=null,n){console.log("rec encode start: pcm:"+n.recSize+" src:"+n.srcSampleRate+" set:"+JSON.stringify(f.param));var t=function(){for(var e in n.set)f.param[e]=n.set[e]};n.stop(function(e,n){console.log("rec encode end"),t(),o(e,n),i.__Rec=null},function(e){t(),r(e)})}else r("未开始录音")},r)}}();