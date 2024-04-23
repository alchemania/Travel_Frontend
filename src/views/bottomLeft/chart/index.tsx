import {defineComponent, reactive, onMounted, ref} from 'vue'
import Draw from './draw'
import {api_sh_visitors_all} from "@/utils/request";
import axios from "axios";


// @ts-ignore
export default defineComponent({
    components: {
        Draw
    },
    setup() {
        const cdata = reactive({"data": {}})

        // 生命周期
        onMounted(() => {
            // @ts-ignore
            axios.post(api_sh_visitors_all).then(res => {
                console.log(res)
                cdata.data = res.data
            })
        })

        return () => {
            return <div>
                <Draw cdata={cdata.data}/>
            </div>
        }
    }
})