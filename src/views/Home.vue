<template>
  <div>
    <div class="app-container">
      <p class="mt-4" style="font-size: 45px; font-weight: bold;"> IPFS Blog Engine </p>
      <p style="font-size: 25px;">Create your own blog with markdown and store it as JSON on the decentralised storage network.</p>
      <p style="font-size: 25px; margin-top: -15px;">Wanna display it? Use the render machine and let the magic happens.</p>
      <button @click="scrollMeTo('porto')" class="btn btn-dark me-1 mt-3 mb-3" style="font-size: 20px;">Start Creating Blog</button>
      <button @click="renderMachine" class="btn btn-outline-dark ms-1 mt-3 mb-3" style="font-size: 20px;">Render Machine</button>
      <div>
        <img style = "width: 50%; height: 50%" src="../assets/doodle-machine.png">
      </div>

    </div>
    <hr class="m-5"/>
    <div ref="porto"></div>
    <div style="padding-right: 200px; padding-left: 200px;">
      <p style="font-size: 30px;">Step 1 | Set up your blog</p>
      <p style="font-size: 20px;">Blog title</p>
      <input v-model="blog_title" type="text" class="form-control border border-dark border-2">
      <p style="font-size: 20px;" class="mt-3">Blog description (100 words max)</p>
      <textarea v-model="blog_des" rows="7" class="form-control border border-dark border-2"></textarea>
      <p style="font-size: 20px;" class="mt-3">Upload Thumbnail Image (250px * 250px)</p>
      <section id="panel-upload">
          <div class="content panel-upload--content" style="height: 160px;">
              <div class="panel-upload--dropzone">
                  <div class="dropzone-label">
                      <input type="file" ref="thumbnail" @change="onThumbnailSelected" accept="image/png, image/jpeg"/>
                      <div v-if = "thumbnail == '' ">
                        <button class="vue-button rounded" @click.prevent="$refs.thumbnail.click()">Upload Image</button>
                        <p style="font-size: 20px;">Supports JPEG or PNG only</p>
                      </div>
                      <img @click="$refs.thumbnail.click()" v-else :src="thumbnail" style="width: 150px; height:150px"/> 
                  </div>
              </div>
          </div>
      </section>
      <p style="font-size: 20px;" class="mt-3">Upload banner image (1920px * 1080px)</p>
      <section id="panel-upload">
          <div class="content panel-upload--content" style="height: 160px;">
              <div class="panel-upload--dropzone">
                  <div class="dropzone-label">
                      <input type="file" ref="banner" @change="onBannerSelected" accept="image/png, image/jpeg"/>
                      <div v-if = "banner == '' ">
                        <button class="vue-button rounded" @click.prevent="$refs.banner.click()">Upload Image</button>
                        <p style="font-size: 20px;">Supports JPEG or PNG only</p>
                      </div>
                      <img @click="$refs.banner.click()" v-else :src="banner" style="width: 150px; height:150px"/> 
                  </div>
              </div>
          </div>
      </section>
      <p style="font-size: 20px;" class="mt-3">Upload blog (Markdown format)</p>
      <input type="file" ref="markdown" @change="onMarkdownSelected" accept=".md" style="display: none;"/>
      <section id="panel-upload"  v-if = "markdown == '' ">
          <div class="content panel-upload--content" style="height: 160px;">
              <div class="panel-upload--dropzone">
                  <div class="dropzone-label">
                        <button class="vue-button rounded" @click.prevent="$refs.markdown.click()">Upload File</button>
                        <p style="font-size: 20px;">Only supports H2, H3, blockquote, link and list in .md file.</p>
                  </div>
              </div>
          </div>
      </section>
      <div @click="$refs.markdown.click()" v-html="markdownToHtml"></div>
      <p style="font-size: 20px;" class="mt-3">Recommendations (Read more list)</p>
      <div v-for="(item, index) in recommendations">
        <input v-model="recommendations[index]" type="text" style = "width: 82%;" class="form-control border border-dark border-2 d-inline mt-3">
        <button @click="pushOneRec" class="btn btn-outline-dark el-icon-plus border border-dark border-2 ms-4" style="font-size: 16px;"></button>
        <button @click="sliceOneRec(index)" class="btn btn-outline-dark el-icon-minus border border-dark border-2 ms-2" style="font-size: 16px;" v-if = "index > 0"></button>
      </div>
    </div>
    <hr class="m-5"/>
    <div style="padding-right: 200px; padding-left: 200px;">
      <p style="font-size: 30px;">Step 2 | Set up your profile card</p>
      <p style="font-size: 20px;">Name</p>
      <input v-model ="name" type="text" class="form-control border border-dark border-2">
      <p style="font-size: 20px;" class="mt-3">Personal Title</p>
      <input v-model="personal_title" type="text" class="form-control border border-dark border-2">
      <p style="font-size: 20px;" class="mt-3">Upload avatar (250px * 250px)</p>
      <section id="panel-upload">
          <div class="content panel-upload--content" style="height: 160px;">
              <div class="panel-upload--dropzone">
                  <div class="dropzone-label">
                      <input type="file" ref="avatar" @change="onAvatarSelected" accept="image/png, image/jpeg"/>
                      <div v-if = "avatar == '' ">
                        <button class="vue-button rounded" @click.prevent="$refs.avatar.click()">Upload Image</button>
                        <p style="font-size: 20px;">Supports JPEG or PNG only</p>
                      </div>
                      <img @click="$refs.avatar.click()" v-else :src="avatar" style="width: 150px; height:150px"/> 
                  </div>
              </div>
          </div>
      </section>
      <p style="font-size: 20px;" class="mt-3">UNS Verification (Login to verify yourself | Optional)</p>
      <button @click="test" class="btn btn-outline-dark border border-dark border-2" style="width: 100%;">
      <img style = "width: 25px; height: 25px" src="../assets/unstoppable-domain-logo.png">
      Unstoppable Domain Login</button>
      <p style="font-size: 20px;" class="mt-3">Bio (50 words max)</p>
      <textarea v-model="bio" rows="7" class="form-control border border-dark border-2"></textarea>
    </div>
    <hr class="m-5"/>
    <div style="padding-right: 200px; padding-left: 200px;">
      <p style="font-size: 30px;">Step 3 | Set up your decentralised storage</p>
      <p style="font-size: 20px;">Web3.storage API Key</p>
      <input v-model="web3_api_key" type="text" class="form-control border border-dark border-2">
      <p style="font-size: 20px;" class="mt-3">Pinata API Key (for additional pining | optional)</p>
      <input v-model="pinata_api_key" type="text" class="form-control border border-dark border-2">
      <div class="text-center mt-5 mb-5" style="">
          <button @click="createBlog" class="btn btn-dark mt-2" style = "width: 80%; font-size: 20px;">Create my blog</button>
      </div>
    
    </div>
    <!-- The Modal -->
    <div class="custom-modal" v-if = "blog_building">
      <div class="custom-modal-content">
        <div class="custom-modal-header" style="height: 75px;">
          <!-- <span class="close">&times;</span> -->
          <span class="close"><img src="../assets/popup-close-icon.png" style="width: 30px; height:30px;"/></span>
        </div>
        <div class="custom-modal-body text-center">
          <p style="font-size: 30px; font-weight: bold;">Blog page building is in progress...</p>
          <p style="font-size: 18px;">Reminder: Please do not refresh or close window</p>
          <p style="font-size: 18px; margin-top: -15px;">as this will interrupt the process. Just be patient~</p>
          <img src="../assets/popup-building-illustration.png" style="width: 60%; height:60%;"/>
        </div>
        <div class="custom-modal-footer text-center mt-5 mb-5">
          <pulse-loader :loading="loading" color="#000000" size="12px"></pulse-loader>
          <!-- <h3>Modal Footer</h3> -->
        </div>
      </div>
    </div>

    <div class="custom-modal" v-if = "building_success">
      <div class="custom-modal-content">
        <div class="custom-modal-header" style="height: 75px;">
          <!-- <span class="close">&times;</span> -->
          <!-- <span @click="closeModal" class="close"><img src="../assets/popup-close-icon.png" style="width: 30px; height:30px;"/></span> -->
        </div>
        <div class="custom-modal-body text-center">
          <p style="font-size: 30px; font-weight: bold;">Hooray! Your blog page is live now.</p>
          <p style="font-size: 17px; ">This is one time popup. Please copy and save the IPFS</p>
          <p style="font-size: 17px; margin-top: -10px;">CID below. Don't worry if you miss it, you can always</p>
          <p style="font-size: 17px; margin-top: -10px;">look for them in your Web3.storage or Pinata account.</p>
          <div class="input-group mb-3 border border-dark border-2">
            <input :value="root_cid" id="myInput" type="text" class="form-control"  >
            <span class="input-group-text"  >
              <div @click="myFunction" class="custom-tooltip">
                <img src="../assets/popup-copy-icon.png" style="width: 25px; height:25px;"/>
                <span class="tooltiptext" id="myTooltip">Copy to</span>
              </div>
            </span>
          </div>
          <div class="text-center mt-5 mb-5" >
            <div>
              <button @click="renderMachine" class="btn btn-dark" style = "width: 60%; font-size: 20px;">Render Machine</button>
              <button @click="createAnotherBlog" class="btn btn-outline-dark mt-3" style = "width: 60%; font-size: 20px; ">Create another blog</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { Web3Storage } from "web3.storage";
