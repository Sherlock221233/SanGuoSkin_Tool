<template>
    <el-form label-width="auto" >
        <el-form-item label="路径:">
            <el-input v-model="filePath" readonly="true"  style="width: calc(100vh - 0px);height: 27px;"></el-input>
            <el-button type="primary"  @click="getFilePath" style="height: 27px;margin-left: 10px;">选择路径</el-button>
        </el-form-item>
        <el-form-item label="" style="margin-left: 10px;">

            <el-text style="margin-right: 12px;">播放动作:</el-text>
            <el-select v-model="action" placeholder="请选择动作" style="width: 130px;"></el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">特殊待机动作:</el-text>
            <el-select v-model="actionTeShu" placeholder="请选择动作" style="width: 130px;"></el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">出闪动作:</el-text>
            <el-select v-model="actionShan" placeholder="请选择动作" style="width: 130px;"></el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">Version:</el-text>
            <el-input-number v-model="version" controls-position="right" style="width: 100px;" :step="0.1" :precision="1"/>

        </el-form-item>
        <el-form-item label="" style="margin-left: 10px;"> 

            <el-text style="margin-right: 12px;">皮肤:</el-text>
            <el-select v-model="Skin" placeholder="请选择皮肤" style="width: 130px;"></el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">Alpha:</el-text>
            <el-select placeholder="" v-model="Alpha" style="width: 70px;">
                <el-option :value="false" label="否" ></el-option>
                <el-option :value="true" label="是"></el-option>
            </el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">Json:</el-text>
            <el-select placeholder="" v-model="json" style="width: 70px;">
                <el-option :value="false" label="否" ></el-option>
                <el-option :value="true" label="是"></el-option>
            </el-select>
          
            <el-text style="margin-right: 12px;margin-left: 7px;">Speed(播放速度):</el-text>
            <el-input-number v-model="Speed" controls-position="right" style="width: 100px;" :step="0.01" :precision="2"/>
           
        </el-form-item>
        <el-form-item>
            <el-text style="margin-right: 12px;margin-left: 7px;">X:</el-text>
            <el-input-number v-model="X_position" controls-position="right" style="width: 100px;" :step="0.01" :precision="2"/>
           
            <el-text style="margin-right: 12px;margin-left: 7px;">Y:</el-text>
            <el-input-number v-model="Y_position" controls-position="right" style="width: 100px;" :step="0.01" :precision="2"/>

            <el-text style="margin-right: 12px;margin-left: 7px;">Scale大小比例:</el-text>
            <el-input-number v-model="Scale" controls-position="right" style="width: 100px;" :step="0.01" :precision="2"/>

            <el-text style="margin-right: 12px;margin-left: 7px;">Angle角度:</el-text>
            <el-input-number v-model="Angle" controls-position="right" style="width: 100px;" :step="0.01" :precision="2"/>

        </el-form-item>

    </el-form>

</template>
<script lang="ts">
import { json } from 'stream/consumers';
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { ipcRenderer } from 'electron'

export default {
    setup() {
        const filePath = ref<string>('')
        const action = ref<string>('')
        const version = ref<number>(3.8)
        const actionTeShu = ref<string>('')
        const actionShan = ref<string>('')
        const Skin = ref<string>('')
        const Alpha = ref<boolean>(false)
        const json = ref<boolean>(false)
        const X_position = ref<number>(0.00)
        const Y_position = ref<number>(0.00)
        const Scale = ref<number>(0.50)
        const Angle = ref<number>(0.00)
        const Speed = ref<number>(1.00)

        const getFilePath = async ()=>{
            let cur_str:string = (filePath.value.substring(0,filePath.value.toString().lastIndexOf('\\')))
            const path:string  = await window.api.getPathAndAction(cur_str);
            // const res = await ipcRenderer.invoke('dialog:openFile');
            // if(res){
            //     console.log(res)
            // }
            if(path){
                filePath.value = path
            }

            // console.log(path)
        }

        
        return { version,action,filePath,actionTeShu,actionShan,Alpha,Skin,json,X_position,Y_position,Scale,Angle,Speed,
getFilePath
         };
    }
};
</script>