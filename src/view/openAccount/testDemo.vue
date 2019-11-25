<template>
  <div id="test">
         <input 
              name="bank_account"  
              type="text"  
              :value="display_bank_account" 
              @input="handleBankCardInput"  
         />
  </div>
</template>

<script>

export default {
  data() {
    return {
       bank_account:'',
      display_bank_account:''
    }
  },
  created () {
   
  },
  methods: {
     handleBankCardInput(e) {
      this.bank_account = e.target.value;
      this.display_bank_account = this.bank_account.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') 
    },
   
  }
};
</script>

<style>
* {
  font-size: 18px;
}
</style>