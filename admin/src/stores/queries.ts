import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { adminApi } from '../boot/axios'
import { useQuasar } from 'quasar'

export interface PortfolioQuery {
  id: string
  name: string
  email: string
  message: string
  status: 'unread' | 'read' | 'archived'
  createdAt: string
}

export type QueryStatus = 'unread' | 'read' | 'archived'

export const useQueriesStore = defineStore('queries', () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const queries     = ref<PortfolioQuery[]>([])
  const loading     = ref(false)
  const selected    = ref<PortfolioQuery | null>(null)
  const error       = ref<string | null>(null)

  // ── Getters ────────────────────────────────────────────────────────────────
  const unreadCount  = computed(() => queries.value.filter((q) => q.status === 'unread').length)
  const readCount    = computed(() => queries.value.filter((q) => q.status === 'read').length)
  const archivedCount = computed(() => queries.value.filter((q) => q.status === 'archived').length)

  // ── Actions ────────────────────────────────────────────────────────────────

  async function fetchAll() {
    loading.value = true
    error.value   = null
    try {
      const { data } = await adminApi.get<{ success: boolean; data: PortfolioQuery[] }>('/api/queries')
      queries.value = data.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch queries'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateStatus(id: string, status: QueryStatus) {
    try {
      const { data } = await adminApi.patch<{ success: boolean; data: PortfolioQuery }>(
        `/api/queries/${id}`,
        { status },
      )
      // Optimistic update — replace in local list
      const idx = queries.value.findIndex((q) => q.id === id)
      if (idx !== -1) queries.value[idx] = data.data
      if (selected.value?.id === id) selected.value = data.data
    } catch (e) {
      throw e
    }
  }

  async function deleteQuery(id: string) {
    try {
      await adminApi.delete(`/api/queries/${id}`)
      queries.value  = queries.value.filter((q) => q.id !== id)
      if (selected.value?.id === id) selected.value = null
    } catch (e) {
      throw e
    }
  }

  function selectQuery(query: PortfolioQuery | null) {
    selected.value = query
  }

  return {
    queries,
    loading,
    selected,
    error,
    unreadCount,
    readCount,
    archivedCount,
    fetchAll,
    updateStatus,
    deleteQuery,
    selectQuery,
  }
})
