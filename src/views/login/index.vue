<template>
  <div class="login-container">
    <div class="login-background">
      <!-- 数据网格背景 -->
      <div class="data-grid"></div>
      <!-- 数据流动效果 -->
      <div class="data-stream">
        <div class="stream-line" v-for="i in 6" :key="i" :style="{ animationDelay: `${i * 0.5}s` }"></div>
      </div>
      <!-- 数据节点 -->
      <div class="data-nodes">
        <div class="node" v-for="i in 8" :key="i" :style="getNodeStyle(i)">
          <div class="node-pulse"></div>
        </div>
      </div>
      <!-- 科研图表元素 -->
      <div class="chart-elements">
        <!-- 柱状图 -->
        <div class="chart-item bar-chart">
          <svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="12" height="35" fill="#00e5ff" opacity="0.8" rx="2">
              <animate attributeName="height" values="35;45;35" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="y" values="40;30;40" dur="2s" repeatCount="indefinite"/>
            </rect>
            <rect x="28" y="25" width="12" height="50" fill="#00bcd4" opacity="0.8" rx="2">
              <animate attributeName="height" values="50;60;50" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="y" values="25;15;25" dur="2.5s" repeatCount="indefinite"/>
            </rect>
            <rect x="46" y="35" width="12" height="40" fill="#8a2be2" opacity="0.8" rx="2">
              <animate attributeName="height" values="40;50;40" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="y" values="35;25;35" dur="2.2s" repeatCount="indefinite"/>
            </rect>
            <rect x="64" y="20" width="12" height="55" fill="#9c27b0" opacity="0.8" rx="2">
              <animate attributeName="height" values="55;65;55" dur="2.8s" repeatCount="indefinite"/>
              <animate attributeName="y" values="20;10;20" dur="2.8s" repeatCount="indefinite"/>
            </rect>
            <rect x="82" y="30" width="12" height="45" fill="#00e5ff" opacity="0.8" rx="2">
              <animate attributeName="height" values="45;55;45" dur="2.3s" repeatCount="indefinite"/>
              <animate attributeName="y" values="30;20;30" dur="2.3s" repeatCount="indefinite"/>
            </rect>
          </svg>
        </div>
        <!-- 折线图 -->
        <div class="chart-item line-chart">
          <svg viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg">
            <path d="M5,50 L25,35 L45,40 L65,20 L85,30 L105,15" 
                  stroke="#00e5ff" stroke-width="2.5" fill="none" opacity="0.9" stroke-linecap="round">
              <animate attributeName="d" 
                       values="M5,50 L25,35 L45,40 L65,20 L85,30 L105,15;
                               M5,45 L25,30 L45,45 L65,25 L85,35 L105,20;
                               M5,50 L25,35 L45,40 L65,20 L85,30 L105,15"
                       dur="4s" repeatCount="indefinite"/>
            </path>
            <circle cx="5" cy="50" r="3" fill="#00e5ff" opacity="1">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="25" cy="35" r="3" fill="#00e5ff" opacity="1">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" begin="0.3s"/>
            </circle>
            <circle cx="45" cy="40" r="3" fill="#00e5ff" opacity="1">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" begin="0.6s"/>
            </circle>
            <circle cx="65" cy="20" r="3" fill="#00e5ff" opacity="1">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" begin="0.9s"/>
            </circle>
            <circle cx="85" cy="30" r="3" fill="#00e5ff" opacity="1">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" begin="1.2s"/>
            </circle>
            <circle cx="105" cy="15" r="3" fill="#00e5ff" opacity="1">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" begin="1.5s"/>
            </circle>
          </svg>
        </div>
        <!-- 饼图 -->
        <div class="chart-item pie-chart">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0, 229, 255, 0.1)" stroke-width="20"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#00e5ff" stroke-width="20"
                    stroke-dasharray="75 251" stroke-dashoffset="0" opacity="0.9" transform="rotate(-90 50 50)">
              <animateTransform attributeName="transform" type="rotate" 
                                from="-90 50 50" to="270 50 50" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#8a2be2" stroke-width="20"
                    stroke-dasharray="63 251" stroke-dashoffset="-75" opacity="0.9" transform="rotate(-90 50 50)">
              <animateTransform attributeName="transform" type="rotate" 
                                from="-90 50 50" to="270 50 50" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <!-- DNA/分子结构 -->
        <div class="chart-item molecule">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="30" r="8" fill="#00e5ff" opacity="0.8"/>
            <circle cx="30" cy="60" r="8" fill="#00bcd4" opacity="0.8"/>
            <circle cx="70" cy="60" r="8" fill="#8a2be2" opacity="0.8"/>
            <circle cx="50" cy="80" r="8" fill="#9c27b0" opacity="0.8"/>
            <line x1="50" y1="30" x2="30" y2="60" stroke="#00e5ff" stroke-width="2" opacity="0.6"/>
            <line x1="50" y1="30" x2="70" y2="60" stroke="#00e5ff" stroke-width="2" opacity="0.6"/>
            <line x1="30" y1="60" x2="50" y2="80" stroke="#8a2be2" stroke-width="2" opacity="0.6"/>
            <line x1="70" y1="60" x2="50" y2="80" stroke="#8a2be2" stroke-width="2" opacity="0.6"/>
            <line x1="30" y1="60" x2="70" y2="60" stroke="#00bcd4" stroke-width="2" opacity="0.6"/>
            <animateTransform attributeName="transform" type="rotate" 
                              from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite"/>
          </svg>
        </div>
      </div>
      <!-- 医疗图标装饰 -->
      <div class="medical-icons">
        <!-- 心电图 -->
        <div class="medical-icon ecg-icon">
          <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 L20,30 L25,10 L30,50 L35,30 L120,30" 
                  stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.6">
              <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="3s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        <!-- DNA螺旋 -->
        <div class="medical-icon dna-icon">
          <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="20" r="6" fill="#42A5F5" opacity="0.6"/>
            <circle cx="55" cy="20" r="6" fill="#64B5F6" opacity="0.6"/>
            <line x1="25" y1="20" x2="55" y2="20" stroke="#2196F3" stroke-width="2" opacity="0.4"/>
            <circle cx="40" cy="40" r="6" fill="#42A5F5" opacity="0.6"/>
            <circle cx="40" cy="40" r="6" fill="#64B5F6" opacity="0.6"/>
            <circle cx="55" cy="60" r="6" fill="#42A5F5" opacity="0.6"/>
            <circle cx="25" cy="60" r="6" fill="#64B5F6" opacity="0.6"/>
            <line x1="55" y1="60" x2="25" y2="60" stroke="#2196F3" stroke-width="2" opacity="0.4"/>
            <circle cx="40" cy="80" r="6" fill="#42A5F5" opacity="0.6"/>
            <circle cx="40" cy="80" r="6" fill="#64B5F6" opacity="0.6"/>
            <circle cx="25" cy="100" r="6" fill="#42A5F5" opacity="0.6"/>
            <circle cx="55" cy="100" r="6" fill="#64B5F6" opacity="0.6"/>
            <line x1="25" y1="100" x2="55" y2="100" stroke="#2196F3" stroke-width="2" opacity="0.4"/>
            <path d="M25,20 Q32,30 40,40 T55,60 Q47,70 40,80 T25,100" 
                  stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M55,20 Q47,30 40,40 T25,60 Q32,70 40,80 T55,100" 
                  stroke="#64B5F6" stroke-width="2" fill="none" opacity="0.5"/>
          </svg>
        </div>
        <!-- 医疗十字 -->
        <div class="medical-icon cross-icon cross-1">
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="10" width="16" height="40" rx="3" fill="#42A5F5" opacity="0.5"/>
            <rect x="10" y="22" width="40" height="16" rx="3" fill="#42A5F5" opacity="0.5"/>
          </svg>
        </div>
        <div class="medical-icon cross-icon cross-2">
          <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="8" width="14" height="34" rx="2" fill="#64B5F6" opacity="0.4"/>
            <rect x="8" y="18" width="34" height="14" rx="2" fill="#64B5F6" opacity="0.4"/>
          </svg>
        </div>
        <!-- 听诊器 -->
        <div class="medical-icon stethoscope-icon">
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <circle cx="45" cy="25" r="5" stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M45 30 L45 38 Q45 48 35 48 L25 48 Q15 48 15 38 L15 30" 
                  stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M15 10 L15 30" stroke="#42A5F5" stroke-width="2" opacity="0.6"/>
            <path d="M35 10 L35 30" stroke="#42A5F5" stroke-width="2" opacity="0.6"/>
            <circle cx="15" cy="10" r="4" fill="#42A5F5" opacity="0.6"/>
            <circle cx="35" cy="10" r="4" fill="#42A5F5" opacity="0.6"/>
          </svg>
        </div>
        <!-- 药瓶 -->
        <div class="medical-icon pill-icon">
          <svg viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="20" height="35" rx="4" stroke="#64B5F6" stroke-width="2" fill="none" opacity="0.6"/>
            <rect x="18" y="8" width="14" height="10" rx="2" stroke="#64B5F6" stroke-width="2" fill="none" opacity="0.6"/>
            <line x1="15" y1="25" x2="35" y2="25" stroke="#64B5F6" stroke-width="2" opacity="0.6"/>
            <line x1="25" y1="30" x2="25" y2="45" stroke="#64B5F6" stroke-width="2" opacity="0.6"/>
            <line x1="20" y1="37" x2="30" y2="37" stroke="#64B5F6" stroke-width="2" opacity="0.6"/>
          </svg>
        </div>
        <!-- 心跳 -->
        <div class="medical-icon heartbeat-icon">
          <svg viewBox="0 0 70 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 50 C35 50 10 35 10 20 C10 10 20 10 25 15 C30 10 35 10 35 15 C35 10 40 10 45 15 C50 10 60 10 60 20 C60 35 35 50 35 50 Z" 
                  stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M5 30 L15 30 L20 20 L25 40 L30 30 L35 30 L40 25 L45 35 L50 30 L65 30" 
                  stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.6">
              <animate attributeName="stroke-dasharray" values="0,200;200,0;0,200" dur="2s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      </div>
    </div>
    <div class="login-card">
      <div class="login-header">
        <div class="logo-section">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V12C2 16.55 5.84 20.74 12 22C18.16 20.74 22 16.55 22 12V7L12 2Z" fill="#2196F3" opacity="0.3"/>
              <path d="M12 2L2 7V12C2 16.55 5.84 20.74 12 22C18.16 20.74 22 16.55 22 12V7L12 2Z" stroke="#42A5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="#42A5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="system-title">专病数据库科研平台</h1>
        </div>
      </div>

      <n-form
        ref="formRef"
        :model="formModel"
        :rules="rules"
        size="large"
        label-placement="left"
      >
        <n-form-item path="username" :show-label="false">
          <n-input
            v-model:value="formModel.username"
            placeholder="请输入用户名"
            clearable
          >
            <template #prefix>
              <n-icon>
                <component is="User" />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="password" :show-label="false">
          <n-input
            v-model:value="formModel.password"
            type="password"
            placeholder="请输入密码"
            show-password-on="mousedown"
            clearable
          >
            <template #prefix>
              <n-icon>
                <component is="Password" />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item :show-label="false">
          <n-button
            type="primary"
            attr-type="submit"
            block
            size="large"
            :loading="loading"
            @click="handleLogin"
            class="login-button"
          >
            登录
          </n-button>
        </n-form-item>
      </n-form>

      <div class="login-footer">
        <n-text depth="3" style="font-size: 12px;">
          © 2024 - 2026 专病数据库科研平台 · 数据驱动科研
        </n-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FormRules } from 'naive-ui'
