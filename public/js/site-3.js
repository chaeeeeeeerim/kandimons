const w=window.innerWidth;const r='Report Ad';
if(w<768&&true){
  window['nitroAds'].createAd('mobile_top_inline',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:false,refreshVisibleOnly:true,visibleMargin:50,sizes:[['320','50']],report:{enabled:true,wording:r,position:'top-right'}});
  window['nitroAds'].createAd('mobile_bottom_inline',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:false,refreshVisibleOnly:true,visibleMargin:100,sizes:[['336','280'],['300','250'],['320','100'],['320','50']],report:{enabled:true,wording:r,position:'bottom-right'}});
  if(false){window['nitroAds'].createAd('mobile_bottom_inline2',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:true,refreshVisibleOnly:true,visibleMargin:50,sizes:[['300','250'],['320','100'],['320','50']],report:{enabled:true,wording:r,position:'bottom-right'}});}
  window['nitroAds'].createAd('mobile_bottom_anchor_lb',{refreshLimit:0,refreshTime:30,demo:false,format:'anchor',anchor:'bottom',anchorBgColor:'rgba(0,0,0,0.333)',anchorClose:true,anchorPersistClose:false,report:{enabled:true,wording:r,position:'top-right'},mediaQuery:'(min-width: 320px) and (max-width: 767px)'});
  if(false&&!false){window['nitroAds'].createAd('mobile_floating_video',{format:'floating',floating:{reduceMobileSize:true},report:{enabled:true,icon:true,wording:'Report Ad',position:'top-left'}});}
}
if(w>=768){
  const s=(w>=987)?[['728','90'],['970','90'],['320','50'],['320','100']]:[['728','90'],['320','50'],['320','100']];
  window['nitroAds'].createAd('desktop_top_inline_lb',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:false,refreshVisibleOnly:true,visibleMargin:50,sizes:s,report:{enabled:true,wording:r,position:'top-right'}});
  if(true){window['nitroAds'].createAd('desktop_bottom_anchor_lb',{refreshLimit:0,refreshTime:30,demo:false,format:'anchor',anchor:'bottom',anchorBgColor:'rgba(0,0,0,0.333)',anchorClose:true,anchorPersistClose:false,sizes:s,report:{enabled:true,wording:r,position:'top-right'},mediaQuery:'(min-width:768px)'});}
  if(true){window['nitroAds'].createAd('desktop_bottom_inline_lb',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:true,refreshVisibleOnly:true,visibleMargin:50,sizes:s,report:{enabled:true,wording:r,position:'bottom-right'}});}
  if(false){window['nitroAds'].createAd('desktop_bottom_inline_lb2',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:true,refreshVisibleOnly:true,visibleMargin:50,sizes:s,report:{enabled:true,wording:r,position:'bottom-right'}});}
  if(false&&!false){window['nitroAds'].createAd('video',{format:'video-nc',mediaQuery:'(min-width: 1025px), (min-width: 768px) and (max-width: 1024px)',video:{mobile:'compact',persistMinimizeTime:180},report:{enabled:true,wording:r,position:'top-right'}});}
  if(false&&!false){window['nitroAds'].createAd('nitro-outstream',{refreshLimit:0,refreshTime:30,format:'floating',report:{enabled:true,icon:true,wording:r,position:'top-left'},mediaQuery:'(min-width:1025px)'});}
}
if(w>1474&&true){
  let s=[['160','600']];
  if(w>=1755)s.unshift(['300','600'],['300','250']);if(w>=1795)s.unshift(['320','480'],['320','50'],['320','100']);if(w>=1827)s.unshift(['336','280']);
  window['nitroAds'].createAd('desktop_left_gutter_skyscraper',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:false,refreshVisibleOnly:true,sizes:s,report:{enabled:true,wording:r,position:'bottom-left'}});
  window['nitroAds'].createAd('desktop_right_gutter_skyscraper',{refreshLimit:0,refreshTime:30,demo:false,renderVisibleOnly:false,refreshVisibleOnly:true,sizes:s,report:{enabled:true,wording:r,position:'bottom-right'}});
}