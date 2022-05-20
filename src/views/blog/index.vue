<template>
  <div>
    <div class="custom-modal" v-if = "blog_building">
      <div class="custom-modal-content">
        <div class="custom-modal-header" style="height: 75px;">
          <span class="close" @click = "backRenderMachine"><img src="../../assets/popup-close-icon.png" style="width: 30px; height:30px;"/></span>
        </div>
        <div class="custom-modal-body text-center">
          <p style="font-size: 30px; font-weight: bold;">Render machine is working hard...</p>
          <p style="font-size: 18px;">Reminder: Please do not refresh or close window</p>
          <p style="font-size: 18px; margin-top: -15px;">as this will interrupt the process. Just be patient~</p>
          <img src="../../assets/popup-building-illustration.png" style="width: 60%; height:60%;"/>
        </div>
        <div class="custom-modal-footer text-center mt-5 mb-5">
          <pulse-loader :loading="loading" color="#000000" size="12px"></pulse-loader>
        </div>
      </div>
    </div>
    <div v-else>
      <button @click = "backRenderMachine" class="btn btn-outline-dark boder border-dark border-2 mt-3 mb-3" style="margin-left: -10px;">Start a new render</button>
      <div class="row border-top border-secondary">
        <div class="col-md-8 p-5 ">
            <p>{{(new Date(data.created_at)).toLocaleDateString("en-US", options)}}</p>
            <p style="font-size: 45px; font-weight:bold;">{{data.blog_title}}</p>
            <p style="font-size: 20px;">{{data.blog_des}}</p>
            <img :src="data.banner" style="width: 100%;" class="mt-3 mb-3"/>
            <div v-html="markdownToHtml" class="custom-markdown"></div>
          </div>
          <div class="col-md-4 mt-3 border-start border-secondary ps-3">
            <div class="card-panel">
              <img :src="data.avatar" style="width: 100px; height: 100px; float: left; border-radius: 50%; " class="border border-dark border-2 mt-3"/>
              <div class="card-panel-description">
                <p style="color: black; font-size: 22px" class="mt-3">{{data.name}}</p>  
                <p style="margin-top: -15px;">{{data.personal_title}}</p>
              </div>
            </div>
            <div class="mt-3 ms-3">
              <p  style="font-size: 20px; font-weight:bold;">About author</p>
              <p style="font-size: 15px; margin-top: -15px;">{{data.bio}}</p>
            </div>
            <div v-if = "recommendations_data.length > 0" class="mt-3 ms-3">
              <p style="font-size: 20px; font-weight:bold;">Read more from {{data.name}}</p>
              <div class="card-panel" v-for ="( d, i) in recommendations_data" >
              <div @click="renderMachine(i)">
                <img  :src="d.thumbnail" style="width: 85px; height: 85px; float: left; " class="border border-dark border-2 mt-3 me-3"/>
                <p style="font-size: 15px; font-weight:bold; padding-top: 35px;">{{d.blog_title}}</p>
              </div>
                <!-- <div class="card-panel-icon-wrapper icon-people">
                  <img :src="'data:image/png;base64,' + blogimage" style="width: 50px; height: 50px"/>
                </div> -->
                <!-- <div class="card-panel-description">
                  <div class="card-panel-text">
                    New Visitsafafafaf
                  </div>
                </div> -->
              </div>
            </div>
          </div>
      </div>
      <Footer/>
    </div>
  </div>

</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { marked } from 'marked';
import Footer from '../../components/Footer/index.vue'


export default {
  name: "Blog",
  components: {PulseLoader, Footer},
  data() {
    return {
      blog_building: true,
      loading: true,
      options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      blogimage: '',
      data: {},
      blog_title: '',
      blog_des: '',
      thumbnail: '',
      banner: '',
      markdown: '',
      recommendations: [],
      recommendations_data: [],
      name: '',
      personal_title: '',
      avatar: '',
      bio: '',
      web3_api_key:'',
      pinata_api_key: '',
      root_cid: '',
    };
  },
     computed: {
    markdownToHtml(){
     return marked.parse(this.markdown.toString())  ;
     
   }
 },
  created(){
    this.setBlog();
  },
  methods: {
    backRenderMachine(){
      this.$router.push('/render-machine')
    },
    startRender(){
      this.$router.push('/')
    },
    renderMachine(i){
        this.$router.push(`/blog/${this.recommendations[i]}`)
        this.setBlog()

    },
    addListeners(reader) {
      reader.addEventListener('load', this.handleEvent);
    },
    handleEvent(e){
      let bb = JSON.parse(e.srcElement.result) 
      var bytes = new Uint8Array(bb.image.data);
      var binary = '';
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      this.blogimage = window.btoa( binary );
    },
    setImage(a){
      let bb = a
      var bytes = new Uint8Array(bb.image.data);
      var binary = '';
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      this.blogimage = window.btoa( binary );
    },
      async setBlog(){
        var url = new URL('https://ipfs.io/ipfs/' + this.$route.params.id + '/hello.json');
        var req = await fetch(url.toString())
        var a = await req.json()
        this.data = {}
        this.recommendations = []
        this.data = a
        this.markdown = a.markdown
        this.recommendations_data = []
        this.recommendations = a.recommendations
        if (a.recommendations.length > 0 && a.recommendations[0] !='')
        {
          for (let i = 0; i < a.recommendations.length; i++) {
            // const element =;
            var t = new URL('https://ipfs.io/ipfs/' +  a.recommendations[i] + '/hello.json');
            var r = await fetch(t.toString())
            var b = await r.json()
            this.recommendations_data.push(b)
          }
        }
        this.blog_building = false
      },

  },
}
</script>

<style lang="scss">
  .custom-markdown {
    blockquote {
      border-left: solid;
      padding-left: 15px;
      p {
        font-size: 20px;
      }
    }
    p {
      font-size: 20px;
    }
    li {
      font-size: 20px;
    }
    h2 {
      font-size: 30px;
    }
  }
  .card-panel {
    height: 120px;
    cursor: pointer;
    color: #666;
    &:hover {
      .icon-people {
        background: rgba(0, 0, 0, 0.45);
      }
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      overflow-x: visible;
      float: left;
      font-weight: bold;
      vertical-align: middle;
      margin-top: 10px;
      margin-left: 10px;
      .card-panel-text {
        line-height: 10px;
        color: black;
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
</style>

<style scoped>

.custom-modal {
  /* display: none; */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 50px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* custom-modal Content */
.custom-modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.custom-modal-header {
  padding: 2px 16px;
  background-color: white;
  color: white;
}

.custom-modal-body {padding: 2px 16px;}

.custom-modal-footer {
  padding: 2px 16px;
  background-color: white;
  color: white;
}
</style>
