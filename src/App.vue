<template>
  <div id="page">
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
    <footer>
      <ul>
        <li><a class="action" href="mailto:admin@roganizr.io?Subject=Organiz.io">{{$t('app.footer.contact')}}</a></li>
        <li><div class="action" @click="showEulaModal = true">{{$t('app.footer.eula')}}</div></li>
      </ul>
    </footer>
    <modal v-if="showEulaModal" @close="showEulaModal = false">
      <h3 slot="header">{{$t('app.footer.eula')}} (MIT)</h3>
      <p slot="body">
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </modal>
  </div>
</template>

<script>
import Modal from './components/Modal.vue'
export default {
  name: 'app',
  components: {Modal},
  data() {
    return {
      showEulaModal: false
    }
  }
}
</script>

<style lang="sass">
  @import './assets/scss/styles.scss';
</style>
