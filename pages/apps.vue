<script lang="ts" setup>
import { useCounter } from '~/stores/counter'
import { useIdentity } from '~/stores/identity'
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.apps.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.apps.description'),
    },
  ],
}))

const counter = useCounter()
const identity = useIdentity()
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.apps.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <div>
        <ul
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 noise"
        >
          <li
            class="relative col-span-1 flex flex-col justify-between divide-y divide-gray-200 rounded-lg bg-white dark:bg-dark-800 dark:text-light-500 text-center shadow"
          >
            <a href=""
              ><div class="flex flex-1 flex-col p-8">
                <div
                  class="mx-auto flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-3xl"
                >
                  🤖
                </div>
                <h3
                  class="mt-6 text-sm font-medium text-gray-900 dark:text-light-500"
                >
                  周报生成器
                </h3>
                <dl class="mt-1 flex flex-grow flex-col justify-between">
                  <dt class="sr-only">Title</dt>
                  <dd class="text-sm text-gray-500 dark:text-light-500">
                    简单描述工作内容 帮你生成完整周报
                  </dd>
                </dl>
              </div>
            </a>
            <div>
              <div class="-mt-px flex divide-x divide-gray-200">
                <div class="flex w-0 flex-1">
                  <button
                    class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-light-900"
                  >
                    <icon-uiw:like-o />
                    推荐
                  </button>
                </div>
                <div class="-ml-px flex w-0 flex-1">
                  <a
                    class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-light-900"
                    href=""
                  >
                    <icon-tabler-play />
                    运行
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </PageBody>
  </PageWrapper>
</template>