import { login } from '@/api/user'
import { encryptByRSA } from '@/utils/lib'
import { useUserStore } from '@/store/user'

const formRef = useTemplateRef('formRef')
const loading = ref(false)
const userStore = useUserStore()
const formModel = ref({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'input' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'input' }
  ]
}

// 数据节点位置
const getNodeStyle = (index: number) => {
  const positions = [
    { top: '15%', left: '12%' },
    { top: '25%', right: '15%' },
    { top: '45%', left: '8%' },
    { top: '55%', right: '10%' },
    { top: '70%', left: '18%' },
    { top: '35%', right: '25%' },
    { top: '65%', right: '20%' },
    { top: '80%', left: '45%' }
  ]
  return {
    ...positions[index - 1],
    animationDelay: `${index * 0.5}s`
  }
}
const router = useRouter()
const handleLogin = () => {
  formRef.value?.validate().then(() => {
    const { username, password } = formModel.value
    return login(username, encryptByRSA(password))
  }).then(res => {
    userStore.updateInfo(res.data)
    router.push('/')
  }).finally(stop)
}
</script>

<style scoped lang="less">
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 25%, #0f1729 50%, #1e2139 75%, #0d1428 100%);
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  // 数据网格背景
  .data-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  
  // 数据流动线条
  .data-stream {
    position: absolute;
    width: 100%;
    height: 100%;
    
    .stream-line {
      position: absolute;
      width: 3px;
      height: 120px;
      top: -120px;
      background: linear-gradient(to bottom, transparent, rgba(0, 229, 255, 0.8), rgba(0, 229, 255, 0.4), transparent);
      animation: stream-flow 2.5s linear infinite;
      opacity: 0;
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
      
      &:nth-child(1) { left: 15%; animation-delay: 0.3s; }
      &:nth-child(2) { left: 30%; animation-delay: 0.8s; }
      &:nth-child(3) { left: 45%; animation-delay: 1.3s; }
      &:nth-child(4) { left: 60%; animation-delay: 1.8s; }
      &:nth-child(5) { left: 75%; animation-delay: 2.3s; }
      &:nth-child(6) { left: 90%; animation-delay: 1.1s; }
    }
  }
  
  // 数据节点
  .data-nodes {
    position: absolute;
    width: 100%;
    height: 100%;
    
    .node {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #00e5ff;
      border-radius: 50%;
      box-shadow: 
        0 0 20px rgba(0, 229, 255, 0.8),
        0 0 40px rgba(0, 229, 255, 0.4);
      animation: node-pulse 2s ease-in-out infinite;
      
      .node-pulse {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border: 2px solid #00e5ff;
        border-radius: 50%;
        animation: pulse-ring 2s ease-out infinite;
      }
    }
  }
  
  // 科研图表元素
  .chart-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    
    .chart-item {
      position: absolute;
      opacity: 0.25;
      filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.3));
      
      &.bar-chart {
        top: 20%;
        left: 8%;
        width: 100px;
        height: 80px;
      }
      
      &.line-chart {
        top: 55%;
        right: 10%;
        width: 120px;
        height: 70px;
      }
      
      &.pie-chart {
        bottom: 15%;
        right: 15%;
        width: 80px;
        height: 80px;
        animation: rotate-slow 8s linear infinite;
      }
      
      &.molecule {
        top: 30%;
        right: 20%;
        width: 90px;
        height: 90px;
      }
    }
  }
  
  // 医疗图标装饰
  .medical-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    
    .medical-icon {
      position: absolute;
      opacity: 0.2;
      filter: drop-shadow(0 0 6px rgba(0, 229, 255, 0.4));
      animation: float-medical 6s ease-in-out infinite;
      
      &.ecg-icon {
        top: 18%;
        right: 8%;
        width: 120px;
        height: 60px;
      }
      
      &.dna-icon {
        bottom: 12%;
        left: 6%;
        width: 80px;
        height: 120px;
        animation: float-medical 8s ease-in-out infinite, rotate-slow 25s linear infinite;
      }
      
      &.cross-1 {
        top: 40%;
        left: 10%;
        width: 60px;
        height: 60px;
        animation-delay: 1s;
      }
      
      &.cross-2 {
        bottom: 25%;
        right: 12%;
        width: 50px;
        height: 50px;
        animation-delay: 2s;
      }
      
      &.stethoscope-icon {
        top: 65%;
        left: 15%;
        width: 60px;
        height: 60px;
        animation-delay: 1.5s;
      }
      
      &.pill-icon {
        top: 30%;
        right: 18%;
        width: 50px;
        height: 60px;
        animation-delay: 2.5s;
      }
      
      &.heartbeat-icon {
        bottom: 20%;
        right: 25%;
        width: 70px;
        height: 60px;
        animation-delay: 0.5s;
      }
    }
  }
}

