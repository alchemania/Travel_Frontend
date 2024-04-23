import {defineComponent, reactive, onMounted} from 'vue'
import Draw from './draw'
import {api_hotel_all} from "@/utils/request";
import axios from "axios";


// @ts-ignore
export default defineComponent({
    components: {
        Draw
    },
    setup() {
        const cdata = reactive({
            data: {}
        })

        // 生命周期
        onMounted(() => {
            // @ts-ignore
            axios.post(api_hotel_all).then(res => {
                cdata.data = res.data
            })
        })

        return () => {
            return <div>
                <Draw cdata={cdata.data}/>
            </div>
        }
    }
});