export default `<template>
<article>
    <section>
        <p>当前颜色的值：{{ value }}</p>
    </section>
    <section>
        <h3>large</h3>
        <ColorPicker v-model="value" size="large" />
    </section>
    <section>
        <h3>default</h3>
        <ColorPicker v-model="value" />
    </section>
    <section>
        <h3>small</h3>
        <ColorPicker v-model="value" size="small" />
    </section>
</article>
</template>

<script>
export default {
    data() {
        return {
            value: '#232'
        }
    }
}
</script>`
