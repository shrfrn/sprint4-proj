<template>
  <div class="home">
    <section class="header">
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link :to="`/board/60f7b1e3c66d343ab4f0c567`"
          >Boards</router-link
        >
      </div>
      <button class="login-btn" @click="dialogVisible = true">login</button>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <login-signup @login-signup="handleClose" />
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </el-dialog>
      <section class="back"></section>
      <section class="title">
        <div class="home-desc">
          <h2>Work the way that works for you</h2>
          <p>Highly effective teams choose someday -</p>
          <p>
            Work OS for better collaboration, organization, and efficiency in
            all their work.
          </p>
          <button class="btn-go" @click="start">start as guest</button>
        </div>
        <img class="home-img" src="../assets/img/home.svg" alt="" />
      </section>
    </section>
    <section class="info">
      <div class="item">
        <div class="icon"><i class="fas fa-tasks"></i></div>
        <h3 class="title">Project Manegment</h3>
        <p class="desc">
          Project management Plan, track, and manage any project from start to
          finish
        </p>
      </div>
      <div class="item">
        <div class="icon"><i class="fas fa-code"></i></div>
        <h3 class="title">Software developmentt</h3>
        <p class="desc">Sprint through every development process, your way</p>
      </div>
      <div class="item">
        <div class="icon"><i class="fas fa-building"></i></div>
        <h3 class="title">Construction</h3>
        <p class="desc">Organize any construction project from the ground up</p>
      </div>
    </section>
    <section class="details">
      <div class="manage">
        <div>
          <img src="../assets/img/manage.jpg" alt="" srcset="" />
        </div>
        <div class="manage-desc">
          <h2>Manage everything in one workspace</h2>
          <p>Planning, tracking and delivering your team’s best work has never been easier</p>
        </div>
      </div>
      <div class="set-up">
        <div class="manage-desc">
          <h2>Set up in minutes</h2>
          <p>Get started fast with hundreds of visual and customizable templates - or create your own</p>
        </div>
        <div>
          <img src="../assets/img/setup.jpg" alt="" srcset="" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import loginSignup from "./login-signup.vue";
export default {
  components: { loginSignup },
  name: "home",
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    initBoard() {
      return this.$store.getters.boards[0]._id;
    },
  },
  methods: {
    start() {
      this.$router.push(`/board/60f7b1e3c66d343ab4f0c567`);
    },
    handleClose() {
      this.dialogVisible = false;
    },
    login() {
      this.$router.push(`login`);
    },
  },
};
</script>
