<template>
    <div>
        <div class="title">模型部署面板 ML Panel</div>
        <el-row :gutter="20">
            <el-col :span="8" v-for="md in models">
                <el-card shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span class="sub-title">{{ md.name }}</span>
                            <template v-if="md.isSwitchedOn === true">
                                <el-tag class="ml-1" type="success">已接入</el-tag>
                            </template>
                            <template v-else>
                                <el-tag class="ml-1" type="warning">未接入</el-tag>
                            </template>
                            <template v-if="md.modelStatus === 'offline'">
                                <el-tag class="ml-2" type="info">已下线</el-tag>
                            </template>
                            <template v-else-if="md.modelStatus === 'latest'">
                                <el-tag class="ml-2" type="success">最新</el-tag>
                            </template>
                            <template v-else-if="md.modelStatus === 'useful'">
                                <el-tag class="ml-2" type="warning">基本可用</el-tag>
                            </template>
                            <template v-else>
                                <el-tag class="ml-2" type="danger">已过时</el-tag>
                            </template>
                        </div>
                        <el-button class="button" text @click=handleDrawerOpen(md) style="align-items: end">更新模型
                        </el-button>
                        <el-button class="button" text @click=handleReForecast(md) style="align-items: end">更新预测数据
                        </el-button>
                        <el-button class="button" text @click=handleInsightForecast(md) style="align-items: end">查看预测数据
                        </el-button>
                    </template>
                    <div class="text item">推理库: {{ md.driver }}</div>
                    <div class="text item">模型类型: {{ md['module'] }}</div>
                    <div class="text item">模型ID: {{ md.id }}</div>
                    <div class="text item">数据来源表: {{ md.dataSource }}</div>
                    <div class="text item">上次预测时间: {{ md.lastForecast }}</div>
                    <div class="text item">预测跨度: {{ md.hyperParameters.PRED_LENGTH }}
                    </div>
                    <time class="time"> 更新时间: {{ md.lastUpdate }}</time>
                </el-card>
            </el-col>
        </el-row>

        <el-drawer v-model="drawer" title="详细信息" :with-header="true">
            <el-form :model="modelInfo" label-width="140px">
                <el-form-item label="模型名称">
                    <el-input v-model="modelInfo.name" clearable/>
                </el-form-item>
                <el-form-item label="模型编号">
                    <el-input v-model="modelInfo.id" disabled/>
                </el-form-item>
                <el-form-item label="是否接入">
                    <el-switch
                            v-model="modelInfo.isSwitchedOn"
                            :active-icon=Check
                            :inactive-icon=Close
                    />
                </el-form-item>
                <el-form-item label="推理库">
                    <el-input v-model="modelInfo.driver" disabled/>
                </el-form-item>
                <el-form-item label="模型类型">
                    <el-input v-model="modelInfo.module" disabled/>
                </el-form-item>
                <el-form-item label="数据来源表">
                    <el-input v-model="modelInfo.dataSource" disabled/>
                </el-form-item>
                <el-form-item label="预测跨度">
                    <el-date-picker
                            v-model="modelInfo.dataSpan"
                            type="daterange"
                            range-separator="To"
                            start-placeholder="Start date"
                            end-placeholder="End date"
                    />
                </el-form-item>
                <el-form-item label="上次模型更新时间">
                    <el-date-picker
                            v-model="modelInfo.lastForecast"
                            type="datetime"
                            placeholder="Select date and time"
                            disabled
                    />
                </el-form-item>
                <el-form-item label="上次数据更新时间">
                    <el-date-picker
                            v-model="modelInfo.lastUpdate"
                            type="datetime"
                            placeholder="Select date and time"
                            disabled
                    />
                </el-form-item>
                <el-form-item label="准确率">
                    <el-input v-model="modelInfo.precision" disabled>
                    </el-input>
                </el-form-item>
                <el-form-item label="损失率">
                    <el-input v-model="modelInfo.loss" disabled>
                    </el-input>
                </el-form-item>
                <template v-for="(v,k) in modelInfo.hyperParameters">
                    <el-form-item :label=k>
                        <el-tooltip
                                effect="dark"
                                content="请不要在不清楚其作用的情况下修改超参数，此举有可能导致严重的模型训练错误"
                                placement="left"
                        >
                            <el-input v-model=modelInfo.hyperParameters[k] clearable/>
                        </el-tooltip>
                    </el-form-item>
                </template>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="onSubmit">提交变更</el-button>
                <el-button @click="drawer = !drawer">取消变更</el-button>
            </template>
        </el-drawer>

        <el-drawer v-model="drawer2" title="预测数据内省" :with-header="true" size="50%">
            <el-table :data="dataInsight" v-loading="drawer2_loading">
                <template v-for="(v,k) in dataInsight[0]">
                    <el-table-column :prop=k :label=k width="150px"></el-table-column>
                </template>
            </el-table>
        </el-drawer>
    </div>
