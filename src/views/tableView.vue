<template>
  <div class="grid-content ep-bg-purple">
    <el-table :data="tableData()" stripe v-loading="loading" height="550px" style="width: 985px">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="Username" width="130" />
      <el-table-column prop="email" label="Email" width="180" />
      <el-table-column prop="confirmed" label="Confirmed" width="110" />
      <el-table-column prop="blocked" label="Blocked" width="100" />
      <el-table-column prop="createdAt" label="创建时间" width="205" />
      <el-table-column prop="updatedAt" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="updateUserinfo(scope.$index, scope.row)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="deleteUserinfo(scope.$index, scope.row)">
            <template #reference>
              <el-button size="small" type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
        <!-- <el-popconfirm title="Are you sure to delete this?">
          <template #reference>
            <el-button>Delete</el-button>
          </template>
        </el-popconfirm> -->
      </el-table-column>
    </el-table>
    <!-- 分页操作 -->
    <el-pagination small align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[5, 10, 20]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="user.length" :hide-on-single-page="true" />
    <!-- 日历组件 -->
    <!-- <el-calendar v-model="calenderData" /> -->
    <el-date-picker v-model="value1" type="date" placeholder="Pick a day" :size="size" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import request from "../utils/request";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import type { RouteParamValue } from 'vue-router';

const route = useRoute();

//userList接口
interface userList {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

//用于展示的user用户列表数组，响应式数据
const user = ref<userList[]>([]);
//用于储存所有user
const UserList = ref<userList[]>([]);
//加载数据loading
const loading = ref<boolean>(true);
//分页默认数据
let pageSize = ref<number>(10);
let currentPage = ref<number>(1);

// let calenderData = ref<Date>(new Date());
const size = ref<'default' | 'large' | 'small'>('default')
const value1 = ref('')

//向http://locahost:1336/api/users发送get请求获取所有用户,并设置banner
const getUserData = (firstName: RouteParamValue) => {
  request("http://localhost:1336/api/users", "get")
    .then((response: any) => {
      UserList.value = response;
      //过滤resopnse中的数据，去除username不是为firstName开头的数据，并赋值给user.value
      user.value = UserList.value.filter((item: userList) => item.username.startsWith(firstName));
      loading.value = false;
    })
    .catch((error: any) => {
      console.log(error);
    });
};

onMounted(() => {
  //接受路由传递的id参数
  getUserData(route.params.firstName as string);
});


//分页操作
//前端限制分页（tableData为当前展示页表格数据）
const tableData = () => {
  return user.value.filter(
    (item, index) =>
      index < currentPage.value * pageSize.value &&
      index >= pageSize.value * (currentPage.value - 1)
  );
};

//每页展示数量发生改变时触发
const handleSizeChange = (val: number) => {
  currentPage.value = 1;
  pageSize.value = val;
};

//当前页改变时触发 跳转其他页
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};

//更新操作
const updateUserinfo = (rowindex: number, row: userList) => {
  console.log(rowindex, row);
};

//删除操作
const deleteUserinfo = (rowindex: number, row: userList) => {
  request(`http://localhost:1336/api/users/${row.id}`, "delete")
    .then((response) => {
      console.log(response);
      // user.value = response.data;
      console.log(rowindex, row);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      getUserData(route.params.firstName as string);
    })
    .catch((error: Promise<any>) => {
      console.log(error);
      ElMessage({
        message: "删除失败！",
        type: "error",
      });
    });
};
watch(
  () => route.params.firstName,
  (newValue) => {
    user.value = UserList.value.filter((item: userList) => item.username.startsWith(newValue as string));
  }
);
</script>

<style scoped lang="less">
body {
  margin: 0;
}

.example-showcase .el-loading-mask {
  z-index: 9;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.flex-grow {
  flex-grow: 1;
}

/* 解决element-ui的table表格控件表头与内容列不对齐问题 */
.el-table__body-wrapper {
  display: table-cell !important;
}

.p {
  color: red;
  background-color: yellow;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 100px;
  align-self: auto;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: unset;
  will-change: auto
}
</style>
