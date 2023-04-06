<template>
  <Layout>
    <div class="p-4 space-y-4">
      <!-- space-y-4 間隔 -->
      <!--  focus:outline-none 
            focus:ring-offset-2
            focus:ring-violet-500
            聚焦屬性
      -->
      <!-- transition-colors -->
      <div class="space-x-4">
        <PrimaryButton>
          主要按鈕
        </PrimaryButton>
        <PrimaryButton to="/">
          主要按鈕
        </PrimaryButton>
      </div>
      <div class="">
        <SecondaryButton>
          次要按鈕
        </SecondaryButton>
      </div>
      <div class="">
        <DangerButton>
          刪除帳號
        </DangerButton>
      </div>
    </div>
  </Layout>
</template>

<script>

</script>