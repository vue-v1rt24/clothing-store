<script setup lang="ts">
import VOtpInput from 'vue3-otp-input';
import { messageValidateError } from '~/utils/messageValidateError.utils';

//
const { formFields } = storeToRefs(useAuthStore());

//
const otpInput = useTemplateRef('otpInput');
const bindValue = ref('');
const loading = ref(false);

// Очистить ввод
const clearInput = () => {
  otpInput.value?.clearInput();
};

// Отправка кода
const verifyEmail = async () => {
  if (bindValue.value.length < 6) {
    return errorMsg('Не правильный код');
  }

  try {
    loading.value = true;

    const res = await $fetch('/api/auth/emailVerification', {
      method: 'POST',
      body: {
        email: formFields.value.email,
        optCode: bindValue.value,
      },
    });

    successMsg(res.message);

    // Очищение хранилища
    formFields.value.email = formFields.value.password = '';

    await navigateTo('/auth/login');
  } catch (error: any) {
    messageValidateError(error.data.data);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="otp_input_wrap">
    <div>
      <v-otp-input
        ref="otpInput"
        input-classes="otp-input"
        :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
        separator="-"
        inputType="letter-numeric"
        :num-inputs="6"
        v-model:value="bindValue"
        :should-auto-focus="true"
        :should-focus-order="true"
        :placeholder="['*', '*', '*', '*', '*', '*']"
      />
    </div>

    <div class="otp_input__btns">
      <u-i-button title="Очистить ввод" @btn-handler="clearInput" />
      <u-i-button title="Подтвердить" :loading @btn-handler="verifyEmail" />
    </div>
  </div>
</template>

<style lang="css">
.otp_input_wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/*  */
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}

/*  */
.otp_input__btns {
  width: 300px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 30px;
}
</style>
