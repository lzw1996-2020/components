<!--
 * @Description: 
 * @Author: liutq
 * @Date: 2021-12-02 18:28:26
 * @LastEditTime: 2021-12-02 18:30:17
 * @LastEditors: liutq
 * @Reference: 
-->
<template>
    <div>
        <h1>npm</h1>
        <div class="box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Test',
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.box {
    background: rebeccapurple;
}
</style>