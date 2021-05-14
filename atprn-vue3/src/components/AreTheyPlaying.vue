<template>
  <div>
    <h1>Are the {{ teamName }} Playing Right Now?</h1>
    <div>{{ arePlaying ? 'Yes' : 'No '}}</div>
  </div>
</template>

<script>
export default {
  props: {
    arePlaying: {
      type: Boolean,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    }
  },
}
</script>