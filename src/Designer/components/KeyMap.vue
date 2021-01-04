<script>
  import Mousetrap from 'mousetrap';
  import {KEY_MAP_DELETE, KEY_MAP_UNDO, KEY_MAP_REDO, KEY_MAP_PASTE, KEY_MAP_COPY} from '../constant/keyMap';
  import {mapMutations} from '../store/index';
  import {DELETE_COMPONENT} from '../constant/schema';
  import schemaMixin from '../mixin/schemaMixin';

  export default {
    mixins: [schemaMixin],
    mounted() {
      Mousetrap.bind(KEY_MAP_DELETE, () => {
        this.updateSchema({
          type: DELETE_COMPONENT,
        });
      });
      Mousetrap.bind(KEY_MAP_UNDO, () => {
        this.undo();
      });
      Mousetrap.bind(KEY_MAP_REDO, () => {
        this.redo();
      });
      Mousetrap.bind(KEY_MAP_PASTE, () => {
        this.$$pasteComponent();
      });
      Mousetrap.bind(KEY_MAP_COPY, () => {
        this.$$copyComponent();
      });
    },
    render() {
      return null
    },
    methods: {
      ...mapMutations(['updateSchema', 'redo', 'undo']),
    }
  }
</script>