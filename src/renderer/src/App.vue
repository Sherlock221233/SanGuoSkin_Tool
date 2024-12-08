<template>
  <header>
    <el-text>皮肤名称: </el-text>
    <el-input v-model = "skinName" placeholder="请输入皮肤名称" style="width: 300px;height: 27px;"></el-input>
  </header>
  <body>
    <div id="MainSkin" style="border: 1px solid skyblue;">
      <el-text style="color: red;">主皮肤路径:</el-text>
      <br>
      <br>
      <sanGuoSkinLayout id = "mainSkin">
      </sanGuoSkinLayout>
    </div>

  </body>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import sanGuoSkinLayout from "./compenents/sanGuoSkin_layout.vue"

const skinName = ref('')
</script>
