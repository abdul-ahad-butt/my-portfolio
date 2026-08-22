<template>
  <q-page class="queries-page">
    <!-- ── Page Header ──────────────────────────────────────────────────── -->
    <div class="page-header q-px-lg q-pt-lg q-pb-md">
      <div class="row items-center justify-between q-mb-md">
        <div>
          <h1 class="text-h5 text-weight-bold text-white q-mb-xs" style="margin: 0">
            Incoming Inquiries
          </h1>
          <div class="text-caption text-grey-5">
            Portfolio contact form submissions — {{ store.queries.length }} total
          </div>
        </div>

        <!-- Filter chips -->
        <div class="row q-gutter-sm gt-xs">
          <q-btn-toggle
            v-model="statusFilter"
            toggle-color="primary"
            color="dark"
            text-color="grey-5"
            unelevated
            rounded
            dense
            :options="[
              { label: 'All', value: '' },
              { label: 'Unread', value: 'unread' },
              { label: 'Read', value: 'read' },
              { label: 'Archived', value: 'archived' },
            ]"
            size="sm"
          />
        </div>
      </div>

      <!-- Stats row -->
      <div class="row q-gutter-md q-mb-sm">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-card col-auto"
        >
          <div class="stat-value" :class="`text-${stat.color}`">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- ── Error Banner ─────────────────────────────────────────────────── -->
    <q-banner
      v-if="store.error"
      class="q-mx-lg q-mb-md"
      rounded
      dense
      inline-actions
      style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3)"
    >
      <template #avatar>
        <q-icon name="error" color="negative" />
      </template>
      <span class="text-negative text-caption">{{ store.error }}</span>
      <template #action>
        <q-btn flat label="Retry" color="negative" @click="store.fetchAll()" size="sm" />
      </template>
    </q-banner>

    <!-- ── Data Table ───────────────────────────────────────────────────── -->
    <div class="q-px-lg q-pb-lg">
      <q-table
        :rows="filteredQueries"
        :columns="columns"
        row-key="id"
        :loading="store.loading"
        :pagination="{ rowsPerPage: 15 }"
        flat
        bordered
        class="queries-table"
        table-class="queries-table-inner"
        no-data-label="No inquiries found"
        loading-label="Loading queries..."
        :rows-per-page-options="[10, 15, 25, 50]"
        virtual-scroll
        @row-click="(_, row) => openDialog(row)"
      >
        <!-- ── Column: Date ──────────────────────────────────────────── -->
        <template #body-cell-createdAt="{ value }">
          <q-td>
            <div class="text-caption text-grey-3">{{ formatDate(value) }}</div>
            <div class="text-caption text-grey-6">{{ formatTime(value) }}</div>
          </q-td>
        </template>

        <!-- ── Column: Name ──────────────────────────────────────────── -->
        <template #body-cell-name="{ row }">
          <q-td>
            <div class="row items-center q-gutter-sm">
              <q-avatar
                size="32px"
                color="primary"
                text-color="dark"
                class="text-caption text-weight-bold"
              >
                {{ getInitials(row.name) }}
              </q-avatar>
              <div>
                <div class="text-body2 text-weight-medium text-white">{{ row.name }}</div>
              </div>
            </div>
          </q-td>
        </template>

        <!-- ── Column: Email ─────────────────────────────────────────── -->
        <template #body-cell-email="{ value }">
          <q-td>
            <a
              :href="`mailto:${value}`"
              class="text-caption text-primary"
              style="text-decoration: none"
              @click.stop
            >
              {{ value }}
            </a>
          </q-td>
        </template>

        <!-- ── Column: Status ────────────────────────────────────────── -->
        <template #body-cell-status="{ value }">
          <q-td>
            <StatusBadge :status="value" />
          </q-td>
        </template>

        <!-- ── Column: Actions ──────────────────────────────────────── -->
        <template #body-cell-actions="{ row }">
          <q-td @click.stop>
            <div class="row q-gutter-xs">
              <!-- View -->
              <q-btn
                flat
                dense
                round
                icon="visibility"
                color="primary"
                size="sm"
                @click.stop="openDialog(row)"
              >
                <q-tooltip>View message</q-tooltip>
              </q-btn>

              <!-- Mark as Read -->
              <q-btn
                v-if="row.status !== 'read'"
                flat
                dense
                round
                icon="mark_email_read"
                color="positive"
                size="sm"
                :loading="loadingId === row.id + 'read'"
                @click.stop="quickStatus(row.id, 'read')"
              >
                <q-tooltip>Mark as Read</q-tooltip>
              </q-btn>

              <!-- Archive -->
              <q-btn
                v-if="row.status !== 'archived'"
                flat
                dense
                round
                icon="archive"
                color="grey-5"
                size="sm"
                :loading="loadingId === row.id + 'archived'"
                @click.stop="quickStatus(row.id, 'archived')"
              >
                <q-tooltip>Archive</q-tooltip>
              </q-btn>

              <!-- Delete -->
              <q-btn
                flat
                dense
                round
                icon="delete"
                color="negative"
                size="sm"
                :loading="loadingId === row.id + 'delete'"
                @click.stop="quickDelete(row)"
              >
                <q-tooltip>Delete</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <!-- Loading skeleton -->
        <template #loading>
          <q-inner-loading showing color="primary" />
        </template>

        <!-- Empty state -->
        <template #no-data="{ message }">
          <div class="full-width row flex-center q-gutter-sm text-grey-6 q-py-xl">
            <q-icon size="3rem" name="inbox" />
            <div>
              <div class="text-h6 text-grey-5 text-center">No inquiries yet</div>
              <div class="text-caption text-center">
                Portfolio form submissions will appear here
              </div>
            </div>
          </div>
        </template>
      </q-table>
    </div>

    <!-- ── Floating Refresh Button ──────────────────────────────────────── -->
    <q-page-sticky position="bottom-right" :offset="[24, 24]">
      <q-btn
        fab
        icon="refresh"
        color="primary"
        text-color="dark"
        :loading="store.loading"
        @click="store.fetchAll()"
        title="Refresh"
      />
    </q-page-sticky>

    <!-- ── Detail Dialog ────────────────────────────────────────────────── -->
    <QueryDialog
      v-model="dialogOpen"
      :query="store.selected"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useQueriesStore } from '../stores/queries'
