import {defineComponent, reactive, onMounted} from 'vue'
import Draw from './draw'
import {api_sh_visitors_rawdata} from "@/utils/request";
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
            const time_now = new Date()
            // @ts-ignore
            axios.get(api_sh_visitors_rawdata('m', 2011, 1, 1, time_now.getFullYear(), time_now.getMonth() + 1, time_now.getDay())).then(res => {
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