import { marked } from 'marked';
import UAuth from '@uauth/js';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Footer from '../components/Footer/index.vue'

export default {
  name: 'Home',
  components: {PulseLoader, Footer},
    data() {
    return {
      blog_building: false,
      building_success: false,
      loading: true,
      apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIyNGI0RTg3ODA3QjBDRkU2ZURjMzk1QjMyMkE1OWYzQjJhQUJiODciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTIxMDIxMzcyMzQsIm5hbWUiOiJteS1maXJzdC13ZWJzdG9yYWdlLXRva2VuIn0.zL-mQkLtbxZPpL_LpU0XYnmFwP7Wam3mXphwLt8RT0c',
      blog_title: '',
      blog_des: '',
      thumbnail: '',
      banner: '',
      markdown: '',
      recommendations: [''],
      name: '',
      personal_title: '',
      avatar: '',
      bio: '',
      web3_api_key:'',
      pinata_api_key: '',
      root_cid: '',





      buffer: '',
      image: '',
      blogimage: '',
      componentKey: false,
    };
  },
  computed: {

    markdownToHtml(){
     return marked.parse(this.markdown.toString())  ;
     
   }
 },
 	watch: {
		blog_des(newQuestion, oldQuestion) {
			console.log('aefffffffff')
			if(String(this.blog_des).match(/(\w+)/g).length > 100)
								this.blog_des = oldQuestion;


			else
				this.blog_des = newQuestion;

			
		},
    bio(newQuestion, oldQuestion) {
			console.log('aefffffffff')
			if(String(this.bio).match(/(\w+)/g).length > 50)
								this.bio = oldQuestion;


			else
				this.bio = newQuestion;

			
		}
	},
  methods: {
    closeModal(){
      this.root_cid = '';
      this.building_success = false;
    },
    async test(){
      const uauth = new UAuth({
        clientID: 'uauth_ipfs',
        redirectUri: 'http://localhost:5000/callback',
      })
      // tanzhixuan.crypto
      const authorization = await uauth.loginWithPopup()
      console.log(authorization)
    },
    scrollMeTo(refName) {
    var element = this.$refs[refName];
    var top = element.offsetTop;
    window.scrollTo(0, top);
  },
    createBlog(){
      this.$router.push('/create-blog')
    },
    renderMachine(){
      this.$router.push('/render-machine')
    },
    renderMachine(){
      this.root_cid = '';
      this.building_success = false;
      // this.$router.push(`/blog/${rootCid}`)
      this.$router.push('/render-machine')



    },
    createAnotherBlog(){
      this.root_cid = '';
      this.building_success = false;
      var element = this.$refs['porto'];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    myFunction(){
      var copyText = document.getElementById("myInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copied";
    },
    pushOneRec(){
      this.recommendations.push('')
    },
    sliceOneRec(index){
      if (index > -1) {
        this.recommendations.splice(index, 1); // 2nd parameter means remove one item only
      }
    },
    onThumbnailSelected(file){
      var reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsDataURL(file.target.files[0]);
        reader.onloadend = async () => {
          this.thumbnail = reader.result
        };
      }
    },
    onBannerSelected(file){
      var reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsDataURL(file.target.files[0]);
        reader.onloadend = async () => {
          this.banner = reader.result
        };
      }
    },
    onMarkdownSelected(file){
      var reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsText(file.target.files[0]);
        reader.onloadend = async () => {
          this.markdown = reader.result
        };
      }
    },
    onAvatarSelected(file){
      var reader = new FileReader();
      if (typeof file !== 'undefined') {
        reader.readAsDataURL(file.target.files[0]);
        reader.onloadend = async () => {
          this.avatar = reader.result
        };
      }
    },

    async convertToBuffer(reader) {
      return Buffer.from(reader);
    },
    async createBlog(){
      if (this.web3_api_key !='')
      {
        this.blog_building = true
        var client = new Web3Storage({ token: this.web3_api_key});
        let data = {}
        data.blog_title = this.blog_title
        data.blog_des = this.blog_des
        data.thumbnail = this.thumbnail
        data.banner = this.banner
        data.markdown = this.markdown
        data.recommendations = this.recommendations
        data.name = this.name
        data.personal_title = this.personal_title
        data.avatar = this.avatar
        data.bio = this.bio
        data.created_at = new Date();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
        const ee = [new File([blob], 'hello.json')];
        const rootCid = await client.put(ee, {
            maxRetries: 3
        });
        this.blog_building = false
        this.root_cid = rootCid
        this.building_success = true

        this.$store.dispatch('app/setCID', rootCid)
        // this.$router.push(`/blog/${rootCid}`)
      }
    },
    _arrayBufferToBase64( buffer ) {
      var binary = '';
      var bytes = new Uint8Array( buffer );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
          binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
  },






  }
}
</script>


