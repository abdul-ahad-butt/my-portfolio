<template>
  <q-badge
    :color="badgeColor"
    :text-color="textColor"
    :label="label"
    class="status-badge"
  >
    <q-icon :name="icon" size="12px" class="q-mr-xs" />
    {{ label }}
  </q-badge>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QueryStatus } from '../stores/queries'

const props = defineProps<{
  status: QueryStatus
}>()

const badgeColor = computed(() => {
  switch (props.status) {
    case 'unread':   return 'negative'
    case 'read':     return 'positive'
    case 'archived': return 'grey-7'
    default:         return 'grey'
  }
})

const textColor = computed(() => 'white')

const label = computed(() => {
  switch (props.status) {
    case 'unread':   return 'Unread'
    case 'read':     return 'Read'
    case 'archived': return 'Archived'
    default:         return props.status
  }
})

const icon = computed(() => {
  switch (props.status) {
    case 'unread':   return 'mark_email_unread'
    case 'read':     return 'mark_email_read'
    case 'archived': return 'archive'
    default:         return 'help'
  }
})
</script>

<style lang="scss" scoped>
.status-badge {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 4px 10px;
  border-radius: 12px;
}
</style>
