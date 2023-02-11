<script setup lang="ts">
import { ref } from 'vue'
import { Configuration, OpenAIApi } from "openai";
import { Button as AButton, Input as AInput } from "ant-design-vue";

const input = ref('')
const text = ref('')
const apiKey = ref('')

const getOpenAi = () => {
  const configuration = new Configuration({
    apiKey: apiKey.value
  });

  return new OpenAIApi(configuration);
}


const clickInput = async () => {
  console.log('input', input.value);
  const openAi = getOpenAi()
  const completion = await openAi.createCompletion({
    model: "text-davinci-003",
    prompt: input.value,
    temperature: 1,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  text.value = completion?.data?.choices?.[0]?.text as string || 'g'
  console.log('completion', completion)

}

</script>

<template>
  <a-input v-model:value="apiKey" placeholder="apiKey" />
  <a-input v-model:value="input" placeholder="搜索值" />
  <a-button @click="clickInput">检索</a-button>
  <p>{{ text }}</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
