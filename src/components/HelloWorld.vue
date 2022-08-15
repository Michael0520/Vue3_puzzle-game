<script setup>
import { onMounted, reactive, ref, watch } from "vue";



const defaultArr = reactive({
  arr: []
});
// 完成後的拼圖
const resultArr = reactive({
  arr: []
});
// 確認是否有正確排序的預設數字
const formatIndex = ref(0)
// 判斷是否完成拼圖遊戲
const isWin = ref(false)

/* 觀察結果的資列陣列，是否每一個資料都有等同於正確的排序(idx)
 */
watch(
  // 使用 watch 觀察 reactive 物件，需要此用此方式
  () => resultArr.arr,
  (newArr, oldValue) => {
    console.log(newArr);
    // 避免每一次執行 forEach 時，formatIndex 去重複++
    // 所以這邊需要在 forEach 外層，執行賦予 0
    formatIndex.value = 0
    newArr.forEach((element, index) => {
      if (element.idx === index) {
        console.log("true");
        formatIndex.value++
      }
    });
  }, {
  // 由於目前 watch 所監控的 resultArr.arr 是屬於一個深層的結構
  // 所以這邊需要使用 deep 來做深層監聽
  deep: true
})
// 當 formatIndex 等於 9 時，將 isWin 改為 true
watch(formatIndex, (newVal, oldVal) => {
  if (newVal === 9) {
    console.log("you win");
    isWin.value = true
  }
})

/*  TODO:點擊預設的資料陣列，可以將該拼圖傳入到結果的資列陣列
 ** item => 為當下點擊的 item ，這裡會從外部帶入一組陣列
 ** 將 resultArr.arr.push(item) => 將當下點擊的 item 傳入進去 result 變數
 ** 將 defaultArr.arr.splice(index,1) => 需要將原始的 defaultArr 點擊到的 item 給移除
 ** 而 splice 擁有兩個變數，第一個為索引值，第二個為要從這個索引數值開始刪除幾個資料
 ** 這邊傳入 index,1 => 從當前點擊的索引數值，去開始移除一個項目
 */
const handleClick = (item, index) => {
  console.log("handleClick");
  resultArr.arr.push(item)

  defaultArr.arr.splice(index, 1)
}
/*  TODO:點擊結果的資料陣列，可以將該拼圖傳入到預設的資列陣列
 ** item => 為當下點擊的 item ，這裡會從外部帶入一組陣列
 ** 將 defaultArr.arr.push(item) => 將當下點擊的 item 傳入進去 result 變數
 ** 將 resultArr.arr.splice(index,1) => 需要將原始的 defaultArr 點擊到的 item 給移除
 ** 而 splice 擁有兩個變數，第一個為索引值，第二個為要從這個索引數值開始刪除幾個資料
 ** 這邊傳入 index,1 => 從當前點擊的索引數值，去開始移除一個項目
 */
const resetClick = (item, index) => {
  console.log("resetClick");
  defaultArr.arr.push(item)
  resultArr.arr.splice(index, 1)
}

onMounted(() => {
  axios.get("./api/puzzle.json").then((res) => {
    defaultArr.arr = res.data
    console.log(defaultArr);
  })
})


defineProps({
  msg: String,
});
</script>

<template>
  <div class="wait">
    <ul>
      <li v-for="(item, index) in defaultArr.arr" :key="index" @click="handleClick(item, index)">
        <img :src="item.url" alt="image" />
        <!-- <img src="../../public/api/puzzle.json" alt=""> -->
      </li>
    </ul>
  </div>
  <div class="carried">
    <ul>
      <li v-for="(item, index) in resultArr.arr" :key="index" @click="resetClick(item, index)">
        <img :src="item.url" alt="image" />
      </li>
    </ul>
  </div>
  <div :class="['winPage', { open: isWin }]">
    <h1>闖關成功</h1>
  </div>
</template>

<style scoped>
</style>
