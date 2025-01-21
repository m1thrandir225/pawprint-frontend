<template>
  <div class="w-full h-[300px]">
    <GMapMap :center="center" :zoom="7" map-type-id="terrain" class="w-full h-full"> </GMapMap>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PetDetailsMap',
  data() {
    return {
      center: { lat: 51.093048, lng: 6.84212 },
    }
  },
}
</script>