@keyframes stream-flow {
  0% {
    top: -120px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes node-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float-medical {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-15px) scale(1.05);
  }
}

.login-card {
  position: relative;
  width: 420px;
  padding: 48px 40px 32px;
  background: linear-gradient(135deg, rgba(15, 20, 40, 0.85) 0%, rgba(20, 25, 45, 0.85) 100%);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 20px;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(0, 229, 255, 0.2),
    inset 0 1px 0 rgba(0, 229, 255, 0.2);
  z-index: 1;
  animation: slideUp 0.6s ease-out;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(0, 229, 255, 0.5), rgba(138, 43, 226, 0.3));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    animation: border-glow 3s ease-in-out infinite;
  }
}

@keyframes border-glow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  
  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
    
    .logo-icon {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      animation: pulse 2s ease-in-out infinite;
      
      svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.6));
      }
    }
    
    .system-title {
      font-size: 26px;
      font-weight: 600;
      color: #00e5ff;
      margin: 0;
      letter-spacing: 2px;
      text-shadow: 0 0 20px rgba(0, 229, 255, 0.6);
      animation: title-glow 3s ease-in-out infinite;
    }
  }
  
  .welcome-text {
    font-size: 14px;
    color: #00e5ff;
    margin: 0;
    font-weight: 400;
    text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  }
}

