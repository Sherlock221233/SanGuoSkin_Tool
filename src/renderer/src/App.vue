<template>
  <el-tabs v-model="page_selected" type = "border-card">
    <el-tab-pane label="皮肤参数" name="SkinPara">
      <!-- <template #label>

      </template> -->
        <header>
          <el-text>皮肤名称: </el-text>
          <el-input v-model = "skinName" placeholder="请输入皮肤名称" style="width: 300px;height: 27px;"></el-input>
          <el-button type="primary"  @click="export_para" style="height: 27px;margin-left: 10px;">导出参数</el-button>
        </header>
        <body>
          <div id="MainSkin" style="border: 1px solid skyblue;">
            <el-text style="color: red;">主皮肤路径:</el-text>
            <br>
            <br>
            <sanGuoSkinLayout ref = "mainSkin">
            </sanGuoSkinLayout>
            <hr style="background-color: skyblue;border:1px solid skyblue;">
            <el-text style="color: red;">出场动画:</el-text>
            <br>
            <el-checkbox v-model="ChuChang_enable" label="启用" style="margin-left: 10px;">启用</el-checkbox>
            <sanGuoSkin_layout ref = "chuChangSkin">
            </sanGuoSkin_layout>
            <hr style="background-color: skyblue;border:1px solid skyblue;">
            <el-text style="color: red;">攻击动画:</el-text>
            <br>
            <el-checkbox v-model="GongJi_enable" label="启用" style="margin-left: 10px;">启用</el-checkbox>
            <!-- <sanGuoSkin_layout ref = "GongJiSkin">
            </sanGuoSkin_layout> -->
            <SanGuoSkin_ChuChang_layout ref = "GongJiSkin">
            </SanGuoSkin_ChuChang_layout>
          </div>
        </body>
    </el-tab-pane>
    <el-tab-pane label="参数预览" name="ParaView">
      <!-- <textarea v-model="para_out"></textarea> -->
      <el-input type="textarea" resize="none" rows="27" v-model="para_out"></el-input>
    </el-tab-pane>
  </el-tabs>

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

</template>


<script setup lang="ts">
import { ref,onMounted  } from 'vue'
import sanGuoSkinLayout from "./compenents/sanGuoSkin_layout.vue"
import sanGuoSkin_layout from './compenents/sanGuoSkin_ChuChang_layout.vue';
import SanGuoSkin_ChuChang_layout from './compenents/sanGuoSkin_ChuChang_layout.vue';

const skinName = ref<string>('')
const mainSkin = ref<any>(null)
const chuChangSkin = ref<any>(null)
const ChuChang_enable = ref<boolean>(false)
const GongJiSkin = ref<any>(null)
const GongJi_enable = ref<boolean>(false)
const page_selected = ref<string>("SkinPara")
const dialogVisible = ref<boolean>(false)
const alertMessage = ref<string>('')
const para_out = ref<string>('')


const showAlert = (msg: string) => {
    dialogVisible.value = true;
    alertMessage.value = "抱歉，暂不支持直接解析skel二进制数据文件，请自行转换成json或者在最后的输出结果手动填写参数";
    console.log(msg);
};

onMounted(()=>{
  Init()
  window.electronAPI.alert_warning(showAlert);
})


function Init()
{
    if(GongJiSkin.value)
    {
      GongJiSkin.value.action1_disable = false
      // console.log(GongJiSkin.value)
    }
}

function export_para()
{

  if(!skinName.value)
  {
    alertMessage.value = "请输入皮肤名称"
    dialogVisible.value = true
    return
  }

  if(String(mainSkin.value.file_path).trim().length==0)
  {
    alertMessage.value = "请先选择皮肤文件"
    dialogVisible.value = true
      return
  }

  const main_para = mainSkin.value!.GetData(skinName.value)
  if(main_para.length==0)
  {
    return
  }
  let out = skinName.value+":{\n"+main_para//+"}"

  if(ChuChang_enable.value)
  {
    const para_ChuChang:string = chuChangSkin.value!.GetData(skinName.value)
    if(para_ChuChang)
    {
      out=out+"chuchang: {\n"+para_ChuChang+"},\n"
    }
    else
    {
      return
    }
  }
  if(GongJi_enable.value)
  {
    const para_GongJi:string = GongJiSkin.value!.GetData(skinName.value)
    if(para_GongJi)
    {
      out=out+"gongji: {\n"+para_GongJi+"},\n"
    }
    else
    {
      return
    }
  }
  out+="},"
  // const out1 = mainSkin.value!.GetData(skinName.value)
  // alertMessage.value = out;
  // dialogVisible.value = true;
  // createCustomDialog(out);
  para_out.value = out
  page_selected.value = "ParaView"



  // console.log(out)
}

    // created() {
    //     // window.electronAPI.getFilePath()
    //     window.electronAPI.alert_warning((msg:string) => {
    //         this.dialogVisible = true;
    //         this.alertMessage = "抱歉，暂不支持直接解析skel二进制数据文件，请自行转换成json或者在最后的输出结果手动填写参数"
    //         console.log(msg)
    //     })
    // },
</script>

<script lang="ts">

    // created() {
    //     // window.electronAPI.getFilePath()
    //     window.electronAPI.alert_warning((msg:string) => {
    //         this.dialogVisible = true;
    //         this.alertMessage = "抱歉，暂不支持直接解析skel二进制数据文件，请自行转换成json或者在最后的输出结果手动填写参数"
    //         console.log(msg)
    //     })
    // },

</script>

