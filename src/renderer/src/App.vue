<template>
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
      <sanGuoSkin_layout ref = "GongJiSkin">
      </sanGuoSkin_layout>
    </div>

  </body>
</template>

<script setup lang="ts">
import { ref,onMounted  } from 'vue'
import sanGuoSkinLayout from "./compenents/sanGuoSkin_layout.vue"
import sanGuoSkin_layout from './compenents/sanGuoSkin_ChuChang_layout.vue';
import { RefSymbol } from '@vue/reactivity';
import { version } from 'process';

const skinName = ref<string>('')
const mainSkin = ref<any>(null)
const chuChangSkin = ref<any>(null)
const ChuChang_enable = ref<boolean>(false)
const GongJiSkin = ref<any>(null)
const GongJi_enable = ref<boolean>(false)
  

onMounted(()=>{
  Init()
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
  
  if(String(mainSkin.value.file_path).trim().length==0)
  {
      return
  }
  
  const out = mainSkin.value!.GetData(skinName.value)
  console.log(out)
}

</script>

