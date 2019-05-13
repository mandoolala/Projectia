<template>
    <div>
        <b-modal refs="mymodal" size="lg" id="modal_tutorial" title="Tutorial" ok-only>
            <b-carousel
                    id="carousel-1"
                    v-model="slide"
                    controls
                    indicators
                    :interval="0"
                    background="#ababab"
                    img-width="1024"
                    img-height="720"
                    style="text-shadow: 1px 1px 2px #333;"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
            >
                <!-- Text slides with image -->
                <b-carousel-slide>
                    <img
                            slot="img"
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="720"
                            src="../assets/tutorial1.png"
                            alt="image slot"
                    >
                </b-carousel-slide>

                <!-- Slides with custom text -->
                <b-carousel-slide>
                    <img
                            slot="img"
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="720"
                            src="../assets/tutorial2.png"
                            alt="image slot"
                    >
                </b-carousel-slide>

                <!-- Slides with image only -->
                <b-carousel-slide>
                    <img
                            slot="img"
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="720"
                            src="../assets/tutorial3.png"
                            alt="image slot"
                    >
                </b-carousel-slide>

                <!-- Slides with img slot -->
                <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
                <b-carousel-slide>
                    <img
                            slot="img"
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="720"
                            src="../assets/tutorial4.png"
                            alt="image slot"
                    >
                </b-carousel-slide>
                <b-carousel-slide>
                    <img
                            slot="img"
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="720"
                            src="../assets/tutorial5.png"
                            alt="image slot"
                    >
                </b-carousel-slide>
            </b-carousel>
        </b-modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                slide: 0,
                sliding: null
            }
        },
        methods: {
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            }
        },
        mounted: function() {
            this.$bvModal.show('modal_tutorial')
        }
    }
</script>

<style scoped>

</style>