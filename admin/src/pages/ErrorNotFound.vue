<template>
  <q-page class="flex flex-center" style="background: #0a0f1a; min-height: 100vh">
    <div class="text-center">
      <div style="font-size: 6rem">🔍</div>
      <div class="text-h5 text-weight-bold text-white q-mt-md">Page Not Found</div>
      <div class="text-caption text-grey-5 q-mt-sm q-mb-xl">
        The route you requested doesn't exist.
      </div>
      <q-btn
        unelevated
        color="primary"
        text-color="dark"
        label="Back to Dashboard"
        icon="arrow_back"
        :to="{ name: 'Queries' }"
        no-caps
      />
    </div>
  </q-page>
</template>
