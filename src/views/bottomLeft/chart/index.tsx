import {defineComponent, reactive, onMounted} from 'vue'
import Draw from './draw'
import {api_nmainland_all} from "@/utils/request";
import axios from "axios";


// @ts-ignore
export default defineComponent({
    components: {
        Draw
    },
    setup() {
        const cdata = reactive({
            timeline: [],
            frn: [],
            hk_mw: [],
            tw: []
        })

        // methods
        const setData = res => {
            cdata.timeline = res.timeline
            cdata.frn = res.frn
            cdata.hk_mw = res.hk_mw
            cdata.tw = res.tw
            console.log(cdata)
        }

        // 生命周期
        onMounted(() => {
            // @ts-ignore
            axios.post(api_nmainland_all).then(res => {
                console.log(res.data)
                setData(res.data)
            })
        })

        return () => {
            return <div>
                <Draw cdata={cdata}/>
            </div>
        }
    }
})