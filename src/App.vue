<script setup lang="ts">
import type { } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
const router = useRouter()
const getKey = (event: any) => {
  router.push({ name: "userList", params: { lastName: event.target.innerText } })
}
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <div class="body">
      <div class="body-sider">
        <ul>
          <li><router-link to="/a/:lastName" @click="getKey">张</router-link></li>
          <li><router-link to="/a/:lastName" @click="getKey">孙</router-link></li>
          <li><router-link to="/a/:lastName" @click="getKey">李</router-link></li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="body-main">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <p>页脚</p>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 50px;
}

.body-sider {
  width: 30%;
  flex: none;
  padding: 20px;
}

.body-main {
  flex: 1;
  width: 1200px;
}

.line {
  width: 1px;
  height: 100%;
  background-color: #ccc;
  margin: 0 20px;
}

.body-sider ul {
  list-style: none;
}

.body-sider ul li {
  font-size: 20px;
  margin-bottom: 12px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  padding: 30px;
  padding-right: 900px;
  background-color: #fff;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.footer {
  margin: 0 auto;
}
</style>