import type { PortfolioQuery, QueryStatus } from '../stores/queries'
import StatusBadge from '../components/StatusBadge.vue'
import QueryDialog from '../components/QueryDialog.vue'

const store       = useQueriesStore()
const $q          = useQuasar()
const dialogOpen  = ref(false)
const loadingId   = ref<string | null>(null)
const statusFilter = ref('')

// ── Table columns ─────────────────────────────────────────────────────────
const columns = [
  {
    name: 'createdAt',
    label: 'Date Received',
    field: 'createdAt',
    sortable: true,
    align: 'left' as const,
    style: 'width: 130px',
  },
  {
    name: 'name',
    label: 'Sender Name',
    field: 'name',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'email',
    label: 'Sender Email',
    field: 'email',
    sortable: true,
    align: 'left' as const,
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    sortable: true,
    align: 'center' as const,
    style: 'width: 120px',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'id',
    align: 'center' as const,
    style: 'width: 150px',
  },
]

// ── Computed ──────────────────────────────────────────────────────────────
const filteredQueries = computed(() => {
  if (!statusFilter.value) return store.queries
  return store.queries.filter((q) => q.status === statusFilter.value)
})

const stats = computed(() => [
  { label: 'Total',    value: store.queries.length,    color: 'grey-4' },
  { label: 'Unread',   value: store.unreadCount,       color: 'negative' },
  { label: 'Read',     value: store.readCount,         color: 'positive' },
  { label: 'Archived', value: store.archivedCount,     color: 'grey-5' },
])

// ── Helpers ───────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(iso))
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(new Date(iso))
}

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().substring(0, 2)
}

// ── Dialog ────────────────────────────────────────────────────────────────
function openDialog(row: PortfolioQuery) {
  store.selectQuery(row)
  dialogOpen.value = true

  // Auto-mark as read when opened (if unread)
  if (row.status === 'unread') {
    store.updateStatus(row.id, 'read').catch(console.error)
  }
}

// ── Quick actions from table row ──────────────────────────────────────────
async function quickStatus(id: string, status: QueryStatus) {
  loadingId.value = id + status
  try {
    await store.updateStatus(id, status)
    $q.notify({
      type: 'positive',
      message: `Marked as "${status}"`,
      icon: 'check_circle',
      position: 'top-right',
      timeout: 2000,
    })
  } catch {
    $q.notify({ type: 'negative', message: 'Update failed', position: 'top-right' })
  } finally {
    loadingId.value = null
  }
}

async function quickDelete(row: PortfolioQuery) {
  $q.dialog({
    title: 'Delete Query',
    message: `Delete inquiry from ${row.name}?`,
    cancel: { flat: true, label: 'Cancel', color: 'grey' },
    ok: { label: 'Delete', color: 'negative' },
    dark: true,
  }).onOk(async () => {
    loadingId.value = row.id + 'delete'
    try {
      await store.deleteQuery(row.id)
      $q.notify({ type: 'positive', message: 'Deleted', icon: 'delete_forever', position: 'top-right' })
    } catch {
      $q.notify({ type: 'negative', message: 'Delete failed', position: 'top-right' })
    } finally {
      loadingId.value = null
    }
  })
}

onMounted(() => {
  store.fetchAll()
})
</script>

<style lang="scss" scoped>
.queries-page {
  background: #0a0f1a;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(180deg, rgba(13, 21, 38, 0.8) 0%, transparent 100%);
  border-bottom: 1px solid rgba(30, 41, 59, 0.4);
}

.stat-card {
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(30, 41, 59, 0.6);
  border-radius: 10px;
  padding: 12px 20px;
  min-width: 90px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(16, 185, 129, 0.25);
    background: rgba(16, 185, 129, 0.05);
  }
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1;
  font-family: 'Space Grotesk', sans-serif;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 500;
  color: #64748b;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.queries-table {
  background: rgba(17, 24, 39, 0.8) !important;
  border: 1px solid rgba(30, 41, 59, 0.6) !important;
  border-radius: 12px !important;
}

:deep(.queries-table-inner) {
  thead tr th {
    background: rgba(10, 15, 26, 0.9);
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(30, 41, 59, 0.6);
  }

  tbody tr {
    cursor: pointer;
    transition: background 0.15s ease;

    td {
      border-bottom: 1px solid rgba(30, 41, 59, 0.4);
      color: #94a3b8;
    }

    &:hover td {
      background: rgba(16, 185, 129, 0.04);
    }
  }
}
</style>
