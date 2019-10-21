<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/graph">Graph</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/workspace">Workspace</router-link> | 
      <router-link to="/tillet-spreadsheet">Tillet Spreadsheet</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
</style>
