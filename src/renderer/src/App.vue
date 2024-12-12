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
    </div>

  </body>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import sanGuoSkinLayout from "./compenents/sanGuoSkin_layout.vue"
import { RefSymbol } from '@vue/reactivity';
import { version } from 'process';

const skinName = ref<string>('')
const mainSkin = ref<any>(null)


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
