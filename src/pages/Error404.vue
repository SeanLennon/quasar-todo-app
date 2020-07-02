<template>
  <div class="fullscreen text-white text-center q-pa-md column items-center justify-center q-gutter-y-lg">
    <div class="row items-center">
      <div class="text-h2">
        404
      </div>
      <q-separator spaced inset vertical dark />
      <div class="text-h6" style="opacity:.4">
        Error
      </div>

    </div>

    <div>
      <q-btn
        color="white"
        text-color="blue"
        unelevated
        @click="$router.back()"
        label="Go Back"
        no-caps
      />
    </div>
  </div>
</template>

<script >
export default {
  name: 'Error404'
}
</script>
