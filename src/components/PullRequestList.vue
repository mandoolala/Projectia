<template>
  <!-- import CSS -->
  <div id="pullrequest">
    <div style="display:flex">
      <el-button-group id="filter">
        <el-button type="default">All</el-button>
        <el-button type="default">On progress</el-button>
        <el-button type="default">Closed</el-button>
      </el-button-group>
    </div>
    <div>
      <el-card class="pullrequestcard">
        <div class="title">
          <img
            src="../assets/GitHub-Mark-120px-plus.png"
            style="width: 25px; height: 25px; margin-right:5px; opacity: 0.3;"
          >
          <el-link
            class="issue"
            href="https://github.com"
            target="_blank"
            style="opacity: 0.3;"
          >fix pullrequestlist.vue</el-link>
        </div>
        <div class="status">
          <img
            src="../assets/merged.png"
            style="width: 19%; height: 19%; opacity: 0.5; margin-top:13px;"
          >
          <el-button class="collect" type="info" disabled>Collected</el-button>
        </div>
      </el-card>
      <el-card class="pullrequestcard">
        <div class="title">
          <img
            src="../assets/GitHub-Mark-120px-plus.png"
            style="width: 25px; height: 25px; margin-right:5px;"
          >
          <el-link class="issue" href="https://github.com" target="_blank">fix pullrequestlist.vue</el-link>
        </div>
        <div class="status">
          <img src="../assets/merged.png" style="width: 19%; height: 19%; margin-top:13px;">
          <el-button class="collect" type="success" @click="centerDialogVisible = true">Collect</el-button>
          <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
            <h3>....You have earned Yanguibi!!!</h3>
            <img src="../assets/yanguibi.png" style="width:200px; height:200px; margin-left:30px;">
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>
            </span>
          </el-dialog>
        </div>
      </el-card>
      <el-card class="pullrequestcard">
        <div class="title">
          <img
            src="../assets/GitHub-Mark-120px-plus.png"
            style="width: 25px; height: 25px; margin-right:5px;"
          >
          <el-link class="issue" href="https://github.com" target="_blank">copy merged logo image</el-link>
        </div>
        <div class="status">
          <img class="progress" src="../assets/onprogress.png">
          <el-button class="collect" type="success" disabled>Collect</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  el: "#pullrequest",
  data: function() {
    return {
      visible: false,
      centerDialogVisible: false
    };
  }
};
</script>


<style scoped>
#pull_request {
  display: flex;
  flex-direction: column;
}

.filter {
  margin: 10px;
  margin-left: 20px;
}

.pullrequestcard {
  width: 400px;
  height: 120px;
  margin: 10px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.title {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
}
.issue {
  align-self: flex-start;
  font-size: 18px;
}

.progress {
  width: 29%;
  height: 29%;
  margin-top: 12px;
}

.status {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

collect {
  color: #67c23a;
  padding: 3px 0;
}

disabled {
  color: #909399;
  padding: 3px 0;
}
</style>