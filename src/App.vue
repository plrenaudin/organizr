<template>
  <div id="app">
    <div id="page">
      <transition 
        name="fade" 
        mode="out-in" 
        appear>
        <router-view/>
      </transition>
      <footer>
        <ul>
          <li><a 
            class="action" 
            href="mailto:admin@organizr.io?Subject=Organiz.io">{{ $t('app.footer.contact') }}</a></li>
          <li><div 
            class="action" 
            @click="showEulaModal = true">{{ $t('app.footer.eula') }}</div></li>
        </ul>
      </footer>
      <modal 
        v-if="showEulaModal" 
        @close="showEulaModal = false">
        <div class="modalContent">
          <h3>{{ $t('app.footer.eula') }} (MIT)</h3>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
          <div 
            class="button" 
            @click="showEulaModal = false">OK</div>
        </div>
      </modal>
      <modal v-if="confirmDialogVisible">
        <div class="dialogBox">
          <div class="modalContent">
            <h2><i class="fa fa-warning"/> {{ $t('app.confirmTitle') }}</h2>
            <p v-html="confirmDialogText"/>
          </div>
          <div class="footerButtons">
            <div 
              class="red" 
              @click="confirmDialogVisible = false"><i class="fa fa-times"/> Cancel</div>
            <div 
              class="green" 
              @click="handleConfirm"><i class="fa fa-check"/> Confirm</div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import Modal from './components/Modal.vue';
export default {
  name: 'App',
  components: {Modal},
  data() {
    return {
      showEulaModal: false,
      confirmDialogVisible: false,
      confirmDialogText: '',
      confirmDialogAction: () => {},
      confirmDialogActionParams: null
    };
  },
  created() {
    this.$bus.$on('confirm', this.displayConfirm);
  },
  methods: {
    displayConfirm(text,fn,params) {
      this.confirmDialogText = text;
      this.confirmDialogAction = fn;
      this.confirmDialogActionParams = params;
      this.confirmDialogVisible = true;
    },
    handleConfirm() {
      this.confirmDialogAction(this.confirmDialogActionParams);
      this.confirmDialogText = '';
      this.confirmDialogActionParams = null;
      this.confirmDialogAction = () => {};
      this.confirmDialogVisible = false;
    }
  },
};
</script>

<style lang="sass">
  @import './assets/scss/styles.scss';
</style>
