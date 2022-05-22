(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e796a0a"],{"138b":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.blog_building?n("div",{staticClass:"custom-modal"},[n("div",{staticClass:"custom-modal-content"},[n("div",{staticClass:"custom-modal-header",staticStyle:{height:"75px"}},[n("span",{staticClass:"close",on:{click:t.backRenderMachine}},[n("img",{staticStyle:{width:"30px",height:"30px"},attrs:{src:a("cdb2")}})])]),t._m(0),n("div",{staticClass:"custom-modal-footer text-center mt-5 mb-5"},[n("pulse-loader",{attrs:{loading:t.loading,color:"#000000",size:"12px"}})],1)])]):n("div",[n("button",{staticClass:"btn btn-outline-dark boder border-dark border-2 mt-3 mb-3",staticStyle:{"margin-left":"-10px"},on:{click:t.backRenderMachine}},[t._v("Start a new render")]),n("div",{staticClass:"row border-top border-secondary"},[n("div",{staticClass:"col-md-8 p-5 "},[n("p",[t._v(t._s(new Date(t.data.created_at).toLocaleDateString("en-US",t.options)))]),n("p",{staticStyle:{"font-size":"45px","font-weight":"bold"}},[t._v(t._s(t.data.blog_title))]),n("p",{staticStyle:{"font-size":"20px"}},[t._v(t._s(t.data.blog_des))]),n("img",{staticClass:"mt-3 mb-3",staticStyle:{width:"100%"},attrs:{src:t.data.banner}}),n("div",{staticClass:"custom-markdown",domProps:{innerHTML:t._s(t.markdownToHtml)}})]),n("div",{staticClass:"col-md-4 mt-3 border-start border-secondary ps-3"},[n("div",{staticClass:"card-panel"},[n("img",{staticClass:"border border-dark border-2 mt-3",staticStyle:{width:"85px",height:"85px",float:"left","border-radius":"50%"},attrs:{src:t.data.avatar}}),n("div",{staticClass:"card-panel-description"},[n("p",{staticClass:"mt-2",staticStyle:{color:"black","font-size":"22px"}},[t._v(t._s(t.data.name))]),n("p",{staticStyle:{"margin-top":"-18px"}},[t._v(t._s(t.data.personal_title))]),t.data.usv?n("div",{staticStyle:{"margin-top":"-15px",width:"100%"}},[n("img",{staticStyle:{width:"25px",height:"25px",float:"left"},attrs:{src:a("5ac9")}}),n("p",{staticStyle:{"font-size":"15px",float:"left","margin-left":"5px"}},[t._v("Unstoppable Domain | Verified")]),n("img",{staticStyle:{width:"10px",height:"10px","margin-top":"-5px","margin-left":"5px"},attrs:{src:a("1eeb")}})]):t._e()])]),n("div",{staticClass:"mt-3 ms-3"},[n("p",{staticStyle:{"font-size":"20px","font-weight":"bold"}},[t._v("About author")]),n("p",{staticStyle:{"font-size":"15px","margin-top":"-15px"}},[t._v(t._s(t.data.bio))])]),t.recommendations_data.length>0?n("div",{staticClass:"mt-3 ms-3"},[n("p",{staticStyle:{"font-size":"20px","font-weight":"bold"}},[t._v("Read more from "+t._s(t.data.name))]),t._l(t.recommendations_data,(function(e,a){return n("div",{staticClass:"card-panel"},[n("div",{on:{click:function(e){return t.renderMachine(a)}}},[n("img",{staticClass:"border border-dark border-2 mt-3 me-3",staticStyle:{width:"85px",height:"85px",float:"left"},attrs:{src:e.thumbnail}}),n("p",{staticStyle:{"font-size":"15px","font-weight":"bold","padding-top":"35px"}},[t._v(t._s(e.blog_title))])])])}))],2):t._e()])]),n("Footer")],1)])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"custom-modal-body text-center"},[n("p",{staticStyle:{"font-size":"30px","font-weight":"bold"}},[t._v("Render machine is working hard...")]),n("p",{staticStyle:{"font-size":"18px"}},[t._v("Reminder: Please do not refresh or close window")]),n("p",{staticStyle:{"font-size":"18px","margin-top":"-15px"}},[t._v("as this will interrupt the process. Just be patient~")]),n("img",{staticStyle:{width:"60%",height:"60%"},attrs:{src:a("7190")}})])}],s=a("1da1"),o=(a("96cf"),a("d3b7"),a("25f0"),a("ace4"),a("5cc6"),a("9a8c"),a("a975"),a("735e"),a("c1ac"),a("d139"),a("3a7b"),a("d5d6"),a("82f8"),a("e91f"),a("60bd"),a("5f96"),a("3280"),a("3fcc"),a("ca91"),a("25a1"),a("cd26"),a("3c5d"),a("2954"),a("649e"),a("219c"),a("170b"),a("b39a"),a("72f7"),a("3ca3"),a("ddb0"),a("2b3d"),a("9861"),a("8a5d")),r=a("7c5c"),c=a("b2c8"),d={name:"Blog",components:{PulseLoader:o["a"],Footer:c["a"]},data:function(){return{blog_building:!0,loading:!0,options:{weekday:"long",year:"numeric",month:"long",day:"numeric"},blogimage:"",data:{},blog_title:"",blog_des:"",thumbnail:"",banner:"",markdown:"",recommendations:[],recommendations_data:[],name:"",personal_title:"",avatar:"",bio:"",web3_api_key:"",pinata_api_key:"",root_cid:""}},computed:{markdownToHtml:function(){return r["marked"].parse(this.markdown.toString())}},created:function(){this.setBlog()},methods:{backRenderMachine:function(){this.$router.push("/render-machine")},startRender:function(){this.$router.push("/")},renderMachine:function(t){this.$router.push("/blog/".concat(this.recommendations[t])),this.setBlog()},addListeners:function(t){t.addEventListener("load",this.handleEvent)},handleEvent:function(t){for(var e=JSON.parse(t.srcElement.result),a=new Uint8Array(e.image.data),n="",i=a.byteLength,s=0;s<i;s++)n+=String.fromCharCode(a[s]);this.blogimage=window.btoa(n)},setImage:function(t){for(var e=t,a=new Uint8Array(e.image.data),n="",i=a.byteLength,s=0;s<i;s++)n+=String.fromCharCode(a[s]);this.blogimage=window.btoa(n)},setBlog:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,n,i,s,o,r,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=new URL("https://ipfs.io/ipfs/"+t.$route.params.id+"/hello.json"),e.next=3,fetch(a.toString());case 3:return n=e.sent,e.next=6,n.json();case 6:if(i=e.sent,t.data={},t.recommendations=[],t.data=i,t.markdown=i.markdown,t.recommendations_data=[],t.recommendations=i.recommendations,!(i.recommendations.length>0&&""!=i.recommendations[0])){e.next=27;break}s=0;case 15:if(!(s<i.recommendations.length)){e.next=27;break}return o=new URL("https://ipfs.io/ipfs/"+i.recommendations[s]+"/hello.json"),e.next=19,fetch(o.toString());case 19:return r=e.sent,e.next=22,r.json();case 22:c=e.sent,t.recommendations_data.push(c);case 24:s++,e.next=15;break;case 27:t.blog_building=!1;case 28:case"end":return e.stop()}}),e)})))()}}},l=d,p=(a("ad49"),a("a514"),a("2877")),m=Object(p["a"])(l,n,i,!1,null,"772104ea",null);e["default"]=m.exports},"191a":function(t,e,a){},"1eeb":function(t,e,a){t.exports=a.p+"static/img/verified-icon.08cf9ed2.png"},"5ac9":function(t,e,a){t.exports=a.p+"static/img/unstoppable-domain-logo.3d538834.png"},7190:function(t,e,a){t.exports=a.p+"static/img/popup-building-illustration.eb8c071b.png"},a514:function(t,e,a){"use strict";a("cb22")},ad49:function(t,e,a){"use strict";a("191a")},b2c8:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("hr"),a("p",{staticClass:"text-center",staticStyle:{"font-size":"20px","padding-top":"30px","padding-bottom":"40px"}},[t._v("Build and render with love ♥IFPS Blog Engine")])])}],s=a("2877"),o={},r=Object(s["a"])(o,n,i,!1,null,null,null);e["a"]=r.exports},cb22:function(t,e,a){},cdb2:function(t,e,a){t.exports=a.p+"static/img/popup-close-icon.4ead46b2.png"}}]);