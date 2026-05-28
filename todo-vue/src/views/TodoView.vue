<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useTodoStore } from '@/stores/todo.store'
import { Plus, Trash2, Check } from 'lucide-vue-next'

const store = useTodoStore()
const title = ref('')

const filter = ref<'all' | 'active' | 'done'>('all')

let stopRealtime: (() => void) | null = null

// filtered todos
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return store.todos.filter(todo => !todo.is_done)
    case 'done':
      return store.todos.filter(todo => todo.is_done)
    default:
      return store.todos
  }
})

const totalTodos = computed(() => store.todos.length)
const activeTodos = computed(() => store.todos.filter(t => !t.is_done).length)
const doneTodos = computed(() => store.todos.filter(t => t.is_done).length)

// lifecycle
onMounted(async () => {
  await store.fetchTodos()
  stopRealtime = store.startRealtime?.() ?? null
})

onBeforeUnmount(() => {
  stopRealtime?.()
})

// add todo
async function add() {
  const clean = title.value.trim()
  if (!clean) return

  await store.addTodo(clean)
  title.value = ''
}
</script>

<template>
  <div class="container">
    <div class="card">

      <h1 class="title">📝 Todo App</h1>

      <div class="input-group">
        <input
          v-model="title"
          placeholder="Write a new task..."
          class="input"
          @keyup.enter="add"
        />

        <button class="btn-add" @click="add">
          <Plus :size="18" />
        </button>
      </div>

      <div class="filters">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
          All
        </button>
        <button :class="{ active: filter === 'active' }" @click="filter = 'active'">
          Active
        </button>
        <button :class="{ active: filter === 'done' }" @click="filter = 'done'">
          Done
        </button>
      </div>

      <div class="stats">
        <span>Total: {{ totalTodos }}</span>
        <span>Active: {{ activeTodos }}</span>
        <span>Done: {{ doneTodos }}</span>
      </div>

      <!-- LOADING / ERROR -->
      <p v-if="store.loading" class="info">Loading tasks...</p>
      <p v-if="store.error" class="error">{{ store.error }}</p>

      <ul class="list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="item"
        >
          <label class="left">
            <input
              type="checkbox"
              :checked="todo.is_done"
              @change="store.toggleTodo(todo)"
            />

            <span :class="{ done: todo.is_done }">
              {{ todo.title }}
            </span>
          </label>

          <div class="actions">
            <Check v-if="todo.is_done" :size="18" class="done-icon" />

            <button class="btn-delete" @click="store.deleteTodo(todo.id)">
              <Trash2 :size="18" />
            </button>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #eef2ff, #f8fafc);
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border: 1px solid #eef0f3;
}

.title {
  text-align: center;
  margin-bottom: 22px;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}

.input {
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  font-size: 14px;
  transition: 0.2s;
  background: #f9fafb;
}

.input:focus {
  border-color: #63b3f1;
  background: white;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.btn-add {
  padding: 12px 14px;
  background: linear-gradient(135deg, #63bbf1, #46b5e5);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-add:hover {
  transform: scale(1.05);
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.filters button {
  flex: 1;
  padding: 9px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: #f3f4f6;
  font-size: 13px;
  transition: 0.2s;
  font-weight: 500;
}

.filters button:hover {
  background: #e5e7eb;
}

.filters button.active {
  background: #469de5;
  color: white;
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  font-size: 13px;
  color: #6b7280;
  padding: 10px 12px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #eee;
}

/* LIST */
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border: 1px solid #eef0f3;
  border-radius: 12px;
  margin-bottom: 10px;
  transition: 0.2s;
  background: #fff;
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.left {
  display: flex;
  gap: 10px;
  align-items: center;
}

.left input {
  accent-color: #469de5;
  width: 16px;
  height: 16px;
}

.done {
  text-decoration: line-through;
  color: #9ca3af;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.done-icon {
  color: #22c55e;
}

.btn-delete {
  background: #fee2e2;
  border: none;
  color: #dc2626;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-delete:hover {
  background: #fecaca;
  transform: scale(1.05);
}

.info {
  color: #6b7280;
  font-size: 14px;
  text-align: center;
}

.error {
  color: #dc2626;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}
</style>