</template>

<script setup>
import {reactive, ref, onBeforeMount} from "vue";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import axios from "axios";
import {ml_get_all, ml_insight_forecast, ml_model_retrain, ml_re_forecast} from "@/utils/request";
import dayjs from "dayjs";
import {Check, Close} from "@element-plus/icons-vue";
import {formatTime} from "@/utils";

const drawer = ref(false)
const drawer2 = ref(false)
const drawer2_loading = ref(false)
const models = ref([])
const dataInsight = ref([])

const modelInfo = ref({
    "name": "ml_nmainland_bilstm_32_r1",
    "module": ".h5",
    "driver": "TensorFlow",
    "dataSource": "data_nonmainland",
    "dataSpan": [],
    "lastForecast": "2023-05-26T17:36:21",
    "lastUpdate": "2023-05-27T14:02:32",
    "loss": 0.49636754393577576,
    "precision": 0.7083333134651184,
    "isSwitchedOn": false,
    "modelStatus": "latest",
    "hyperParameters": {},
})


const refresh = res => {
    const data = res.data
    let newres = []
    data.forEach(i => {
        const tmp = {
            ...i,
            dataSpan: [
                dayjs(i.dataLearnedBegin).toDate(),
                dayjs(i.dataLearnedEnd).toDate()
            ],
        };
        delete tmp.dataLearnedBegin
        delete tmp.dataLearnedEnd
        newres.push(tmp)
    })
    console.log(newres)
    models.value = newres
}


onBeforeMount(() => {
    axios.get(ml_get_all)
        .then(res => {
            refresh(res)
        })
})

const onSubmit = () => {
    ElMessageBox.confirm(
        '提示:本模型会被下线，重新上线之前数据库的数据并不会更新',
        'Model Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        drawer.value = !drawer.value
        let data = {
            ...modelInfo.value,
            dataLearnedBegin: formatTime(modelInfo.value.dataSpan[0], "yyyy-MM-dd"),
            dataLearnedEnd: formatTime(modelInfo.value.dataSpan[1], "yyyy-MM-dd")
        }
        for (const key in data.hyperParameters) {
            data.hyperParameters[key] = Number(data.hyperParameters[key])
        }
        delete data.dataSpan
        data.modelStatus = "offline"
        console.log(data)
        axios.post(ml_model_retrain, data)
            .then(res => {
                refresh(res)
                ElNotification({
                    title: '模型更新通知',
                    message: '刷新已提交',
                    duration: 0,
                    type: "success"
                });
            })
            .catch(() => {
                ElNotification({
                    title: '模型更新通知',
                    message: '服务器内部错误',
                    duration: 0,
                    type: "error"
                });
            })
    })

}

const handleDrawerOpen = ml => {
    Object.assign(modelInfo.value, ml)
    drawer.value = !drawer.value
}

const handleReForecast = md => {
    ElMessageBox.confirm(
        '提交后数据库中数据将被自动异步刷新，建议在刷新前监视模型预测数据',
        'Forecast Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        axios.post(ml_re_forecast, {'id': md.id})
            .then(res => {
                console.log(res)
                ElNotification({
                    title: '数据更新通知',
                    message: '刷新已提交',
                    duration: 0,
                    type: "success"
                });
            })
    })
}

const handleInsightForecast = md => {
    drawer2.value = !drawer2.value
    drawer2_loading.value = !drawer2_loading.value
    axios.post(ml_insight_forecast, {'id': md.id})
        .then(res => {
            console.log(res)
            dataInsight.value = res.data['insight']
            drawer2_loading.value = !drawer2_loading.value
        })
}

</script>

<style>
.title {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.sub-title {
    color: #272727;
    font-size: 18px;
    font-weight: 600;
}

.card-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}


.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
    align-items: end;
}

.image {
    width: 100%;
    display: block;
}
</style>