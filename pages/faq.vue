<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.faq.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.faq.description'),
    },
  ],
}))
</script>

<template>
  <PageContentRenderer path="/page/faq" :page-title="$t('pages.faq.title')" />
</template>
