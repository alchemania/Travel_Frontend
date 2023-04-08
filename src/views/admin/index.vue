<template>
    <div class="common-layout">
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                         active-text-color="#ffd04b" @select="handleSelect" :ellipsis="false">
                    <el-menu-item index="1" style="margin-left:3%">旅游大数据面板后台管理 ML模块</el-menu-item>
                    <div class="flex-grow"/>
                    <el-sub-menu style="margin-right:3%">
                        <template #title>你好，管理员</template>
                    </el-sub-menu>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside>
                    <el-menu default-active="ml" v-model="nowIndex" class="el-menu-vertical-demo" :collapse="isCollapse"
                             router
                             style="height:100vh">

                        <el-menu-item index="ml">
                            <el-icon>
                                <Odometer/>
                            </el-icon>
                            <template #title>机器学习管理</template>
                        </el-menu-item>

<!--                        <el-menu-item index="data">-->
<!--                            <el-icon>-->
<!--                                <Refresh/>-->
<!--                            </el-icon>-->
<!--                            <template #title>数据管理</template>-->
<!--                        </el-menu-item>-->


<!--                        <el-menu-item index="notice">-->
<!--                            <el-icon>-->
<!--                                <Message/>-->
<!--                            </el-icon>-->
<!--                            <template #title>公告管理</template>-->
<!--                        </el-menu-item>-->

                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import cookies from "vue-cookies";
import {useRouter} from "vue-router"
import {
    ChatLineRound,
    Menu as IconMenu, Message, Odometer, Refresh,
} from '@element-plus/icons-vue'

const nowIndex = ref("ml")

const handleSelect = (key, keyPath) => {
    nowIndex.value = key
}
const username = ref(cookies.get("username"))

const router = useRouter()

</script>

<style lang="scss" scoped>
.el-aside {
  width: 200px;
}

.el-header {
  padding: 0%
}

.flex-grow {
  flex-grow: 1;
}

.common-layout {
  background-color: #ffffff;
}
</style>