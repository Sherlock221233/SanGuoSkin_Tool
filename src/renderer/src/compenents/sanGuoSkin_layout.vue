
<template>
    <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="500"
  >
    <span>{{alertMessage}}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
    <el-form label-width="auto" >
        <el-form-item label="路径:">
            <el-input v-model="filePath" readonly="true"  style="width: calc(100vh - 0px);height: 27px;"></el-input>
            <el-button type="primary"  @click="getFilePath" style="height: 27px;margin-left: 10px;">选择路径</el-button>
        </el-form-item>
        <el-form-item label="" style="margin-left: 10px;">

            <el-text style="margin-right: 12px;">播放动作:</el-text>
            <el-select v-model="action" placeholder="请选择动作" style="width: 130px;">  
                <el-option :value="'_action占位符'" label=" _action占位符" ></el-option>
            </el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">特殊待机动作:</el-text>
            <el-select v-model="actionTeShu" placeholder="请选择动作" style="width: 130px;">
                <el-option :value="'_action特殊占位符'" label=" _action特殊占位符" ></el-option>
            </el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">出闪动作:</el-text>
            <el-select v-model="actionShan" placeholder="请选择动作" style="width: 130px;">
                <el-option :value="'_action闪占位符'" label=" _action闪占位符" ></el-option>
            </el-select>

            <el-text style="margin-right: 12px;margin-left: 7px;">Version:</el-text>
            <el-input-number v-model="version" controls-position="right" style="width: 100px;" :step="0.1" :precision="1"/>

        </el-form-item>
        <el-form-item label="" style="margin-left: 10px;"> 

            <el-text style="margin-right: 12px;">皮肤:</el-text>
            <el-select v-model="Skin" placeholder="请选择皮肤" style="width: 130px;">
                <el-option :value="'default'" label="default" ></el-option>
            </el-select>

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
import { defineComponent, ref, computed, watch, nextTick,defineExpose  } from 'vue'
import { ipcRenderer } from 'electron'


export default {
    setup() {
        const filePath = ref<string>('')
        const action = ref<string>('_action占位符')
        const version = ref<number>(3.8)
        const actionTeShu = ref<string>('_action特殊占位符')
        const actionShan = ref<string>('_action闪占位符')
        const Skin = ref<string>('default')
        const Alpha = ref<boolean>(false)
        const json = ref<boolean>(false)
        const X_position = ref<number>(0.00)
        const Y_position = ref<number>(0.00)
        const Scale = ref<number>(0.50)
        const Angle = ref<number>(0.00)
        const Speed = ref<number>(1.00)
        const dialogVisible = ref<boolean>(false)
        const alertMessage = ref<string>('')


        function GetData(){
            return {filePath,action,version,actionTeShu,actionShan,Skin,Alpha,json,X_position,Y_position,
                Scale,Angle,Speed
            }
        }

        const getFilePath = async ()=>{
            const res= await window.api.getPathAndAction();

            const path:string = res.file_path

            // console.log(path)

            filePath.value = path
        }
        
        defineExpose({ GetData,version });
        return { version,action,filePath,actionTeShu,actionShan,Alpha,Skin,json,X_position,Y_position,Scale,Angle,Speed,
getFilePath,dialogVisible,alertMessage
         };
    },

    created() {
        window.api.alert_warning((msg:string) => {
            this.dialogVisible = true;
            this.alertMessage = "抱歉，暂不支持直接解析skel二进制数据文件，请自行转换成json或者在最后的输出结果手动填写参数"
            console.log(msg)

        })
    },

};
</script>