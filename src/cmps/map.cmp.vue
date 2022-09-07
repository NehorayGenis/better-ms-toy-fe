<template>
  <GmapMap
    ref="mapRef"
    :center="center"
    :zoom="11"
    map-type-id="terrain"
    style="width: 600px; height: 400px"
  >
    <GmapMarker
      v-for="(branch, idx) in branches"
      :key="idx"
      :position="branch.position"
      :clickable="true"
      :draggable="true"
      @click="markerClicked"
    />
    <GmapInfoWindow
      @closeclick="windowOpen = false"
      :opened="windowOpen"
      :position="infowindow"
      :options="{
        pixelOffset: {
          width: 0,
          height: -35,
        },
      }"
      >{{ infoTxt }}</GmapInfoWindow
    >
  </GmapMap>
</template>

<script>
export default {
  props: {
    branches: Array,
    currBranch: {},
  },
  data() {
    return {
      center: { lat: 32.08704, lng: 34.775293 },
      windowOpen: false,
      infowindow: null,
      infoTxt: '',
    };
  },
  methods: {
    markerClicked(marker) {
      const position = {
        lat: marker.latLng.lat(),
        lng: marker.latLng.lng(),
      };
      const branch = this.branches.find(
        (b) =>
          b.position.lat === position.lat && b.position.lng === position.lng
      );
      this.windowOpen = true;
      this.infowindow = position;
      this.infoTxt = branch.city;

      this.$refs.mapRef.panTo(position)
    },
  },
  watch: {
    'currBranch.position': {
      deep: true,
      handler(position) {
        this.$refs.mapRef.panTo(position)
      },
    },
  },
};
</script>

<style>
.gm-style-iw.gm-style-iw-c {
  padding-left: 18px !important;
}
</style>