@keyframes title-glow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(0, 229, 255, 0.6);
  }
  50% {
    text-shadow: 0 0 30px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.4);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.6));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 30px rgba(0, 229, 255, 0.8));
  }
}

:deep(.n-input) {
  background-color: rgba(10, 15, 30, 0.6);
  border-radius: 10px;
  padding: 0 12px;
  border: 1px solid rgba(0, 229, 255, 0.2);
  
  .n-input__border,
  .n-input__state-border {
    border-radius: 10px;
    border-color: rgba(0, 229, 255, 0.3);
  }
  
  .n-input-wrapper {
    padding-left: 0;
    padding-right: 0;
  }
  
  .n-input__input-el {
    background-color: transparent !important;
    color: #e0f7fa;
    
    &::placeholder {
      color: rgba(0, 229, 255, 0.4);
    }
  }
  
  input {
    color: #e0f7fa;
    font-size: 15px;
    background-color: transparent !important;
    
    &::placeholder {
      color: rgba(0, 229, 255, 0.4);
    }
    
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px rgba(10, 15, 30, 0.9) inset !important;
      -webkit-text-fill-color: #e0f7fa !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  }
  
  &:hover {
    background-color: rgba(10, 15, 30, 0.8);
    border-color: rgba(0, 229, 255, 0.4);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
    
    .n-input__state-border {
      border-color: rgba(0, 229, 255, 0.5);
    }
  }
}

:deep(.n-input--focus) {
  background-color: rgba(10, 15, 30, 0.9) !important;
  border-color: #00e5ff !important;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3) !important;
  
  .n-input__state-border {
    border-color: #00e5ff !important;
    box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.2), 0 0 20px rgba(0, 229, 255, 0.3);
  }
  
  .n-input__input-el {
    background-color: transparent !important;
  }
  
  input {
    background-color: transparent !important;
  }
}