<style lang="scss">
section#panel-upload {
  background-color: var(--gradient-100);
  border-radius: 1rem;
  // border-bottom-left-radius: 1rem;
  border: 2px dashed #bbb;
  .panel-upload--content,
  .panel-upload--content .panel-upload--dropzone {
    width: 100%;
    height: 100%;
  }

  .panel-upload--dropzone {
    position: relative;
    cursor: pointer;
    overflow: hidden;

    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

    &.active {
      > * {
        pointer-events: none;
      }

      .dropzone-label {
        background-color: rgba(0, 0, 0, .2);
      }
    }
    input {
      display: none;
    }
    .dropzone-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: .8rem;
      border-radius: .5rem;
      text-align: center;
      width: 80%;
      color: #bbb;
      svg {
        height: 48px;
        width: 48px;
        margin-bottom: 1rem;
      }

      span {
        font-size: 0.8rem;
      }
    }
    .dropzone-details {
      position: absolute;
      display: flex;

      bottom: 1rem;
      left: 1rem;

      .dropzone-detail {
        background-color: var(--gradient-300);
        border-radius: 1rem;
        padding: .4rem .8rem;
        font-size: .8rem;
        margin-right: .6rem;
      }
    }

    .dropzone-is-loading {
      opacity: 0;

      position: relative;
      height: 4px;
      display: block;
      width: 150px;
      background-color: var(--gradient-300);
      border-radius: 2px;
      margin: 1rem 0 1rem 0;
      overflow: hidden;

      &.active {
        opacity: 1;
      }

      .dropzone-loading--bar {
        background-color: var(--gradient-800);

        &:before {
          content: '';
          position: absolute;
          background-color: inherit;
          top: 0;
          left: 0;
          bottom: 0;
          will-change: left, right;
          animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        }
        &:after {
          content: '';
          position: absolute;
          background-color: inherit;
          top: 0;
          left: 0;
          bottom: 0;
          will-change: left, right;
          animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
          animation-delay: 1.15s;
        }
      }
    }
  }
}

body.dark-theme {
  section#panel-upload {
    background-color: var(--gradient-800);

    .dropzone-details .dropzone-detail {
      background-color: var(--gradient-900);
    }
    .dropzone-is-loading {
      background-color: var(--gradient-700);

      .dropzone-loading--bar {
        background-color: var(--icon-color);
      }
    }
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}
</style>
















<style scoped>
.app-container{
  text-align: center;
}
.drop{
  border: 2px dashed #bbb;
  /* width: 600px; */
  height: 160px;
  line-height: 60px;
  margin: 0 auto;
  /* font-size: 24px; */
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
.custom-tooltip {
  position: relative;
  display: inline-block;
}

.custom-tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}
.custom-tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.custom-tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
/* The Modal (background) */
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
