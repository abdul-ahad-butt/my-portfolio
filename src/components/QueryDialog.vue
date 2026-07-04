<template>
  <q-dialog
    v-model="isOpen"
    :maximized="$q.screen.lt.md"
    transition-show="slide-up"
    transition-hide="slide-down"
    @hide="handleClose"
  >
    <q-card
      class="query-dialog-card"
      :style="$q.screen.gt.sm ? 'width: 680px; max-width: 96vw;' : ''"
    >
      <!-- ── Dialog Header ──────────────────────────────────────────────── -->
      <q-card-section class="dialog-header row items-center q-pb-none">
        <div class="col">
          <div class="row items-center q-gutter-sm">
            <q-avatar
              size="42px"
              color="primary"
              text-color="dark"
              font-size="1.2rem"
              :label="initials"
              class="text-weight-bold"
            />
            <div>
              <div class="text-h6 text-weight-bold text-white">
                {{ query?.name }}
              </div>
              <div class="text-caption text-grey-5">
                {{ query?.email }}
              </div>
            </div>
          </div>
        </div>
        <div class="row items-center q-gutter-sm">
          <StatusBadge v-if="query" :status="query.status" />
          <q-btn flat round dense icon="close" @click="isOpen = false" class="text-grey-5" />
        </div>
      </q-card-section>

      <!-- Meta info bar -->
      <q-card-section class="q-pt-sm q-pb-sm">
        <div class="row items-center q-gutter-md">
          <div class="row items-center q-gutter-xs text-caption text-grey-5">
            <q-icon name="schedule" size="14px" />
            <span>Received: {{ formattedDate }}</span>
          </div>
          <div class="row items-center q-gutter-xs text-caption text-grey-5">
            <q-icon name="fingerprint" size="14px" />
            <span class="text-grey-7">{{ query?.id?.substring(0, 8) }}...</span>
          </div>
        </div>
      </q-card-section>

      <q-separator dark />

      <!-- ── Message Body ───────────────────────────────────────────────── -->
      <q-card-section class="q-py-lg">
        <div class="text-overline text-grey-6 q-mb-sm">MESSAGE</div>
        <div class="message-body">
          <p
            v-for="(paragraph, idx) in messageParagraphs"
            :key="idx"
            class="text-body2 text-grey-3"
            style="line-height: 1.8; white-space: pre-wrap"
          >
            {{ paragraph }}
          </p>
        </div>
      </q-card-section>

      <q-separator dark />

      <!-- ── Action Footer ──────────────────────────────────────────────── -->
      <q-card-actions class="q-pa-md dialog-footer">
        <div class="row full-width q-gutter-sm justify-between">
          <!-- Left: Status actions -->
          <div class="row q-gutter-sm">
            <q-btn
              v-if="query?.status !== 'read'"
              outline
              color="positive"
              icon="mark_email_read"
              label="Mark as Read"
              :loading="actionLoading === 'read'"
              @click="handleStatusChange('read')"
              no-caps
              size="sm"
            />
            <q-btn
              v-if="query?.status !== 'archived'"
              outline
              color="grey-5"
              icon="archive"
              label="Archive"
              :loading="actionLoading === 'archived'"
              @click="handleStatusChange('archived')"
              no-caps
              size="sm"
            />
            <q-btn
              v-if="query?.status !== 'unread'"
              outline
              color="warning"
              icon="mark_email_unread"
              label="Mark Unread"
              :loading="actionLoading === 'unread'"
              @click="handleStatusChange('unread')"
              no-caps
              size="sm"
            />
          </div>

          <!-- Right: Delete -->
          <q-btn
            flat
            color="negative"
            icon="delete_forever"
            label="Delete"
            :loading="actionLoading === 'delete'"
            @click="handleDelete"
            no-caps
            size="sm"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import StatusBadge from './StatusBadge.vue'
import { useQueriesStore } from '../stores/queries'
import type { PortfolioQuery, QueryStatus } from '../stores/queries'

const props = defineProps<{
  modelValue: boolean
  query: PortfolioQuery | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const $q          = useQuasar()
const store       = useQueriesStore()
const actionLoading = ref<string | null>(null)

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function handleClose() {
  store.selectQuery(null)
}

// ── Computed display values ────────────────────────────────────────────────

const initials = computed(() => {
  if (!props.query) return '?'
  return props.query.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

const formattedDate = computed(() => {
  if (!props.query) return ''
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(props.query.createdAt))
})

const messageParagraphs = computed(() => {
  if (!props.query) return []
  return props.query.message.split('\n').filter((p) => p.trim())
})

// ── Actions ────────────────────────────────────────────────────────────────

async function handleStatusChange(status: QueryStatus) {
  if (!props.query) return
  actionLoading.value = status
  try {
    await store.updateStatus(props.query.id, status)
    $q.notify({
      type: 'positive',
      message: `Query marked as "${status}"`,
      icon: 'check_circle',
      position: 'top-right',
      timeout: 2500,
    })
  } catch {
    $q.notify({ type: 'negative', message: 'Failed to update status', position: 'top-right' })
  } finally {
    actionLoading.value = null
  }
}

async function handleDelete() {
  if (!props.query) return
  $q.dialog({
    title: 'Confirm Delete',
    message: `Permanently delete the query from ${props.query.name}? This cannot be undone.`,
    cancel: { flat: true, label: 'Cancel', color: 'grey' },
    ok: { flat: false, label: 'Delete', color: 'negative', icon: 'delete_forever' },
    dark: true,
  }).onOk(async () => {
    actionLoading.value = 'delete'
    try {
      await store.deleteQuery(props.query!.id)
      isOpen.value = false
      $q.notify({
        type: 'positive',
        message: 'Query deleted successfully',
        icon: 'delete_forever',
        position: 'top-right',
        timeout: 2500,
      })
    } catch {
      $q.notify({ type: 'negative', message: 'Failed to delete query', position: 'top-right' })
    } finally {
      actionLoading.value = null
    }
  })
}
</script>

<style lang="scss" scoped>
.query-dialog-card {
  background: #111827;
  border: 1px solid rgba(30, 41, 59, 0.8);
  border-radius: 16px;
  overflow: hidden;
}

.dialog-header {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(6, 182, 212, 0.05));
  padding: 20px 20px 16px;
}

.message-body {
  background: rgba(10, 15, 26, 0.6);
  border: 1px solid rgba(30, 41, 59, 0.6);
  border-radius: 10px;
  padding: 20px;
  min-height: 120px;
}

.dialog-footer {
  background: rgba(10, 15, 26, 0.4);
}
</style>