.login-button {
  margin-top: 12px;
  height: 48px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(135deg, #00e5ff 0%, #00bcd4 50%, #8a2be2 100%);
  background-size: 200% 100%;
  border: none;
  transition: all 0.4s ease;
  box-shadow: 0 8px 25px rgba(0, 229, 255, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease-out, height 0.6s ease-out, opacity 0.6s ease-out;
    opacity: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    background-position: 100% 0;
    transform: translateY(-2px);
    box-shadow: 
      0 12px 35px rgba(0, 229, 255, 0.6),
      0 0 40px rgba(0, 229, 255, 0.3);
    
    &::before {
      width: 400px;
      height: 400px;
      opacity: 0.3;
    }
    
    &::after {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
    
    &::before {
      width: 0;
      height: 0;
      opacity: 0;
      transition: width 0s, height 0s, opacity 0s;
    }
  }
}

.login-footer {
  margin-top: 32px;
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 229, 255, 0.2);
  
  :deep(.n-text) {
    color: rgba(0, 229, 255, 0.6) !important;
    font-size: 12px;
  }
}

:deep(.n-form-item) {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .n-form-item-feedback-wrapper {
    .n-form-item-feedback {
      color: #ff1744;
      font-size: 13px;
      text-shadow: 0 0 8px rgba(255, 23, 68, 0.5);
    }
  }
}

:deep(.n-input__prefix) {
  color: #00e5ff;
  margin-right: 10px;
  margin-left: 4px;
  filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.5));
}

:deep(.n-input__suffix) {
  .n-base-clear,
  .n-base-icon {
    color: rgba(0, 229, 255, 0.6);
    
    &:hover {
      color: #00e5ff;
      filter: drop-shadow(0 0 4px rgba(0, 229, 255, 0.5));
    }
  }
}

@media (max-width: 480px) {
  .login-card {
    width: 90%;
    padding: 32px 24px 24px;
  }
  
  .login-header {
    .logo-section {
      .logo-icon {
        width: 56px;
        height: 56px;
      }
      
      .system-title {
        font-size: 20px;
      }
    }
  }
}
</style>