<template>
  <div>
    <h3>Step 1 | Set up your blog</h3>
    <label>Blog title</label>
    <el-input v-model = "blog_title"></el-input>
    <label>Blog description (100 words max)</label>
    <el-input v-model="blog_des" type ="textarea" rows="7"></el-input>
    <label class="form-label">Upload Thumbnail Image (250px * 250px)</label>
    <section id="panel-upload">
        <div class="content panel-upload--content" style="height: 160px;">
            <div class="panel-upload--dropzone">
                <div class="dropzone-label">
                    <input type="file" ref="thumbnail" @change="onThumbnailSelected" accept="image/png, image/jpeg"/>
                    <div v-if = "thumbnail == '' ">
                      <button class="vue-button rounded" @click.prevent="$refs.thumbnail.click()">Upload Image</button>
                      <p>Supports JPEG or PNG only</p>
                    </div>
                    <img @click="$refs.thumbnail.click()" v-else :src="thumbnail" style="width: 150px; height:150px"/> 
                </div>
            </div>
        </div>
    </section>
    <label class="form-label">Upload banner image (1920px * 1080px)</label>
    <section id="panel-upload">
        <div class="content panel-upload--content" style="height: 160px;">
            <div class="panel-upload--dropzone">
                <div class="dropzone-label">
                    <input type="file" ref="banner" @change="onBannerSelected" accept="image/png, image/jpeg"/>
                    <div v-if = "banner == '' ">
                      <button class="vue-button rounded" @click.prevent="$refs.banner.click()">Upload Image</button>
                      <p>Supports JPEG or PNG only</p>
                    </div>
                    <img @click="$refs.banner.click()" v-else :src="banner" style="width: 150px; height:150px"/> 
                </div>
            </div>
        </div>
    </section>
    <label class="form-label">Upload blog (Markdown format)</label>
    <input type="file" ref="markdown" @change="onMarkdownSelected" accept=".md" style="display: none;"/>
    <section id="panel-upload"  v-if = "markdown == '' ">
        <div class="content panel-upload--content" style="height: 160px;">
            <div class="panel-upload--dropzone">
                <div class="dropzone-label">
                      <button class="vue-button rounded" @click.prevent="$refs.markdown.click()">Upload Image</button>
                      <p>Only supports H2, H3, blockquote, link and list in .md file.</p>
                </div>
            </div>
        </div>
    </section>
    <div @click="$refs.markdown.click()" v-html="markdownToHtml"></div>
    <label class="form-label">Recommendations (Read more list)</label>
    <div v-for="(item, index) in recommendations">
      <el-input style = "width: 80%;" v-model="recommendations[index]"></el-input>
      <el-button @click="pushOneRec" class="el-icon-plus border border-dark" style="font: blod; color: black;"></el-button>
      <el-button @click="sliceOneRec(index)" class="el-icon-minus border border-dark" style="font: blod; color: black;" v-if = "index > 0"></el-button>
    </div>
    <h3>Step 2 | Set up your profile card</h3>
    <label>Name</label>
    <el-input v-model ="name"></el-input>
    <label>Personal Title</label>
    <el-input v-model="personal_title"></el-input>
    <label class="form-label">Upload avatar (250px * 250px)</label>
    <section id="panel-upload">
        <div class="content panel-upload--content" style="height: 160px;">
            <div class="panel-upload--dropzone">
                <div class="dropzone-label">
                    <input type="file" ref="avatar" @change="onAvatarSelected" accept="image/png, image/jpeg"/>
                    <div v-if = "avatar == '' ">
                      <button class="vue-button rounded" @click.prevent="$refs.avatar.click()">Upload Image</button>
                      <p>Supports JPEG or PNG only</p>
                    </div>
                    <img @click="$refs.avatar.click()" v-else :src="avatar" style="width: 150px; height:150px"/> 
                </div>
            </div>
        </div>
    </section>
    <label>Bio (50 words max)</label>
    <el-input v-model="bio" type ="textarea" rows="7"></el-input>
    <h3>Step 3 | Set up your decentralised storage</h3>
    <label class="form-label">Web3.storage API Key</label>
    <input v-model="web3_api_key" type="text" class="form-control">
    <label class="form-label">Pinata API Key(for additional pining | optional)</label>
    <input v-model="pinata_api_key" type="text" class="form-control">
    <div class="text-center">
        <button @click="createBlog" class="btn btn-outline-dark" style = "width: 80%;">Create my blog</button>
    </div>
    <el-dialog :visible.sync="blog_building" class="text-center">
      <h5>Blog page building is in progress...</h5>
      <h6>Reminder: Please do not refresh or close window</h6>
      <h6>as this will interrupt the process. Just be patient~</h6>
      <img src="../../assets/popup-building-illustration.png" style="width: 70%; height:70%;"/>
    </el-dialog>
    <el-dialog :visible.sync="building_success" class="text-center">
      <h5>Hooray! Your blog page is live now.</h5>
      <h6>This is one time popup. Please copy and save the IPFS</h6>
      <h6>CID below. Don't worry if you miss it, you can always</h6>
      <h6>look for them in your Web3.storage or Pinata account.</h6>
      <div class="input-group mb-3">
        <input :value="root_cid" id="myInput" type="text" class="form-control" >
        <span class="input-group-text"  >
          <div @click="myFunction" class="custom-tooltip">
            <img src="../../assets/popup-copy-icon.png" style="width: 25px; height:25px;"/>
            <span class="tooltiptext" id="myTooltip">Copy to</span>
          </div>
        </span>
      </div>
      <div class="text-center">
        <button @click="renderMachine" class="btn btn-dark" style = "width: 80%;">Render Machine</button>
      </div>
      <div class="text-center">
        <button @click="createAnotherBlog" class="btn btn-outline-dark" style = "width: 80%;">Create another blog</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Web3Storage } from "web3.storage";
import { marked } from 'marked';

export default {
  name: "index",
  data() {
    return {
      blog_building: false,
      building_success: false,
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
  methods: {
    renderMachine(){
      this.root_cid = '';
      this.building_success = false;
      // this.$router.push(`/blog/${rootCid}`)
      this.$router.push('/render-machine')



    },
    createAnotherBlog(){
      this.root_cid = '';
      this.building_success = false;
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
  },
}
</script>

<style lang="scss">
section#panel-upload {
  background-color: var(--gradient-100);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
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
</style>
