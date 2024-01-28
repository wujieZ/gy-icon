<script>
import { icons } from '../../packages/vue/src/global'
import { Upload } from '../../packages/vue/src/'
</script>

<template>
  <div>
    <Upload class="icon" />
    <hr />
    <component :is="Icon" v-for="(Icon, key) in icons" :key="key" class="icon" />
    <hr />
    <component
      :is="`ElIcon${key}`"
      v-for="key in Object.keys(icons)"
      :key="key"
      class="icon"
    />
  </div>
</template>

<style>
.icon {
  height: 48px;
  color: #409eff;
}
</style>
